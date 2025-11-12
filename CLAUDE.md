# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**HappinessGPT** is a privacy-first web application that analyzes LinkedIn and Twitter communication patterns to provide Enneagram-based behavioral insights and personal growth recommendations.

**Current Status:** Planning phase - no source code implemented yet.

**Target Stack:** React 18+ with TypeScript, Tailwind CSS, client-side ML models for privacy-first processing.

## Architecture Principles

### Privacy-First Design
This is the core architectural constraint:
- All screenshot/image processing MUST happen client-side (browser-based)
- No server upload of user content
- No data persistence - immediate deletion post-analysis
- Use Web Workers for isolated processing
- Only anonymous usage metrics allowed (no content tracking)

### Hybrid Processing Model
The app is designed to use a two-tier approach:
1. **Client-side:** OCR text extraction from screenshots
2. **Server-side (optional):** LLM-based text analysis (with user consent)
3. **Fallback:** Manual text input as primary method

### Multi-Platform Analysis
The system must distinguish between:
- LinkedIn communication patterns (professional context)
- Twitter communication patterns (casual context)
- Platform-specific behavioral differences

## Core Analysis Engine

### Pattern Recognition Dimensions
The AI analysis must evaluate across 5 dimensions:
1. **Assertiveness Level:** Direct vs. diplomatic communication
2. **Emotional Expression:** Feeling-forward vs. fact-forward
3. **Cognitive Style:** Big picture vs. detail-oriented
4. **Interpersonal Focus:** Self-referential vs. other-focused
5. **Temporal Orientation:** Past/present/future focus

### Enneagram Type Mapping
The system maps linguistic patterns to 9 Enneagram types:
- **Type 1 (Perfectionist):** "should", "correct", "improve", "right"
- **Type 2 (Helper):** "help", "need", "appreciate", "support"
- **Type 3 (Achiever):** "achieve", "success", "goal", "efficient"
- **Type 4 (Individualist):** "feel", "unique", "authentic", "identity"
- **Type 5 (Investigator):** "analyze", "understand", "research", "data"
- **Type 6 (Loyalist):** "we", "team", "consider", "prepare"
- **Type 7 (Enthusiast):** "exciting", "new", "opportunity", "fun"
- **Type 8 (Challenger):** "will", "must", "strong", "directly"
- **Type 9 (Peacemaker):** "everyone", "perspective", "agree", "balanced"

Analysis must be multi-dimensional, considering context, frequency, and interaction between patterns.

### Output Format
The system generates:
1. **Pattern Analysis:** 5 behavioral dimensions with scores/descriptions
2. **Type Identification:** Primary type + wing with confidence scores
3. **Evidence:** Supporting quotes from user's posts
4. **Growth Recommendations:** 3-5 actionable suggestions tied to integration paths

## Development Phases

### Phase 1: Foundation (Weeks 1-3)
- Upload interface with drag-and-drop
- Text extraction (OCR + manual input)
- Basic pattern matching for 3 types initially
- Beta validation with 20 Enneagram experts

### Phase 2: Core ML (Weeks 4-6)
- Complete all 9 types + wings
- Behavioral pattern extraction engine
- Confidence scoring system

### Phase 3: Full Feature Set (Weeks 7-9)
- Growth recommendations engine
- Platform-specific insights (LinkedIn vs Twitter comparison)
- Enhanced UI/UX

### Phase 4: Launch Prep (Week 10)
- Error handling and polish
- Privacy policy finalization
- Soft launch preparation

## Open Architectural Decisions

### OCR Strategy
Three approaches under consideration:
- **Option A:** Tesseract.js (fully local, 60-80% accuracy)
- **Option B:** GPT-4 Vision API (server-side, 95%+ accuracy)
- **Option C:** Manual text input as primary method
- **Current direction:** C + B combination

### MVP Scope Decision
Focus on users who already know their Enneagram type:
- Primary: Behavioral insights for known types
- Secondary: Type suggestions with confidence scores
- Rationale: Reduces accuracy pressure, increases satisfaction

## Key Constraints

### Performance Targets
- Time to analysis: < 30 seconds from upload to insights
- Browser compatibility: Chrome, Safari, Firefox, Edge (latest 2 versions)
- Mobile responsive: Full functionality on tablet+ devices

### Privacy Compliance
Must meet:
- GDPR compliance (no personal data collection)
- CCPA compliance (California privacy standards)
- Clear privacy policy displayed before upload

### User Flow
```
Upload (5-10 screenshots/text)
  → Process (client-side extraction)
  → Analyze (pattern matching)
  → Report (insights + recommendations)
  → Delete (automatic data purge)
```

## Target Users
- Age 25-45, already know their Enneagram type
- Active on LinkedIn/Twitter
- Privacy-conscious
- Invested in personal development

## When Implementing Features

### For Upload/Processing Features
- Prioritize privacy: process locally before considering server calls
- Support both screenshot upload AND manual text input
- Use Web Workers to avoid blocking UI during processing
- Delete data immediately after analysis completes

### For Analysis Features
- Support multi-dimensional scoring (not just keyword matching)
- Provide evidence-based insights with quoted examples
- Calculate confidence scores for type identification
- Consider platform context (LinkedIn vs Twitter differences)

### For Growth Recommendations
- Tie recommendations to Enneagram integration paths
- Provide platform-specific tactics
- Base suggestions on actual detected patterns, not generic advice
- Limit to 3-5 actionable recommendations

## Future Roadmap Context
Post-MVP features planned:
- Instagram/Facebook analysis
- Relationship dynamics (conversation thread analysis)
- Temporal tracking (growth over time)
- API for coaches
- Native mobile apps
