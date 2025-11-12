# HappinessGPT MVP

> **Discover Your Enneagram Patterns in Social Media**
> Privacy-first AI analysis of your LinkedIn & Twitter communication patterns

[![Status](https://img.shields.io/badge/status-planning-blue.svg)]()
[![Version](https://img.shields.io/badge/version-1.0--MVP-orange.svg)]()
[![Privacy](https://img.shields.io/badge/privacy-first-green.svg)]()

**Team:** Jason, Blossom & Chloe

---

## Overview

**HappinessGPT** is a web application that helps Enneagram-aware individuals gain deeper self-understanding through AI-powered analysis of their professional and social communication patterns.

### The Problem
Enneagram enthusiasts lack tools to understand how their type manifests in their real-world communication. Existing tools rely on lengthy questionnaires or subjective self-assessment, missing the rich behavioral data present in actual social media interactions.

### The Solution
A privacy-first platform that analyzes screenshots or text from LinkedIn and Twitter posts to provide:
- **Behavioral pattern recognition** in your natural communication style
- **Type validation** and identification with confidence scoring
- **Growth recommendations** based on Enneagram dynamics and integration paths
- **Platform-specific insights** (professional vs. casual communication styles)

### Target Users
- **Primary:** Individuals aged 25-45 who know their Enneagram type
- **Characteristics:**
  - Active on LinkedIn and/or Twitter
  - Invested in personal development
  - Privacy-conscious
  - Understand Enneagram basics (centers, wings, stress/security points)

---

## Current Implementation (Phase 1)

**Status:** Text extraction and keyword analysis ✅ Complete

We've implemented a privacy-first Python backend for text extraction and Enneagram pattern analysis:

### Quick Start

```bash
# Install dependencies
pip3 install -r requirements.txt
brew install tesseract

# Run privacy-first analysis (recommended)
python3 analyze_profile.py
```

### What's Working

1. **Text Extraction** (`extract_text.py`)
   - Tesseract OCR for LinkedIn screenshot processing
   - Batch processing of multiple screenshots
   - Word count statistics

2. **Keyword Analysis** (`analyze_keywords.py`)
   - Pattern matching for Types 3, 4, and 7
   - Frequency scoring by keyword category
   - Supporting quotes with context

3. **Privacy-First Workflow** (`analyze_profile.py`) 🔒
   - Automatic screenshot deletion after text extraction
   - Automatic text deletion after analysis
   - Only analysis results are retained
   - Aligns with privacy-first architecture

### Documentation

- [TEXT_EXTRACTION_GUIDE.md](TEXT_EXTRACTION_GUIDE.md) - Setup and usage for OCR
- [PRIVACY_WORKFLOW.md](PRIVACY_WORKFLOW.md) - Privacy-first analysis workflow

---

## Key Features

### 1. Communication Pattern Analysis
Understand your unconscious behavioral patterns across platforms:
- **Assertiveness Level:** Direct vs. diplomatic communication
- **Emotional Expression:** Feeling-forward vs. fact-forward
- **Cognitive Style:** Big picture vs. detail-oriented thinking
- **Interpersonal Focus:** Self-referential vs. other-focused language
- **Temporal Orientation:** Past/present/future focus in messaging

**Platform Distinction:** See how your style shifts between LinkedIn (professional) and Twitter (casual) contexts.

### 2. Type Identification & Validation
For users exploring or validating their Enneagram type:
- Primary type identification (1-9) with confidence scoring
- Wing determination (e.g., 4w3 vs. 4w5)
- Evidence-based analysis with supporting quotes from your posts
- Comparison view if your known type differs from detected type

**Note:** For best results, the MVP focuses on providing insights for users who already know their type, with type suggestions as a secondary feature.

### 3. Enneagram Growth Recommendations
Receive 3-5 specific, actionable recommendations for personal development:
- Tied to your type's growth lines and integration paths
- Platform-specific suggestions (LinkedIn vs. Twitter tactics)
- Practices for moving toward your security point (Type 3 → 6, Type 4 → 1, etc.)
- Based on your actual communication patterns, not generic advice

**Example for Type 3:**
```
LinkedIn: Practice sharing failures/learnings, not just successes
Twitter: Experiment with expressing emotions without achievement context
Integration (→6): Ask more questions to show collaborative thinking
```

### 4. Privacy-First Architecture
Your data never leaves your device:
- All screenshot processing happens client-side
- No account required, no data storage
- Images deleted from memory immediately after analysis
- Anonymous usage analytics only (no content tracking)

---

## How It Works

```
1. Upload → Upload 5-10 screenshots from LinkedIn/Twitter (or paste text)
2. Process → AI extracts and analyzes linguistic patterns on your device
3. Analyze → Pattern matching against Enneagram type indicators
4. Report → Receive detailed insights with growth recommendations
5. Delete → All data automatically purged after analysis
```

**Time to completion:** ~30 seconds from upload to insights

---

## Privacy & Security

### Our Commitments
- **No server upload:** All image processing happens in your browser
- **No storage:** Screenshots deleted from memory immediately after processing
- **No tracking:** No analytics on your content, only anonymous usage metrics
- **No accounts:** No registration or login required

### Compliance
- GDPR-compliant (no personal data collection)
- CCPA-compliant (California privacy standards)
- Clear privacy policy displayed before upload

### What We Do Collect
Anonymous usage data only:
- Number of screenshots uploaded (not their content)
- Time to completion
- Feature usage patterns (which buttons clicked)
- Error rates for debugging

**We never collect:** Screenshot contents, extracted text, type results, or any identifiable information.

---

## Technology Approach

### Core Stack
- **Frontend:** React 18+ with TypeScript
- **AI Processing:** Client-side ML models + optional server-side LLM for enhanced analysis
- **Image Processing:** OCR for text extraction from screenshots
- **Styling:** Tailwind CSS for responsive design
- **Privacy:** Web Workers for isolated processing

### Analysis Engine
The app uses multi-dimensional linguistic analysis:
- **Lexical patterns:** Pronoun usage, emotional vocabulary, certainty markers
- **Syntactic patterns:** Sentence structure, question ratios, self-reference frequency
- **Semantic patterns:** Achievement language, relationship focus, temporal markers
- **Type-specific markers:** 9 distinct profiles with keyword clusters and behavioral indicators

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-3)
**Status:** Planning
- [ ] Upload interface with drag-and-drop
- [ ] Text extraction (OCR + manual input option)
- [ ] Basic pattern matching for 3 Enneagram types
- [ ] Beta validation with 20 Enneagram experts

### Phase 2: Core ML (Weeks 4-6)
**Status:** Not Started
- [ ] Complete type identification algorithm (all 9 types + wings)
- [ ] Behavioral pattern extraction engine
- [ ] Confidence scoring system
- [ ] Beta testing with 50 users

### Phase 3: Full Feature Set (Weeks 7-9)
**Status:** Not Started
- [ ] Growth recommendations engine
- [ ] Platform-specific insights (LinkedIn vs Twitter comparison)
- [ ] Enhanced UI/UX based on user feedback
- [ ] Performance optimization

### Phase 4: Launch Prep (Week 10)
**Status:** Not Started
- [ ] Polish and error handling
- [ ] Legal review (privacy policy finalization)
- [ ] Soft launch to Enneagram communities
- [ ] Monitor and iterate based on real-world usage

---

## Success Criteria

### Launch Week Goals
- 500 analyses completed
- 60% completion rate (upload → finished report)
- Average report read time > 3 minutes (engagement indicator)
- Zero privacy incidents

### Month 1 KPIs
- 5,000 total analyses
- "Insight usefulness" rating > 4/5
- 30% of users share their results
- 25% return for second platform analysis

### Quality Metrics
- Time to analysis: < 30 seconds
- Browser compatibility: Chrome, Safari, Firefox, Edge (latest 2 versions)
- Mobile responsive: Full functionality on tablet+ devices

---

## Enneagram Type Indicators

The analysis engine recognizes patterns across all 9 types:

| Type | Core Pattern | Linguistic Markers | Common Topics |
|------|-------------|-------------------|---------------|
| **1 - Perfectionist** | Corrective, principled | "should", "correct", "improve", "right" | Ethics, systems, best practices |
| **2 - Helper** | Other-focused, warm | "help", "need", "appreciate", "support" | Relationships, celebrating others |
| **3 - Achiever** | Results-oriented | "achieve", "success", "goal", "efficient" | Milestones, metrics, wins |
| **4 - Individualist** | Authentic, introspective | "feel", "unique", "authentic", "identity" | Creativity, self-expression |
| **5 - Investigator** | Analytical, knowledge-seeking | "analyze", "understand", "research", "data" | Expertise, insights, learning |
| **6 - Loyalist** | Collaborative, cautious | "we", "team", "consider", "prepare" | Planning, risk mitigation |
| **7 - Enthusiast** | Optimistic, experiential | "exciting", "new", "opportunity", "fun" | Possibilities, experiences |
| **8 - Challenger** | Direct, assertive | "will", "must", "strong", "directly" | Leadership, justice, power |
| **9 - Peacemaker** | Harmonious, inclusive | "everyone", "perspective", "agree", "balanced" | Consensus, multiple viewpoints |

**Note:** Real analysis is multi-dimensional, considering context, frequency, and interaction between multiple patterns.

---

## Future Roadmap (Post-MVP)

### Planned Features
- **Month 2-3:** Instagram and Facebook analysis
- **Month 4:** Relationship dynamics (analyze conversation threads)
- **Month 5:** Temporal tracking (growth over time comparisons)
- **Month 6:** API for Enneagram coaches and applications
- **Month 7+:** Native mobile apps with enhanced features

### Potential Enhancements
- Team/organization communication culture analysis
- Comparative benchmarks ("Type 3s average 45% achievement language, you: 65%")
- Stress vs. security state detection based on posting patterns
- Integration with journaling apps for deeper insights

---

## Contributing

**Current Status:** This project is in the planning phase. We're currently:
- Finalizing technical architecture decisions
- Building the Enneagram pattern matching algorithm
- Recruiting beta testers from Enneagram communities

**Interested in Contributing?**
- **Enneagram Experts:** Help validate our type indicators and pattern matching
- **Beta Testers:** Sign up to test early versions and provide feedback
- **Developers:** (Coming soon) Open source contributions once core engine is stable

**For inquiries:** See repository issues or contact the product owner.

---

## Technical Considerations & Open Questions

### Architecture Decisions in Progress
1. **On-device vs. Server Processing:**
   - Pure client-side: Maximum privacy, but limited model capability
   - Hybrid: Client-side OCR + server-side text analysis with user consent
   - Decision pending user research on privacy preferences

2. **OCR Strategy:**
   - Option A: Tesseract.js (fully local, 60-80% accuracy)
   - Option B: GPT-4 Vision API (server-side, 95%+ accuracy)
   - Option C: Manual text input as primary method
   - Leaning toward: C + B combination

3. **Type Identification Approach:**
   - MVP Focus: Behavioral insights for users who know their type
   - Phase 2: Add type suggestions with confidence scores
   - Rationale: Reduce accuracy pressure, increase user satisfaction

---

## License

**Status:** To be determined (planning phase)

---

## Acknowledgments

Built for the Enneagram community with privacy and personal growth as core values.

Special thanks to:
- Enneagram Institute for type theory foundations
- Beta testers and advisors (TBD)
- The broader personality psychology research community

---

**Document Version:** 1.0
**Last Updated:** November 12, 2025
**Next Milestone:** Technical architecture finalization → Development kickoff
