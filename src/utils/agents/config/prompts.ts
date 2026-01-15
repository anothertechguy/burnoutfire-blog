/**
 * Agent Prompt Templates
 * All prompts are externalized here for easy editing
 * Modify these to change agent behavior without touching implementation code
 */

export const WRITING_PROMPTS = {
  tone: `
    Write in the style of: confident, rational, anti-hustle, anti-burnout.
    Avoid: toxic frugality, extreme minimalism, judgmental language.
    Include: personal narratives, clear financial logic, actionable steps.
    Target audience: high earners (>$120k), burned-out professionals, parents.
    
    **MrMoneyMustache Tone Matching (where applicable):**
    - Direct and confident: State opinions clearly without hedging
    - Witty and conversational: Use humor and casual language naturally
    - Contrarian but logical: Challenge conventional wisdom with sound reasoning
    - Personal and relatable: Share experiences that readers connect with
    - Actionable: Every point should lead to something the reader can do
    - No fluff: Get to the point, but don't sacrifice depth for brevity
    
    Voice: Like MrMoneyMustache (direct, confident, witty, contrarian) but with your own unique perspective and original content.
    Be conversational but authoritative. Use "I" and "you" to create connection.
    
    **Tone Analysis from MrMoneyMustache:**
    - Opens with strong, contrarian hook
    - Uses "you" frequently to engage reader
    - Mixes personal anecdotes with universal truths
    - Ends with clear call to action or takeaway
    - Uses short paragraphs for readability
    - Balances humor with serious financial advice
  `,
  
  structure: `
    Start with a personal hook or contrarian statement that differentiates from competitors.
    Build with clear sections and subheadings that match search intent.
    Include real numbers and calculations where relevant (research-backed).
    Address questions from People Also Ask and related searches.
    End with actionable takeaways that go beyond competitor content.
    Structure should beat competitor average: more depth, better organization.
    Use H2 for main sections, H3 for subsections. Keep paragraphs to 3-4 sentences.
  `,
  
  researchIntegration: `
    Before writing, analyze top 10 ranking pages for target keyword.
    Identify: what competitors cover, what they miss, unique angles.
    Ensure content is more comprehensive, deeper, and more actionable.
    Include data, studies, or calculations competitors don't have.
    Address search intent more completely than competitors.
    Use competitor analysis to find gaps and opportunities.
  `,
  
  quality: `
    Every claim must be research-backed or clearly labeled as opinion.
    Include specific numbers, calculations, or data where possible.
    Use examples and case studies (anonymized) to illustrate points.
    Ensure content depth exceeds competitor average by 20%+.
    Make every section actionable - readers should know what to do next.
    Avoid fluff. Every paragraph should add value.
    Use bullet points and lists for scannability.
  `,
  
  differentiation: `
    Find unique angles competitors don't cover.
    Challenge conventional wisdom when appropriate.
    Provide deeper analysis than surface-level content.
    Include personal experiences that add authenticity.
    Offer contrarian perspectives backed by logic.
  `,
};

export const SEO_PROMPTS = {
  keywordResearch: `
    Identify primary keyword and semantic variations.
    Find long-tail opportunities with lower competition.
    Extract questions from People Also Ask.
    Map search intent (informational, transactional, navigational).
    Prioritize keywords by search volume and competition.
  `,
  
  contentOptimization: `
    Optimize for search intent, not keyword stuffing.
    Use keywords naturally in headings and first paragraph.
    Maintain 1-3% keyword density.
    Include related terms and synonyms.
    Structure content to answer user questions.
  `,
  
  serpOptimization: `
    Target featured snippets with clear, concise answers.
    Address People Also Ask questions in content.
    Optimize for related searches.
    Use schema markup for rich snippets.
    Structure headings to match search intent.
  `,
};

export const CONTENT_INTELLIGENCE_PROMPTS = {
  competitorAnalysis: `
    Analyze top 10-20 ranking pages for target keyword.
    Extract: word count, structure, headings, links, readability.
    Identify: content depth, unique angles, missing topics.
    Benchmark: readability scores, engagement signals, E-E-A-T indicators.
    Track: update frequency, content freshness, backlink profiles.
  `,
  
  gapAnalysis: `
    Compare our content vs competitor content.
    Identify topics competitors cover that we don't.
    Find angles competitors miss.
    Discover underserved search intents.
    Prioritize gaps by opportunity score (traffic potential + competition).
  `,
};

export const MONETIZATION_PROMPTS = {
  affiliatePlacement: `
    Suggest high-intent affiliate opportunities.
    Place links naturally within content flow.
    Ensure relevance to content topic.
    Don't compromise content quality for monetization.
    Disclose affiliate relationships transparently.
  `,
  
  productPlacement: `
    Design product placements that don't hurt trust.
    Integrate naturally into content narrative.
    Focus on high-value, relevant products.
    Provide genuine value, not just promotion.
  `,
};
