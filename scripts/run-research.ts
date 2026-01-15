/**
 * Research Runner Script
 * Run this to conduct actual competitor research
 * 
 * Usage: npm run research
 */

import { runCompetitorResearch } from '../src/utils/agents/research/competitorScraper';
import { findWideMoatOpportunities } from '../src/utils/agents/research/wideMoatAnalysis';
import { updateMarketingPlan } from '../src/utils/agents/knowledge/marketingPlan';

async function main() {
  console.log('🔍 Starting competitor research...\n');
  
  try {
    // Run competitor research
    const profiles = await runCompetitorResearch();
    
    console.log(`✅ Analyzed ${profiles.length} competitors\n`);
    
    profiles.forEach(profile => {
      console.log(`📊 ${profile.name}:`);
      console.log(`   Avg word count: ${profile.content.averageWordCount}`);
      console.log(`   Gaps: ${profile.opportunities.gaps.join(', ')}`);
      console.log(`   Weaknesses: ${profile.content.weaknesses.join(', ')}\n`);
    });
    
    // Find wide moat opportunities
    console.log('🎯 Analyzing wide moat opportunities...\n');
    const opportunities = findWideMoatOpportunities();
    
    opportunities.forEach(opp => {
      console.log(`💎 ${opp.niche}`);
      console.log(`   Competition: ${opp.competition}`);
      console.log(`   Moat: ${opp.moat}`);
      console.log(`   Timeline: ${opp.timeline}\n`);
    });
    
    console.log('✅ Research complete!');
    console.log('📝 View results at /admin/learnings');
    
  } catch (error) {
    console.error('❌ Error running research:', error);
    process.exit(1);
  }
}

main();
