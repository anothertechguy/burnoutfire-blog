/**
 * Agent Orchestrator
 * Coordinates multi-agent workflow for content creation
 * 
 * This orchestrator manages the research → strategy → creation → validation pipeline.
 */

import type { Topic, Post, ResearchData, ContentBrief } from './types';
import * as contentIntelligence from './contentIntelligence';
import * as seoStrategy from './seoStrategy';
import * as writing from './writing';
import * as monetization from './monetization';

/**
 * Full content creation workflow
 * 
 * @param topic - Topic to create content about
 * @returns Created post
 */
export async function createContent(topic: Topic): Promise<Post> {
  // Phase 1: Research
  const keyword = typeof topic === 'string' ? topic : topic.topic;
  const competitorAnalysis = await contentIntelligence.analyzeCompetitors(keyword);
  const serpAnalysis = await seoStrategy.analyzeSERP(keyword);
  
  // Phase 2: Strategy
  const keywordCluster = await seoStrategy.generateKeywordClusters(keyword, serpAnalysis);
  const contentBrief = await seoStrategy.generateContentBrief(topic, {
    competitorAnalysis,
    serpAnalysis,
    contentGaps: [],
    keywordResearch: keywordCluster[0],
    qualityBenchmarks: {} as any,
  });
  
  // Phase 3: Creation
  const post = await writing.writePost(
    contentBrief,
    {
      competitorAnalysis,
      serpAnalysis,
      contentGaps: [],
      keywordResearch: keywordCluster[0],
      qualityBenchmarks: {} as any,
    },
    competitorAnalysis
  );
  
  // Phase 4: Quality Validation
  const qualityReport = await writing.validateQuality(post);
  
  if (!qualityReport.passes) {
    // Enhance content if it doesn't pass
    const enhanced = await writing.ensureCompetitiveAdvantage(
      post,
      competitorAnalysis.topPages
    );
    return enhanced;
  }
  
  // Phase 5: Optimization
  const optimized = await seoStrategy.optimizeForIntent(
    post.body,
    serpAnalysis.searchIntent
  );
  
  // Phase 6: Monetization
  const monetizationStrategy = await monetization.designProductPlacement(
    post,
    {} as any
  );
  
  return post;
}

/**
 * Research-only workflow
 * 
 * @param keyword - Keyword to research
 * @returns Research data
 */
export async function conductResearch(keyword: string): Promise<ResearchData> {
  const competitorAnalysis = await contentIntelligence.analyzeCompetitors(keyword);
  const serpAnalysis = await seoStrategy.analyzeSERP(keyword);
  const contentGaps = await contentIntelligence.identifyContentGaps([], competitorAnalysis.topPages);
  const keywordCluster = await seoStrategy.generateKeywordClusters(keyword, serpAnalysis);
  
  return {
    competitorAnalysis,
    serpAnalysis,
    contentGaps,
    keywordResearch: keywordCluster[0],
    qualityBenchmarks: {} as any,
  };
}
