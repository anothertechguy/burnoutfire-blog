/**
 * User Profile Builder
 * Intelligently asks questions like a biographer to build accurate user profile
 * No assumptions - asks clarifying questions when data is missing
 */

import type { UserProfile } from './userProfile';

export interface ProfileQuestion {
  id: string;
  category: 'personal' | 'financial' | 'career' | 'writing' | 'content' | 'goals';
  question: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multi-select' | 'boolean';
  options?: string[];
  required: boolean;
  followUp?: string; // Question to ask if answer suggests more detail needed
  reasoning?: string; // Why we're asking this
}

/**
 * Intelligent questions to build user profile
 * Organized like a biographer would ask
 */
export const PROFILE_QUESTIONS: ProfileQuestion[] = [
  // Personal Foundation
  {
    id: 'name',
    category: 'personal',
    question: 'What should we call you in content? (First name, nickname, or anonymous)',
    type: 'text',
    required: true,
    reasoning: 'Personal touch in writing',
  },
  {
    id: 'age_range',
    category: 'personal',
    question: 'What age range are you in?',
    type: 'select',
    options: ['20s', '30s', '40s', '50s', '60+'],
    required: false,
    reasoning: 'Helps tailor content to life stage',
  },
  {
    id: 'family_situation',
    category: 'personal',
    question: 'What is your family situation?',
    type: 'select',
    options: ['Single', 'Married/Partnered', 'Married with kids', 'Single parent', 'Other'],
    required: false,
    followUp: 'How many children, if any?',
  },
  
  // Financial Foundation
  {
    id: 'current_income',
    category: 'financial',
    question: 'What is your approximate current annual income? (You can give a range)',
    type: 'select',
    options: ['Under $100k', '$100k-$150k', '$150k-$200k', '$200k-$300k', '$300k-$500k', '$500k+', 'Prefer not to say'],
    required: false,
    reasoning: 'Helps contextualize financial advice',
  },
  {
    id: 'income_history',
    category: 'financial',
    question: 'Has your income changed significantly in the past 3-5 years?',
    type: 'select',
    options: ['Yes, increased', 'Yes, decreased', 'Yes, variable', 'No, relatively stable', 'Prefer not to say'],
    required: false,
    followUp: 'Can you share approximate income levels for key periods? (This helps avoid incorrect assumptions in content)',
  },
  {
    id: 'dual_income',
    category: 'financial',
    question: 'Do you have dual income (you + partner/spouse both working)?',
    type: 'boolean',
    required: false,
    followUp: 'What is your partner\'s approximate income range?',
  },
  {
    id: 'current_savings_rate',
    category: 'financial',
    question: 'What percentage of income do you currently save?',
    type: 'select',
    options: ['Under 10%', '10-20%', '20-30%', '30-50%', '50%+', 'Variable', 'Not sure'],
    required: false,
  },
  {
    id: 'net_worth_range',
    category: 'financial',
    question: 'What is your approximate net worth range?',
    type: 'select',
    options: ['Under $100k', '$100k-$250k', '$250k-$500k', '$500k-$1M', '$1M-$2M', '$2M+', 'Prefer not to say'],
    required: false,
    reasoning: 'Helps tailor content to financial situation',
  },
  {
    id: 'cash_holdings',
    category: 'financial',
    question: 'How do you approach cash holdings?',
    type: 'select',
    options: [
      'Minimal (3-6 months expenses)',
      'Moderate (6-12 months)',
      'Significant (12+ months)',
      'Variable based on circumstances',
      'Prefer not to say',
    ],
    required: false,
    followUp: 'Can you explain your reasoning? (This helps write accurate content about your strategy)',
  },
  {
    id: 'investment_strategy',
    category: 'financial',
    question: 'What is your primary investment strategy?',
    type: 'multi-select',
    options: [
      '401(k) maxing',
      'Roth IRA',
      'Taxable brokerage',
      'Real estate',
      'Side businesses',
      'Other',
    ],
    required: false,
  },
  
  // Career
  {
    id: 'industry',
    category: 'career',
    question: 'What industry do you work in?',
    type: 'text',
    required: false,
    reasoning: 'Helps contextualize burnout and career decisions',
  },
  {
    id: 'career_stage',
    category: 'career',
    question: 'What stage of your career are you in?',
    type: 'select',
    options: ['Early (0-5 years)', 'Mid (5-15 years)', 'Senior (15+ years)', 'Transitioning', 'Retired'],
    required: false,
  },
  {
    id: 'burnout_experience',
    category: 'career',
    question: 'Have you experienced significant burnout?',
    type: 'select',
    options: ['Yes, currently', 'Yes, in the past', 'Somewhat', 'No', 'Prefer not to say'],
    required: false,
    followUp: 'Can you share what contributed to it? (This helps write authentic content)',
  },
  {
    id: 'pay_cut_experience',
    category: 'career',
    question: 'Have you taken a pay cut for better work-life balance?',
    type: 'select',
    options: ['Yes', 'Considering it', 'No, but interested', 'No'],
    required: false,
    followUp: 'What was the percentage reduction, if applicable?',
  },
  
  // Writing Preferences
  {
    id: 'tone_preference',
    category: 'writing',
    question: 'What tone do you prefer in your writing?',
    type: 'multi-select',
    options: [
      'Direct and confident (like MrMoneyMustache)',
      'Analytical and data-driven',
      'Personal and narrative',
      'Contrarian and thought-provoking',
      'Practical and actionable',
      'Witty and humorous',
    ],
    required: false,
  },
  {
    id: 'voice_style',
    category: 'writing',
    question: 'How do you want to come across?',
    type: 'select',
    options: [
      'Expert authority',
      'Peer sharing experience',
      'Questioner of conventional wisdom',
      'Practical guide',
      'Other',
    ],
    required: false,
  },
  {
    id: 'content_examples',
    category: 'writing',
    question: 'Are there specific posts or writers you love? (Share URLs or names)',
    type: 'text',
    required: false,
    reasoning: 'Helps match writing style',
  },
  
  // Content Strategy
  {
    id: 'target_audience',
    category: 'content',
    question: 'Who is your primary target audience?',
    type: 'multi-select',
    options: [
      'High earners ($100k+)',
      'Burned-out professionals',
      'Parents',
      'FIRE enthusiasts',
      'Career changers',
      'Early retirees',
    ],
    required: false,
  },
  {
    id: 'content_goals',
    category: 'content',
    question: 'What are your main goals for this blog?',
    type: 'multi-select',
    options: [
      'Build authority',
      'Generate income',
      'Help others',
      'Document journey',
      'Build community',
      'Other',
    ],
    required: false,
  },
  
  // Goals
  {
    id: 'fire_goals',
    category: 'goals',
    question: 'What are your FIRE goals?',
    type: 'multi-select',
    options: [
      'Full FIRE (complete retirement)',
      'CoastFIRE',
      'BaristaFIRE',
      'FatFIRE',
      'BurnoutFIRE (intentional income reduction)',
      'Not pursuing FIRE',
    ],
    required: false,
  },
  {
    id: 'life_goals',
    category: 'goals',
    question: 'What life goals matter most to you?',
    type: 'text',
    required: false,
    reasoning: 'Helps prioritize content topics',
  },
];

/**
 * Build user profile from answers
 */
export function buildProfileFromAnswers(answers: Record<string, any>): Partial<UserProfile> {
  const profile: Partial<UserProfile> = {
    situation: {
      incomeLevel: mapIncomeToLevel(answers.current_income),
      dualIncome: answers.dual_income === true || answers.dual_income === 'yes',
      savingsRate: mapSavingsRate(answers.current_savings_rate),
      currentStrategy: buildStrategyDescription(answers),
      goals: extractGoals(answers),
    },
    writingStyle: {
      tone: extractTones(answers.tone_preference),
      voice: answers.voice_style || 'peer sharing experience',
      preferredLength: '2500-3000 words for pillar posts',
      avoidKeywords: ['extreme', 'must', 'should', 'always', 'never'],
      preferredKeywords: ['consider', 'might', 'could', 'option', 'perhaps'],
      examples: answers.content_examples ? [answers.content_examples] : [],
    },
    contentPreferences: {
      topics: extractTopics(answers),
      angles: extractAngles(answers),
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
  
  return profile;
}

// Helper functions
function mapIncomeToLevel(income: string): 'high' | 'moderate' | 'variable' {
  if (!income) return 'high'; // Default assumption for target audience
  if (income.includes('$200k') || income.includes('$300k') || income.includes('$500k')) return 'high';
  if (income.includes('$100k') || income.includes('$150k')) return 'moderate';
  return 'variable';
}

function mapSavingsRate(rate: string): number {
  if (!rate) return 30; // Default
  const match = rate.match(/(\d+)/);
  return match ? parseInt(match[1]) : 30;
}

function buildStrategyDescription(answers: Record<string, any>): string {
  const parts: string[] = [];
  
  if (answers.dual_income) {
    parts.push('Dual income covering expenses');
  }
  
  if (answers.investment_strategy) {
    const strategies = Array.isArray(answers.investment_strategy) 
      ? answers.investment_strategy 
      : [answers.investment_strategy];
    
    if (strategies.includes('401(k) maxing')) parts.push('maxing 401(k)');
    if (strategies.includes('Roth IRA')) parts.push('maxing Roth IRA');
    if (strategies.includes('Side businesses')) parts.push('building side hustles');
  }
  
  if (answers.cash_holdings && answers.cash_holdings.includes('Significant')) {
    parts.push('cash+investments as untouched reserves');
  }
  
  return parts.join(', ') || 'Building wealth through multiple strategies';
}

function extractGoals(answers: Record<string, any>): string[] {
  const goals: string[] = [];
  
  if (answers.fire_goals) {
    const fireGoals = Array.isArray(answers.fire_goals) ? answers.fire_goals : [answers.fire_goals];
    goals.push(...fireGoals);
  }
  
  if (answers.life_goals) {
    goals.push(answers.life_goals);
  }
  
  if (answers.content_goals) {
    const contentGoals = Array.isArray(answers.content_goals) ? answers.content_goals : [answers.content_goals];
    goals.push(...contentGoals);
  }
  
  return goals.length > 0 ? goals : ['Financial independence', 'Reduce stress', 'More time with family'];
}

function extractTones(preference: string | string[]): string[] {
  if (!preference) return ['confident', 'rational', 'anti-hustle', 'anti-burnout', 'pragmatic'];
  
  const tones = Array.isArray(preference) ? preference : [preference];
  const toneMap: Record<string, string> = {
    'Direct and confident (like MrMoneyMustache)': 'confident',
    'Analytical and data-driven': 'analytical',
    'Personal and narrative': 'personal',
    'Contrarian and thought-provoking': 'contrarian',
    'Practical and actionable': 'pragmatic',
    'Witty and humorous': 'witty',
  };
  
  return tones.map(t => toneMap[t] || t).filter(Boolean);
}

function extractTopics(answers: Record<string, any>): string[] {
  const topics = ['BurnoutFIRE'];
  
  if (answers.target_audience) {
    const audience = Array.isArray(answers.target_audience) ? answers.target_audience : [answers.target_audience];
    if (audience.includes('High earners ($100k+)')) topics.push('High income vs wealth');
    if (audience.includes('Burned-out professionals')) topics.push('Intentional income reduction');
  }
  
  if (answers.cash_holdings) topics.push('Cash holdings');
  
  return topics;
}

function extractAngles(answers: Record<string, any>): string[] {
  const angles = ['Contrarian', 'Data-driven', 'Personal narrative', 'Practical'];
  
  if (answers.tone_preference && answers.tone_preference.includes('Contrarian')) {
    angles.unshift('Contrarian');
  }
  
  return angles;
}
