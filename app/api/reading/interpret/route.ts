import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase/service';
import { buildHexagramResultSummary } from '@/lib/reading-history';

type ReadingPayload = {
  reading: {
    question: string;
    result_label: string;
    situation: string;
    action_1?: string | null;
    action_2?: string | null;
    action_3?: string | null;
    insight?: string | null;
    hexagram_number: number;
    hexagram_name_cn: string;
    hexagram_name_en: string;
    upper_trigram: string;
    lower_trigram: string;
    moving_line?: number;
  };
  messages: { role: 'user' | 'assistant'; content: string }[];
  language?: string;
};

const SYSTEM_PROMPT = `你是 ClarityPath 的解读顾问，懂能量周期和行为心理学。\n\n你的任务：用户问了一个问题，系统已经算出了能量数据。你要基于这些数据，用自然、简洁的语言解读，像一个懂行的朋友在聊天，不是在写报告。\n\n【身份规则】\n- 你是 ClarityPath Insightful Observer，不透露任何技术细节、模型名称或系统实现\n- 如果被问到你是谁，只说你是 ClarityPath 的解读顾问\n\n【输出规则】\n- 总字数控制在 200-300 字以内\n- 用口语化的方式说话，不要用标题、编号、列表、加粗\n- 自然分段，3-4 段即可\n- 不要主动追问用户，不要在结尾提问\n\n【内容规则】\n- 读数据可以推测，读人心只能猜测，用“倾向于”“可能性偏正面”等措辞，不下断言\n- 将能量测算当作“可能性”，不要用“窗口”“时机”“这段时间适合”之类的说法\n- 不要替用户假设具体情况\n- 不要给商业/生活具体方案，只给方向\n- Level 4-5 说明条件有利，附加“如果你行动”限定\n- Level 1-2 说明有阻力但给出 出路，不制造恐慌\n- 结尾用一句简短的鼓励收束\n\n【绝对禁止】\n- 不用算命术语\n- 不做绝对预测\n- 不给财务/医疗/法律/赌博建议\n- 不替别人读心\n- 不暴露能量等级数字\n- 不给百分比/成功率\n\n【追问规则】\n- 最多 3 轮追问后收束\n- 用户越具体，回答越用推测语言\n- 超出数据范围的问题说“这个数据没有涵盖”\n- 涉及赌博/违法/伤害他人的问题直接拒绝\n- 第 3 轮收束话术：\"数据能告诉你的基本聊完了。核心信号是 [一句话]。接下来的判断属于你。\"`;

const SILICONFLOW_URL = process.env.SILICONFLOW_BASE_URL ?? 'https://api.siliconflow.cn/v1';
const SILICONFLOW_MODEL = process.env.SILICONFLOW_MODEL;

async function chargeReading(supabase: ReturnType<typeof createServiceClient>, userId: string) {
  const { data: membership } = await supabase
    .from('cp_memberships')
    .select('id')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single();

  if (membership) {
    return { allowed: true, source: 'membership' as const };
  }

  const { data: summary } = await supabase
    .from('cp_user_points_summary')
    .select('bonus_points_balance, purchased_credits_balance')
    .eq('user_id', userId)
    .single();

  const bonusPoints = summary?.bonus_points_balance ?? 0;
  const purchasedCredits = summary?.purchased_credits_balance ?? 0;

  if (purchasedCredits > 0) {
    // consume one purchased credit
    const { data: creditLot } = await supabase
      .from('cp_purchased_credits')
      .select('id, credits_remaining')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gt('credits_remaining', 0)
      .gt('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (creditLot) {
      const remaining = creditLot.credits_remaining - 1;
      await supabase
        .from('cp_purchased_credits')
        .update({
          credits_remaining: remaining,
          status: remaining === 0 ? 'depleted' : 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('id', creditLot.id);

      await supabase
        .from('cp_user_points_summary')
        .update({
          purchased_credits_balance: purchasedCredits - 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      return { allowed: true, source: 'purchased_credits' as const, remaining: purchasedCredits - 1 };
    }
  }

  if (bonusPoints >= 5) {
    await supabase
      .from('cp_user_points_summary')
      .update({
        bonus_points_balance: bonusPoints - 5,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    await supabase.from('cp_points_transactions').insert({
      user_id: userId,
      source_type: 'usage_deduction',
      direction: 'debit',
      amount: 5,
      description: 'AI Reading interpret request',
    });

    return { allowed: true, source: 'bonus_points' as const, remaining: bonusPoints - 5 };
  }

  return { allowed: false };
}

function buildUserMessage(reading: ReadingPayload['reading'], language: string) {
  const question = reading.question || 'General guidance';
  const languageLabel = language === 'zh' ? '中文' : '英文';
  const actions = [reading.action_1, reading.action_2, reading.action_3].filter(Boolean);
  return `用户问题：${question}\n\n测算结果：\n- 等级标签：${reading.result_label}\n- 情境信号：${reading.situation}\n- 行动方向：${actions.join(' / ')}\n- 洞察：${reading.insight}\n- 上卦：${reading.upper_trigram}，下卦：${reading.lower_trigram}，动爻：${reading.moving_line ?? '无'}\n\n请用${languageLabel}解读。`;
}

export async function POST(request: Request) {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: ReadingPayload;
  try {
    payload = (await request.json()) as ReadingPayload;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  if (!payload?.reading) {
    return NextResponse.json({ error: 'Missing reading data' }, { status: 400 });
  }

  const messages = payload.messages ?? [];
  if (messages.length > 3) {
    return NextResponse.json({ error: 'Maximum of 3 questions allowed per reading' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const userId = session.user.id;

  const isInitialRequest = messages.length <= 1;
  let consumedSource: string | null = null;

  if (isInitialRequest) {
    const consumption = await chargeReading(supabase, userId);
    if (!consumption.allowed) {
      return NextResponse.json({ error: 'No reading credits. Please subscribe or top up.' }, { status: 402 });
    }
    consumedSource = consumption.source;

    await supabase.from('cp_reading_history').insert({
      user_id: userId,
      reading_type: 'hexagram',
      question: payload.reading.question || 'Hexagram guidance',
      input_numbers: `${payload.reading.hexagram_number}`,
      result_summary: {
        primary: `${payload.reading.result_label}`,
        secondary: payload.reading.situation,
        hexagramNumber: payload.reading.hexagram_number,
        hexagramName: payload.reading.hexagram_name_en,
      },
      consumed_source: consumedSource,
      created_at: new Date().toISOString(),
    });
  }

  const systemMessage = {
    role: 'system',
    content: SYSTEM_PROMPT,
  };

  const userMessage = {
    role: 'user',
    content: buildUserMessage(payload.reading, payload.language ?? 'en'),
  };

  const siliconflowMessages = [
    systemMessage,
    userMessage,
    ...messages,
  ];

  if (!SILICONFLOW_MODEL || !process.env.SILICONFLOW_API_KEY) {
    return NextResponse.json({ error: 'SiliconFlow not configured' }, { status: 500 });
  }

  const response = await fetch(`${SILICONFLOW_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
    },
    body: JSON.stringify({
      model: SILICONFLOW_MODEL,
      messages: siliconflowMessages,
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: 'AI service error', detail: errorText }, { status: 502 });
  }

  const aiResult = await response.json();
  const aiMessage = aiResult.choices?.[0]?.message?.content?.trim() ?? '';

  return NextResponse.json({
    message: aiMessage,
    roundsRemaining: Math.max(0, 3 - messages.length),
    consumed_source: consumedSource,
  });
}
