export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: 'official' | 'community';
    bio?: string;
  };
  category: string;
  publishedAt: string;
  coverImage?: string;
  readTime?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  memberSince: string;
}

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'understanding-timing-in-decision-making',
    title: 'Understanding Timing in Decision Making',
    excerpt: 'Learn how ancient wisdom helps you recognize the right moment to act on important decisions.',
    content: `# Understanding Timing in Decision Making

Timing is everything when it comes to making important life decisions. Ancient wisdom traditions have long recognized that there are favorable and unfavorable moments for action.

## The Concept of Right Timing

In the I Ching, timing is represented through the interplay of yin and yang energies. When these energies align favorably, conditions support your goals. When they conflict, resistance increases.

## Recognizing Favorable Conditions

- Clear sense of direction
- Resources readily available
- Support from others
- Inner confidence and calm

## When to Wait

Sometimes the wisest action is patience. If you feel:
- Persistent obstacles
- Lack of clarity
- Drained energy
- Strong resistance

Consider waiting for better timing or exploring alternative approaches.`,
    author: {
      name: 'ClarityPath Team',
      avatar: '/avatars/official.jpg',
      role: 'official',
      bio: 'Official guidance from the ClarityPath wisdom team'
    },
    category: 'Wisdom',
    publishedAt: '2026-03-01',
    coverImage: '/blog/timing.jpg',
    readTime: '5 min read'
  },
  {
    id: '2',
    slug: 'my-journey-with-daily-guidance',
    title: 'My Journey with Daily Guidance',
    excerpt: 'How using ClarityPath daily transformed my approach to decision-making and reduced anxiety.',
    content: `# My Journey with Daily Guidance

Six months ago, I discovered ClarityPath and decided to consult it every morning before making important decisions.

## The Beginning

At first, I was skeptical. How could ancient wisdom apply to modern life? But I committed to trying it for 30 days.

## What Changed

- **Reduced Decision Anxiety**: Instead of overthinking, I had a framework for evaluation
- **Better Timing**: I learned to recognize when to push forward vs. when to wait
- **Increased Confidence**: The guidance helped me trust my intuition

## My Daily Practice

1. Morning reflection on the day ahead
2. Identify one key decision or question
3. Consult ClarityPath
4. Journal about the guidance received
5. Review in the evening

The practice isn't about predicting the future—it's about gaining perspective and making more conscious choices.`,
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'community',
      bio: 'Product designer and mindfulness practitioner'
    },
    category: 'Experience',
    publishedAt: '2026-02-28',
    readTime: '4 min read'
  },
  {
    id: '3',
    slug: 'five-levels-of-probability-explained',
    title: 'Five Levels of Probability Explained',
    excerpt: 'A deep dive into how ClarityPath assesses the likelihood of success for your decisions.',
    content: `# Five Levels of Probability Explained

ClarityPath uses a five-level system to assess the favorability of conditions for your decisions.

## Level 5: Perfect Timing (🟢)

All conditions align. This is your green light moment. Act with confidence.

## Level 4: Favorable Conditions (🟡)

Conditions support progress. Prepare thoroughly and execute well.

## Level 3: Achievable with Effort (🟠)

Success requires considerable effort. Evaluate if the investment is worth it.

## Level 2: Uncertain Timing (🔴)

Current conditions present challenges. Consider waiting or gathering more information.

## Level 1: Challenging Conditions (⚫)

Significant obstacles present. Explore alternatives or different timing.

## How to Use This System

The levels aren't predictions—they're assessments of current conditions. Use them to:
- Gauge the effort required
- Decide whether to act now or wait
- Identify what preparation is needed

Remember: you're always the final decision-maker.`,
    author: {
      name: 'ClarityPath Team',
      avatar: '/avatars/official.jpg',
      role: 'official',
      bio: 'Official guidance from the ClarityPath wisdom team'
    },
    category: 'Guide',
    publishedAt: '2026-02-25',
    coverImage: '/blog/levels.jpg',
    readTime: '6 min read'
  },
  {
    id: '4',
    slug: 'when-to-trust-your-gut',
    title: 'When to Trust Your Gut vs. Seek Guidance',
    excerpt: 'Finding the balance between intuition and external wisdom in decision-making.',
    content: `# When to Trust Your Gut vs. Seek Guidance

One of the most common questions: "Should I just trust my gut, or should I seek guidance?"

## The Answer: Both

Your intuition and external guidance aren't opposites—they complement each other.

## Trust Your Gut When:

- You have clear, immediate knowing
- The decision is time-sensitive
- You have relevant experience
- Your body feels calm and certain

## Seek Guidance When:

- You feel confused or conflicted
- The stakes are high
- You're facing a new situation
- You want to validate your intuition

## The Integration

The best approach combines both:
1. Notice your initial gut feeling
2. Seek guidance for perspective
3. See if they align or conflict
4. Make your decision with full awareness

ClarityPath works best when used alongside your intuition, not instead of it.`,
    author: {
      name: 'Michael Torres',
      avatar: '/avatars/michael.jpg',
      role: 'community',
      bio: 'Life coach and decision-making consultant'
    },
    category: 'Wisdom',
    publishedAt: '2026-02-20',
    readTime: '5 min read'
  },
  {
    id: '5',
    slug: 'asking-better-questions',
    title: 'The Art of Asking Better Questions',
    excerpt: 'How to frame your questions to get the most useful guidance from ClarityPath.',
    content: `# The Art of Asking Better Questions

The quality of guidance you receive depends largely on how you frame your questions.

## Good Question Patterns

### Specific Action Questions
- "Should I accept this job offer?"
- "Is now the right time to start this project?"
- "Will this approach work for my situation?"

### Timing Questions
- "Is this the right time to make this change?"
- "Should I wait before taking action?"

## Questions to Avoid

### Too Vague
- "What should I do?" (too open-ended)
- "Will I be happy?" (too subjective)

### Predicting Others
- "Will they say yes?" (focuses on others' choices)
- "What will happen?" (pure prediction)

### Timing Predictions
- "When will this happen?" (asking for specific dates)

## The Key Principle

Frame questions about YOUR actions and timing, not about predicting specific outcomes or others' behavior.

Good questions lead to actionable guidance.`,
    author: {
      name: 'ClarityPath Team',
      avatar: '/avatars/official.jpg',
      role: 'official',
      bio: 'Official guidance from the ClarityPath wisdom team'
    },
    category: 'Guide',
    publishedAt: '2026-02-15',
    coverImage: '/blog/questions.jpg',
    readTime: '4 min read'
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@claritypath.com',
  avatar: '/avatars/demo.jpg',
  bio: 'Exploring wisdom and making better choices',
  memberSince: '2026-01-15'
};

export function getPostBySlug(slug: string): BlogPost | undefined {
  return mockPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'all') return mockPosts;
  return mockPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByRole(role: 'official' | 'community' | 'all'): BlogPost[] {
  if (role === 'all') return mockPosts;
  return mockPosts.filter(post => post.author.role === role);
}
