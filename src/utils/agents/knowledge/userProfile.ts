/**
 * User Profile System
 * Builds and maintains a profile of the user based on content and interactions
 */

export interface UserProfile {
  // Personal situation
  situation: {
    incomeLevel: 'high' | 'moderate' | 'variable';
    dualIncome: boolean;
    savingsRate: number; // percentage
    currentStrategy: string;
    goals: string[];
  };
  
  // Writing style preferences
  writingStyle: {
    tone: string[];
    voice: string;
    preferredLength: string;
    avoidKeywords: string[];
    preferredKeywords: string[];
    examples: string[]; // URLs or excerpts of content user liked
  };
  
  // Content preferences
  contentPreferences: {
    topics: string[];
    angles: string[];
    formats: string[];
    monetizationApproach: string;
  };
  
  // Learning from interactions
  learnings: {
    whatWorks: string[];
    whatDoesntWork: string[];
    feedback: Array<{
      content: string;
      feedback: string;
      date: Date;
    }>;
  };
  
  // Updated timestamp
  lastUpdated: Date;
}

let userProfile: UserProfile = {
  situation: {
    incomeLevel: 'high',
    dualIncome: true,
    savingsRate: 30,
    currentStrategy: 'Dual income covering expenses, maxing 401k/Roth IRA, building side hustles, cash+investments as untouched reserves',
    goals: ['Financial independence', 'Reduce stress', 'More time with family', 'Build side income'],
  },
  writingStyle: {
    tone: ['confident', 'rational', 'anti-hustle', 'anti-burnout', 'pragmatic'],
    voice: 'Like MrMoneyMustache (direct, confident, witty) but original',
    preferredLength: '2500-3000 words for pillar posts',
    avoidKeywords: ['extreme', 'must', 'should', 'always', 'never'],
    preferredKeywords: ['consider', 'might', 'could', 'option', 'perhaps'],
    examples: [],
  },
  contentPreferences: {
    topics: ['BurnoutFIRE', 'High income vs wealth', 'Cash holdings', 'Intentional income reduction'],
    angles: ['Contrarian', 'Data-driven', 'Personal narrative', 'Practical'],
    formats: ['Long-form', 'Comprehensive guides', 'Case studies'],
    monetizationApproach: 'High-intent affiliate, digital products, email capture - no display ads',
  },
  learnings: {
    whatWorks: [],
    whatDoesntWork: [],
    feedback: [],
  },
  lastUpdated: new Date(),
};

/**
 * Get current user profile
 */
export function getUserProfile(): UserProfile {
  return userProfile;
}

/**
 * Update user profile based on feedback or new information
 */
export function updateUserProfile(updates: Partial<UserProfile>): void {
  userProfile = {
    ...userProfile,
    ...updates,
    lastUpdated: new Date(),
  };
}

/**
 * Add feedback to profile
 */
export function addFeedback(content: string, feedback: string): void {
  userProfile.learnings.feedback.push({
    content,
    feedback,
    date: new Date(),
  });
  
  // Analyze feedback to update preferences
  if (feedback.toLowerCase().includes('too long') || feedback.toLowerCase().includes('too wordy')) {
    userProfile.writingStyle.preferredLength = 'shorter';
  }
  
  if (feedback.toLowerCase().includes('like') || feedback.toLowerCase().includes('good')) {
    userProfile.learnings.whatWorks.push(content);
  }
  
  if (feedback.toLowerCase().includes('dont like') || feedback.toLowerCase().includes('change')) {
    userProfile.learnings.whatDoesntWork.push(content);
  }
}

/**
 * Get writing style reasoning
 */
export function getWritingStyleReasoning(): string {
  return `
The writing style is based on:

1. **Target Audience**: High earners (>$120k), burned-out professionals, parents
   - Need confident, authoritative voice
   - Appreciate directness and clarity
   - Value practical, actionable advice

2. **Brand Positioning**: BurnoutFIRE - anti-hustle, anti-burnout
   - Tone must be calm, experienced, slightly contrarian
   - Avoid toxic frugality language
   - Emphasize life quality over net worth maximization

3. **Inspiration**: MrMoneyMustache style (direct, confident, witty) but original
   - Similar clarity and confidence
   - Similar contrarian perspectives
   - But unique voice and original content

4. **User Preferences**:
   - Avoid: ${userProfile.writingStyle.avoidKeywords.join(', ')}
   - Prefer: ${userProfile.writingStyle.preferredKeywords.join(', ')}
   - Length: ${userProfile.writingStyle.preferredLength}

5. **Content Strategy**:
   - Personal narratives where relevant
   - Clear financial logic with calculations
   - Actionable steps readers can take
   - Research-backed claims or clearly labeled opinions
  `.trim();
}
