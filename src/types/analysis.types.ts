// Enneagram Types
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Wing = 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'w6' | 'w7' | 'w8' | 'w9';

export interface EnneagramTypeResult {
  primaryType: EnneagramType;
  wing: Wing | null;
  confidence: number; // 0-100
  description: string;
}

// Behavioral Dimensions
export interface BehavioralDimension {
  name: string;
  score: number; // 0-100
  description: string;
  leftLabel: string;  // e.g., "Direct"
  rightLabel: string; // e.g., "Diplomatic"
}

export interface BehavioralDimensions {
  assertiveness: BehavioralDimension;
  emotionalExpression: BehavioralDimension;
  cognitiveStyle: BehavioralDimension;
  interpersonalFocus: BehavioralDimension;
  temporalOrientation: BehavioralDimension;
}

// Growth Recommendations
export interface GrowthRecommendation {
  id: string;
  title: string;
  description: string;
  platform?: 'LinkedIn' | 'Twitter' | 'both';
  category: 'integration' | 'awareness' | 'practice';
}

// Supporting Evidence
export interface Evidence {
  quote: string;
  platform: 'LinkedIn' | 'Twitter';
  analysis: string;
}

// Complete Analysis Result
export interface AnalysisResult {
  typeIdentification: EnneagramTypeResult;
  behavioralDimensions: BehavioralDimensions;
  growthRecommendations: GrowthRecommendation[];
  evidence: Evidence[];
  analysisDate: string;
}

// Platform Statistics
export interface PlatformStats {
  linkedInPosts: number;
  twitterPosts: number;
  totalWords: number;
  averagePostLength: number;
}
