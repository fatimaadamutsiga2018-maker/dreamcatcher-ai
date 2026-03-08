# Content Configuration Guide

## 📋 文件说明

所有用户可见的文案、翻译、模板都集中在 `/lib/content-config.ts` 文件中管理。

---

## 🎯 为什么需要这个文件？

### 问题
之前的文案分散在多个文件中：
- `lib/almanac-translator.ts` - 老黄历翻译
- `lib/hexagram64.ts` - 梅花易数文案
- `app/almanac/page.tsx` - UI标签
- `app/hexagram/reading/page.tsx` - 卦象解读

**结果**: 修改文案需要改多个文件，容易遗漏，风格不一致。

### 解决方案
**集中配置管理** - 所有文案在一个文件中：
- ✅ 统一修改入口
- ✅ 保持风格一致
- ✅ 方便批量调整
- ✅ 易于维护和审查

---

## 📂 文件结构

```typescript
/lib/content-config.ts
├── energyLevelConfig        // 能量等级（老黄历 + 梅花易数共用）
├── hexagramReadingConfig    // 梅花易数解读模板
├── activityConfig           // 老黄历活动翻译
├── dayCharacteristicsConfig // 日期特征（建除十二值、十二神）
├── directionsConfig         // 方位翻译
└── uiLabelsConfig          // UI标签和按钮文案
```

---

## 🔧 如何使用

### 1. 修改能量等级文案

**位置**: `energyLevelConfig`

```typescript
export const energyLevelConfig = {
  5: {
    title: 'Optimal Energy',           // 标题
    emoji: '⭐⭐⭐⭐⭐',                  // 星级显示
    message: "Today's energy is...",   // 完整描述
    shortMessage: "Peak energy...",    // 简短描述
  },
  // ... 其他等级
}
```

**修改示例**:
```typescript
// 如果觉得 "Optimal Energy" 太正式，可以改成：
title: 'Peak Performance Day',
message: "You're in the zone today! Perfect for bold moves and big decisions.",
```

### 2. 修改梅花易数文案

**位置**: `hexagramReadingConfig`

```typescript
export const hexagramReadingConfig = {
  conclusions: {
    5: "Conditions are exceptionally favorable...",
    4: "Strong potential for success...",
    // ...
  },
  suggestions: {
    5: "Move forward with confidence...",
    // ...
  },
}
```

**修改示例**:
```typescript
// 如果觉得太正式，可以改成更口语化：
conclusions: {
  5: "This looks really promising! The stars are aligned.",
  4: "Good vibes here. You're on the right track.",
}
```

### 3. 修改老黄历活动翻译

**位置**: `activityConfig`

```typescript
export const activityConfig = {
  business: {
    '开业': { en: 'Launch Projects', description: 'Start new ventures' },
    // ...
  },
  social: {
    '会亲友': { en: 'Host Gatherings', description: 'Social events' },
    // ...
  },
}
```

**修改示例**:
```typescript
// 如果觉得 "Host Gatherings" 太正式：
'会亲友': { en: 'Get Together', description: 'Hang out with friends' },
```

### 4. 修改UI标签

**位置**: `uiLabelsConfig`

```typescript
export const uiLabelsConfig = {
  titles: {
    almanac: 'Daily Energy Guide',
    hexagram: 'Decision Guidance',
  },
  buttons: {
    today: 'Today',
    getGuidance: 'Get Decision Guidance',
  },
}
```

---

## 🎨 修改原则

### 1. **保持一致性**
所有文案应该保持相同的：
- 语气（友好、积极、专业）
- 人称（第二人称 "you"）
- 时态（现在时为主）

### 2. **简洁有力**
- ✅ "Launch Projects" (2词)
- ❌ "Start New Business Ventures and Initiatives" (6词)

### 3. **动词开头**
- ✅ "Wrap Up Loose Ends"
- ❌ "Completion of Unfinished Tasks"

### 4. **积极正面**
- ✅ "Proceed thoughtfully" (谨慎行事)
- ❌ "Avoid all risks" (避免所有风险)

### 5. **去宗教化**
- ✅ "Set Intentions" (设定意图)
- ❌ "Pray to Gods" (向神祈祷)

---

## 📝 常见修改场景

### 场景1: 觉得文案太正式

**Before**:
```typescript
message: "Energy is somewhat restrained today. Better suited for planning..."
```

**After**:
```typescript
message: "Take it easy today. Great for planning, not so much for big moves."
```

### 场景2: 想添加新的活动类别

**Step 1**: 在 `activityConfig` 添加新类别
```typescript
export const activityConfig = {
  // ... 现有类别

  // 新增：健身类
  fitness: {
    '运动': { en: 'Work Out', description: 'Exercise and training' },
    '瑜伽': { en: 'Practice Yoga', description: 'Mindful movement' },
  },
}
```

**Step 2**: 在数据库中添加对应的中文活动名

### 场景3: 调整能量等级的阈值

**位置**: `lib/almanac-translator.ts` 的 `calculateEnergyLevel` 函数

```typescript
// 如果觉得评分太严格，可以调整权重：
if (officerData.energy === 'high') score += 1.5;  // 原来是 +1
if (officerData.energy === 'low') score -= 0.5;   // 原来是 -1
```

---

## 🔄 修改流程

### 1. 修改文案
编辑 `/lib/content-config.ts`

### 2. 测试效果
```bash
# 刷新浏览器查看效果
http://localhost:3000/almanac
http://localhost:3000/hexagram/reading
```

### 3. 确认无误后提交
```bash
git add lib/content-config.ts
git commit -m "Update content: [描述修改内容]"
```

---

## 🚨 注意事项

### ⚠️ 不要修改的内容

1. **键名（key）不要改**
   ```typescript
   // ❌ 不要改这个
   '开业': { en: 'Launch Projects', ... }

   // ✅ 只改这些
   { en: 'Start Business', description: '...' }
   ```

2. **类型定义不要改**
   ```typescript
   // ❌ 不要改 energy 的值
   energy: 'high' | 'medium' | 'low'

   // ❌ 不要改 fortune 的值
   fortune: 'favorable' | 'challenging'
   ```

3. **Helper函数不要改**
   - `getAllActivities()`
   - `getEnergyLevel()`
   - 等等

### ✅ 可以随意修改的内容

1. **所有英文文案**
   - `en` 字段
   - `description` 字段
   - `message` 字段
   - `title` 字段

2. **emoji 和颜色**
   - `emoji` 字段
   - `color` 字段

---

## 📊 文案审查清单

修改文案后，检查以下几点：

- [ ] 语气是否友好积极？
- [ ] 是否避免了负面词汇？
- [ ] 是否简洁有力（2-4个词）？
- [ ] 是否动词开头？
- [ ] 是否去宗教化？
- [ ] 是否符合西方用户习惯？
- [ ] 是否与其他文案风格一致？

---

## 🎯 快速参考

### 常用文案模板

**积极鼓励型**:
- "Great day for..."
- "Perfect timing for..."
- "Excellent opportunity to..."

**谨慎建议型**:
- "Consider carefully..."
- "Proceed thoughtfully..."
- "Take time to..."

**中性描述型**:
- "Suitable for..."
- "Good for..."
- "Favorable conditions for..."

---

## 📞 需要帮助？

如果不确定如何修改，可以：
1. 参考现有文案的风格
2. 查看 `ALMANAC-OPTIMIZATION-SUMMARY.md` 了解设计原则
3. 查看 `lunar-calendar-modern-guide.md` 了解完整对照表

---

*最后更新: 2026-03-08*
