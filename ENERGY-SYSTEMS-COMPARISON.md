# 能量系统对比文档

## 📊 两个系统的定位

### 1. 老黄历 (Daily Energy Guide)
**定位**: 整体环境能量评估
**问题**: "今天适合做什么？"
**焦点**: 宇宙/天地能量对人的影响
**使用场景**: 日常规划、活动选择

### 2. 数字能量测算 (Number Energy Reading)
**定位**: 具体问题成功率评估
**问题**: "这件事能不能成？"
**焦点**: 特定事件的成功概率
**使用场景**: 决策支持、选择判断

---

## 🎯 统一的底层逻辑

### 能量等级系统 (1-5级)

| 等级 | 能量范围 | 成功率 | 通用含义 |
|------|---------|--------|---------|
| 5 | 85-100% | 极高 | 最佳时机，强烈支持 |
| 4 | 70-84% | 高 | 有利条件，适合行动 |
| 3 | 55-69% | 中等 | 需要努力，可以达成 |
| 2 | 35-54% | 较低 | 需谨慎，建议等待 |
| 1 | 0-34% | 低 | 不利条件，考虑替代 |

### 计算逻辑
```typescript
// 两个系统使用相同的评分算法
function calculateEnergyLevel(
  dayOfficer: string,    // 建除十二值
  spirit: string,        // 十二神
  spiritLuck: string     // 吉凶
): 1 | 2 | 3 | 4 | 5 {
  // 基础分数 = 3
  // 日期特征 ±1
  // 精神影响 ±1
  // 吉凶修正 ±0.5
  // 最终范围: 1-5
}
```

---

## 📝 差异化表达

### Level 5 (85-100%)

**老黄历** - 环境能量描述:
```
标题: "Peak Energy"
描述: "Today's energy is at its peak. This is an exceptional
      day for taking bold action and making important decisions."
```

**数字能量测算** - 结果评估:
```
标题: "Highly Favorable"
结论: "Perfect timing, highly favorable"
建议: "Act with confidence. All conditions support your goal."
```

**差异点**:
- 老黄历：描述整体氛围（"energy is at its peak"）
- 数字能量：评估具体结果（"perfect timing"）

---

### Level 3 (55-69%)

**老黄历** - 环境能量描述:
```
标题: "Balanced Energy"
描述: "Energy is stable and balanced today. A good day for
      steady progress and routine activities."
```

**数字能量测算** - 结果评估:
```
标题: "Achievable with Effort"
结论: "Achievable with effort"
建议: "Take initiative and commit sustained effort. Success
      will require your dedication."
```

**差异点**:
- 老黄历：中性描述（"balanced", "steady"）
- 数字能量：明确要求（"requires effort", "dedication"）

---

### Level 1 (0-34%)

**老黄历** - 环境能量描述:
```
标题: "Low Energy"
描述: "Energy is minimal today. This is an ideal time for
      reflection, rest, and strategic planning."
```

**数字能量测算** - 结果评估:
```
标题: "Consider Alternatives"
结论: "Challenging conditions, reconsider timing"
建议: "Consider pausing. Explore alternatives or wait for
      better timing."
```

**差异点**:
- 老黄历：积极转化（"ideal for reflection"）
- 数字能量：明确建议（"consider pausing"）

---

## 🎨 表达风格对比

### 老黄历 (Almanac)

**特点**:
- ✅ 描述性语言
- ✅ 完整句子
- ✅ 氛围营造
- ✅ 通用建议

**示例**:
```
"Energy is stable and balanced today. A good day for
steady progress and routine activities. Approach tasks
with mindfulness."
```

**适用场景**:
- 每日查看
- 活动规划
- 整体指导

---

### 数字能量测算 (Number Energy)

**特点**:
- ✅ 评估性语言
- ✅ 简洁结论
- ✅ 明确建议
- ✅ 行动导向

**示例**:
```
Conclusion: "Achievable with effort"
Suggestion: "Take initiative and commit sustained effort."
```

**适用场景**:
- 具体决策
- 选择判断
- 时机评估

---

## 🔄 使用流程对比

### 老黄历使用流程

```
用户打开页面
    ↓
查看今日能量等级 (Level 3: Balanced Energy)
    ↓
查看宜做活动 (Launch Projects, Sign Contracts...)
    ↓
查看忌做活动 (Travel, Wedding Ceremonies...)
    ↓
查看吉神方位 (Wealth: East, Joy: Southwest...)
    ↓
规划今日活动
```

### 数字能量测算使用流程

```
用户输入问题 ("Should I sign this contract?")
    ↓
输入3个数字 (123)
    ↓
系统计算卦象
    ↓
显示能量等级 (Level 4: Favorable)
    ↓
显示结论 ("Favorable conditions, suitable for progress")
    ↓
显示建议 ("Prepare thoroughly and act when ready")
    ↓
用户做出决策
```

---

## 📋 文案管理

### 配置文件位置
`/lib/content-config.ts`

### 老黄历配置
```typescript
export const almanacEnergyConfig = {
  5: { title, emoji, color, message, shortMessage },
  // ...
}
```

### 数字能量测算配置
```typescript
export const numberEnergyConfig = {
  5: { title, emoji, color, conclusion, suggestion, expandedInsight },
  // ...
}
```

---

## 🎯 设计原则

### 共同原则
1. ✅ **积极友好** - 避免负面词汇
2. ✅ **不伤人** - 即使低分也给出建设性建议
3. ✅ **去宗教化** - 使用普适性语言
4. ✅ **西方化表达** - 符合欧美用户习惯

### 差异化原则

**老黄历**:
- 📖 详细描述 > 简短评估
- 🌍 整体氛围 > 具体结果
- 📅 日常指导 > 决策支持

**数字能量测算**:
- 🎯 简洁结论 > 详细描述
- ✅ 明确评估 > 模糊描述
- 💡 行动建议 > 氛围营造

---

## 🔧 修改指南

### 修改老黄历文案
```typescript
// 编辑 lib/content-config.ts
export const almanacEnergyConfig = {
  3: {
    title: 'Balanced Energy',  // ← 改这里
    message: "Energy is...",   // ← 改这里
  }
}
```

### 修改数字能量测算文案
```typescript
// 编辑 lib/content-config.ts
export const numberEnergyConfig = {
  3: {
    title: 'Achievable with Effort',  // ← 改这里
    conclusion: "Achievable...",      // ← 改这里
    suggestion: "Take initiative...", // ← 改这里
  }
}
```

---

## 📊 用户体验对比

### 老黄历
```
用户感受: "今天是什么样的日子？"
系统回答: "今天能量平衡，适合稳步推进"
用户行动: 规划今日活动，选择合适的事情做
```

### 数字能量测算
```
用户感受: "这件事能不能成？"
系统回答: "需要努力，但可以达成"
用户行动: 评估是否值得投入，决定是否行动
```

---

## 🎯 总结

### 统一的部分
- ✅ 1-5级能量评分系统
- ✅ 积极友好的价值观
- ✅ 西方化的表达方式
- ✅ 集中化的文案管理

### 差异的部分
- 📊 表达风格（描述 vs 评估）
- 📏 信息密度（详细 vs 简洁）
- 🎯 使用场景（规划 vs 决策）
- 💬 语言风格（氛围 vs 结论）

### 为什么保持差异？
1. **使用场景不同** - 日常规划 vs 具体决策
2. **用户期待不同** - 了解氛围 vs 得到答案
3. **信息需求不同** - 通用指导 vs 明确建议

---

*最后更新: 2026-03-08*
*文档类型: 产品设计文档*
