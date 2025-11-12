import { AnalysisResult, BehavioralDimensions } from '../types';

export const mockBehavioralDimensions: BehavioralDimensions = {
  assertiveness: {
    name: 'Assertiveness Level',
    score: 72,
    description: 'Your communication tends toward direct and confident expression',
    leftLabel: 'Direct',
    rightLabel: 'Diplomatic',
  },
  emotionalExpression: {
    name: 'Emotional Expression',
    score: 45,
    description: 'You balance factual information with emotional awareness',
    leftLabel: 'Feeling-forward',
    rightLabel: 'Fact-forward',
  },
  cognitiveStyle: {
    name: 'Cognitive Style',
    score: 65,
    description: 'You focus more on big-picture thinking than details',
    leftLabel: 'Big Picture',
    rightLabel: 'Detail-Oriented',
  },
  interpersonalFocus: {
    name: 'Interpersonal Focus',
    score: 38,
    description: 'Your language shows strong self-awareness and self-reference',
    leftLabel: 'Self-Referential',
    rightLabel: 'Other-Focused',
  },
  temporalOrientation: {
    name: 'Temporal Orientation',
    score: 58,
    description: 'You maintain balanced attention across past, present, and future',
    leftLabel: 'Past',
    rightLabel: 'Future',
  },
};

export const mockAnalysisResult: AnalysisResult = {
  typeIdentification: {
    primaryType: 3,
    wing: 'w4',
    confidence: 82,
    description: 'The Achiever with a creative edge - success-oriented with authentic self-expression',
  },
  behavioralDimensions: mockBehavioralDimensions,
  growthRecommendations: [
    {
      id: '1',
      title: 'Practice vulnerability in success stories',
      description: 'Share the challenges and failures alongside your achievements to build deeper connections.',
      platform: 'LinkedIn',
      category: 'practice',
    },
    {
      id: '2',
      title: 'Express emotions without achievement context',
      description: 'Try posting about feelings or experiences that aren\'t tied to productivity or accomplishment.',
      platform: 'Twitter',
      category: 'practice',
    },
    {
      id: '3',
      title: 'Integration toward Type 6: Ask collaborative questions',
      description: 'Move toward security by seeking input from others and showing collaborative thinking patterns.',
      platform: 'both',
      category: 'integration',
    },
    {
      id: '4',
      title: 'Embrace your Type 4 wing\'s authenticity',
      description: 'Let your unique perspective and creative self-expression shine through more often.',
      platform: 'both',
      category: 'awareness',
    },
    {
      id: '5',
      title: 'Notice achievement-oriented language patterns',
      description: 'Become aware of how often you frame experiences through the lens of success and productivity.',
      platform: 'both',
      category: 'awareness',
    },
  ],
  evidence: [
    {
      quote: 'Excited to share that our team achieved 150% of our quarterly goals!',
      platform: 'LinkedIn',
      analysis: 'Achievement-focused language with emphasis on metrics and success',
    },
    {
      quote: 'The key to success is staying focused on your unique strengths',
      platform: 'Twitter',
      analysis: 'Combines Type 3 success orientation with Type 4 wing\'s focus on uniqueness',
    },
    {
      quote: 'Proud of how efficiently we executed this project under pressure',
      platform: 'LinkedIn',
      analysis: 'Direct communication style emphasizing efficiency and results',
    },
  ],
  analysisDate: new Date().toISOString(),
};
