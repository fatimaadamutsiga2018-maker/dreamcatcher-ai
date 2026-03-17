# Creem 配置与记录

> 创建时间：2026-03-14  
> 最后更新：2026-03-15  
> 用途：ClarityPath 支付系统配置

---

## 一、Live 环境产品 ID

| 环境变量 | 产品 ID | 说明 |
|----------|---------|------|
| CREEM_PRODUCT_STARTER | prod_7GYJ3AY149en1AO7HHSLjd | $4.99 - 5次决策指引 |
| CREEM_PRODUCT_EXPLORER | prod_7NrKko402GGiYBetS4YXNz | $9.99 - 12次决策指引 |
| CREEM_PRODUCT_DEEP_DIVE | prod_27j0VNrmnFmhq0T6ctEUA8 | $19.99 - 30次决策指引 |
| CREEM_PRODUCT_MEMBER_MONTHLY | prod_1FXD6LfbpSn2fRXslMB5lM | $19.99/月 - 月度会员 |
| CREEM_PRODUCT_MEMBER_YEARLY | prod_38dvSXILjD1EMZkYriy4IZ | $99/年 - 年度会员 |

---

## 二、产品 SKU 配置（Creem后台用）

### 1. Starter — $4.99 (one-time)
- **Name:** Starter Pack
- **Description:** 5 Decision Guidance readings. Perfect for trying ClarityPath's energy-based decision insights. Credits valid for 90 days.

### 2. Explorer — $9.99 (one-time)
- **Name:** Explorer Pack
- **Description:** 12 Decision Guidance readings. For those ready to make better decisions consistently. Credits valid for 90 days.

### 3. Deep Dive — $19.99 (one-time)
- **Name:** Deep Dive Pack
- **Description:** 30 Decision Guidance readings. Our best value for committed users who want ongoing clarity. Credits valid for 90 days.

### 4. Monthly Member — $19.99/month (recurring)
- **Name:** Monthly Membership
- **Description:** Unlimited Decision Guidance, detailed hexagram insights, and personal energy adaptation. Cancel anytime.

### 5. Yearly Member — $99/year (recurring)
- **Name:** Yearly Membership
- **Description:** Everything in Monthly Membership at over 50% off. Unlimited Decision Guidance, detailed hexagram insights, and personal energy adaptation. Billed annually.

---

## 三、定价策略分析

**设计亮点：**
- 低门槛入门：$4.99 Starter 降低首次尝试成本
- 梯度清晰：一次性购买从5次→12次→30次，单价递减（$1/次 → $0.83/次 → $0.67/次）
- 订阅转化：月付$19.99 vs 最高一次性$19.99，引导用户选择订阅
- 年付优惠：$99/年 vs $239.88/年付（月付×12），约5.8折

---

## 四、功能测试记录

| 功能模块 | 测试结果 | 备注 |
|---------|---------|------|
| 产品创建 | ✅ 已完成 | 5个SKU已配置 |
| 支付流程 | 待测试 | |
| webhook | 待测试 | 需对接ClarityPath积分系统 |

---

## 五、待补充

- [ ] API Key
- [ ] Webhook Secret
- [ ] Test 环境产品 ID（如需要）

---

## 六、相关文档

- 技术实现方案：`planning/Creem-Implementation-Plan-V1.md`
- 支付与权益体系：`planning/Payment-and-Points-Plan-V1.md`

---

*文件位置：projects/claritypath-app/planning/creem-config.md*
