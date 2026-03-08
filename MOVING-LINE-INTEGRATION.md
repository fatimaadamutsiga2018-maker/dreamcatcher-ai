# Moving Line (动爻) Integration

## Overview

Integrated moving line (动爻) information into the hexagram reading system to provide deeper insights about the current stage of the situation.

## Implementation

### 1. Moving Line Stage Descriptions

Added 6 stage descriptions in `/lib/content-config.ts`:

| Moving Line | Stage Description | Meaning |
|-------------|-------------------|---------|
| 1 | Just beginning—observe and prepare | Early stages, understand before committing |
| 2 | Foundation is set—internal confirmation needed | Groundwork in place, check readiness |
| 3 | In progress—your actions are the key factor | Actively developing, your initiative matters most |
| 4 | External factors at play—watch for outside influences | Circumstances shifting, pay attention to environment |
| 5 | Critical turning point—timing is everything | Pivotal moment, decisions carry extra weight |
| 6 | Outcome taking shape—focus on acceptance and adaptation | Trajectory determined, work with what's unfolding |

### 2. Integration into Insight Section

The moving line information is added to the **【Insight】** section, following Musk's recommendation:

**Structure:**
```
[Base hexagram insight based on situation and level]

Current stage: [Moving line stage description]. [Meaning for user's question]
```

**Example (Level 3, Moving Line 3):**
```
Obstacles can be overcome through decisive action. Achievable, but requires
considerable effort. Success is within reach, but won't come easily—it needs
your active engagement.

Current stage: In progress—your actions are the key factor. The situation is
actively developing. Your attitude and initiative will significantly influence
the outcome.
```

### 3. Why Insight Section?

Following the three-part structure:

- **【Conclusion】** - Overall probability judgment (Level-based, stays concise)
- **【Suggestion】** - Action guidance (What to do, Level-based)
- **【Insight】** - Deep understanding (Why + Current stage, includes moving line context)

The moving line provides "where you are in the process" context, which fits naturally into the Insight section's role of explaining the deeper situation.

### 4. User Experience

- Moving line information is expressed in modern, relatable language
- No technical terms like "动爻3" shown to users
- Stage descriptions help users understand their current position in the situation
- Information flows naturally: Conclusion → Suggestion → Insight (with stage context)

## Testing

Use `test-hexagram-ui.html` to test different moving line positions:
- Same hexagram with different moving lines shows different stage insights
- All 6 moving line positions have unique, meaningful descriptions
- Text formatting uses `whitespace-pre-line` to preserve line breaks

## Files Modified

1. `/lib/content-config.ts` - Added `movingLineStages` and updated `expandedInsight` functions
2. `/app/hexagram/reading/page.tsx` - Updated to pass `movingLine` parameter to insight function
3. `/test-hexagram-ui.html` - Enhanced test interface for moving line testing
