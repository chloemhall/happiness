import { AnalysisResult } from '../types';

export interface CelebritySample extends AnalysisResult {
  name: string;
  role: string;
  avatar: string; // emoji for now
}

export const celebritySamples: CelebritySample[] = [
  {
    name: 'Brené Brown',
    role: 'Researcher & Author',
    avatar: '👩‍🏫',
    typeIdentification: {
      primaryType: 8,
      wing: 'w7',
      confidence: 89,
      description: 'The Challenger with enthusiasm - direct, protective, and energetically engaged',
    },
    behavioralDimensions: {
      assertiveness: {
        name: 'Assertiveness Level',
        score: 85,
        description: 'Highly direct and confident communication style with strong conviction',
        leftLabel: 'Direct',
        rightLabel: 'Diplomatic',
      },
      emotionalExpression: {
        name: 'Emotional Expression',
        score: 25,
        description: 'Leads with emotional authenticity and vulnerability',
        leftLabel: 'Feeling-forward',
        rightLabel: 'Fact-forward',
      },
      cognitiveStyle: {
        name: 'Cognitive Style',
        score: 35,
        description: 'Balances big-picture vision with concrete research',
        leftLabel: 'Big Picture',
        rightLabel: 'Detail-Oriented',
      },
      interpersonalFocus: {
        name: 'Interpersonal Focus',
        score: 70,
        description: 'Strong focus on others while maintaining personal boundaries',
        leftLabel: 'Self-Referential',
        rightLabel: 'Other-Focused',
      },
      temporalOrientation: {
        name: 'Temporal Orientation',
        score: 45,
        description: 'Present-focused with attention to ongoing human experiences',
        leftLabel: 'Past',
        rightLabel: 'Future',
      },
    },
    growthRecommendations: [
      {
        id: '1',
        title: 'Practice receiving without leading',
        description: 'Allow space for others to offer support without immediately shifting to action mode.',
        platform: 'Twitter',
        category: 'integration',
      },
      {
        id: '2',
        title: 'Notice protective instincts',
        description: 'Become aware of when you\'re leading with strength to avoid vulnerability.',
        platform: 'both',
        category: 'awareness',
      },
      {
        id: '3',
        title: 'Lean into your 7 wing\'s lightness',
        description: 'Let your enthusiastic, playful side show more often in professional contexts.',
        platform: 'LinkedIn',
        category: 'practice',
      },
    ],
    evidence: [
      {
        quote: 'I will not shrink. I will not puff up. I will stand my sacred ground.',
        platform: 'Twitter',
        analysis: 'Classic Type 8 boundary-setting with emotional authenticity',
      },
      {
        quote: 'Vulnerability is not winning or losing. It\'s having the courage to show up.',
        platform: 'LinkedIn',
        analysis: 'Direct language about emotions with protective strength underneath',
      },
      {
        quote: 'Let\'s be the grownups who show up and do the hard things.',
        platform: 'Twitter',
        analysis: 'Assertive call to action with protective leadership energy',
      },
    ],
    analysisDate: new Date('2024-01-15').toISOString(),
  },
  {
    name: 'Bill Gates',
    role: 'Philanthropist & Tech Pioneer',
    avatar: '👨‍💼',
    typeIdentification: {
      primaryType: 5,
      wing: 'w6',
      confidence: 91,
      description: 'The Investigator with loyalty - analytical, systems-focused, and cautiously engaged',
    },
    behavioralDimensions: {
      assertiveness: {
        name: 'Assertiveness Level',
        score: 45,
        description: 'Measured and thoughtful communication, preferring facts over force',
        leftLabel: 'Direct',
        rightLabel: 'Diplomatic',
      },
      emotionalExpression: {
        name: 'Emotional Expression',
        score: 82,
        description: 'Highly fact-oriented with minimal emotional display',
        leftLabel: 'Feeling-forward',
        rightLabel: 'Fact-forward',
      },
      cognitiveStyle: {
        name: 'Cognitive Style',
        score: 35,
        description: 'Big-picture systemic thinking grounded in data',
        leftLabel: 'Big Picture',
        rightLabel: 'Detail-Oriented',
      },
      interpersonalFocus: {
        name: 'Interpersonal Focus',
        score: 65,
        description: 'Focus on global issues and systems rather than personal narrative',
        leftLabel: 'Self-Referential',
        rightLabel: 'Other-Focused',
      },
      temporalOrientation: {
        name: 'Temporal Orientation',
        score: 75,
        description: 'Strong future orientation with data-driven planning',
        leftLabel: 'Past',
        rightLabel: 'Future',
      },
    },
    growthRecommendations: [
      {
        id: '1',
        title: 'Share personal stories behind data',
        description: 'Connect facts to human experiences to build emotional resonance.',
        platform: 'both',
        category: 'practice',
      },
      {
        id: '2',
        title: 'Integration toward Type 8: Express conviction',
        description: 'Move toward action by stating opinions more directly without over-qualifying.',
        platform: 'Twitter',
        category: 'integration',
      },
      {
        id: '3',
        title: 'Balance expertise with curiosity',
        description: 'Show more of the learning process, not just the conclusions.',
        platform: 'LinkedIn',
        category: 'awareness',
      },
    ],
    evidence: [
      {
        quote: 'I just finished reading this fascinating paper on mRNA vaccine development...',
        platform: 'Twitter',
        analysis: 'Type 5 knowledge-seeking with investigative excitement',
      },
      {
        quote: 'The data shows we can reduce child mortality by 50% if we scale these interventions.',
        platform: 'LinkedIn',
        analysis: 'Fact-forward communication focused on systems and outcomes',
      },
      {
        quote: 'I underestimated how complex this problem would be. Here\'s what I learned...',
        platform: 'Twitter',
        analysis: 'Type 5 intellectual honesty and continuous learning orientation',
      },
    ],
    analysisDate: new Date('2024-01-20').toISOString(),
  },
  {
    name: 'Richard Branson',
    role: 'Entrepreneur & Adventurer',
    avatar: '🚀',
    typeIdentification: {
      primaryType: 7,
      wing: 'w8',
      confidence: 87,
      description: 'The Enthusiast with boldness - adventure-seeking, optimistic, and assertively engaged',
    },
    behavioralDimensions: {
      assertiveness: {
        name: 'Assertiveness Level',
        score: 78,
        description: 'Confident and energetic communication with entrepreneurial boldness',
        leftLabel: 'Direct',
        rightLabel: 'Diplomatic',
      },
      emotionalExpression: {
        name: 'Emotional Expression',
        score: 35,
        description: 'Enthusiasm-forward with positive emotional energy',
        leftLabel: 'Feeling-forward',
        rightLabel: 'Fact-forward',
      },
      cognitiveStyle: {
        name: 'Cognitive Style',
        score: 25,
        description: 'Strong big-picture thinking focused on possibilities',
        leftLabel: 'Big Picture',
        rightLabel: 'Detail-Oriented',
      },
      interpersonalFocus: {
        name: 'Interpersonal Focus',
        score: 55,
        description: 'Balances personal adventure stories with team acknowledgment',
        leftLabel: 'Self-Referential',
        rightLabel: 'Other-Focused',
      },
      temporalOrientation: {
        name: 'Temporal Orientation',
        score: 85,
        description: 'Highly future-focused with emphasis on opportunities',
        leftLabel: 'Past',
        rightLabel: 'Future',
      },
    },
    growthRecommendations: [
      {
        id: '1',
        title: 'Integration toward Type 5: Deepen focus',
        description: 'Practice sustained attention on one project before jumping to the next opportunity.',
        platform: 'both',
        category: 'integration',
      },
      {
        id: '2',
        title: 'Acknowledge difficult emotions',
        description: 'Share challenges and setbacks, not just the exciting wins and adventures.',
        platform: 'Twitter',
        category: 'practice',
      },
      {
        id: '3',
        title: 'Notice restlessness patterns',
        description: 'Become aware of when you\'re avoiding discomfort by seeking the next exciting thing.',
        platform: 'both',
        category: 'awareness',
      },
    ],
    evidence: [
      {
        quote: 'Just announced our plan to launch commercial space tourism! The future is here!',
        platform: 'Twitter',
        analysis: 'Type 7 future-focused enthusiasm with bold vision',
      },
      {
        quote: 'Life is about saying YES to adventure and seeing where it takes you!',
        platform: 'LinkedIn',
        analysis: 'Enthusiast energy with emphasis on possibilities and optimism',
      },
      {
        quote: 'Why choose between business OR fun? Virgin is built on doing both simultaneously.',
        platform: 'Twitter',
        analysis: 'Type 7 resistance to limitation combined with Type 8 wing assertiveness',
      },
    ],
    analysisDate: new Date('2024-01-25').toISOString(),
  },
];
