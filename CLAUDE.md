# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**HappinessGPT** is a privacy-first web application that analyzes LinkedIn and Twitter communication patterns to provide Enneagram-based behavioral insights and personal growth recommendations.

**Current Status:** Phase 1 Frontend Complete - Ready for backend integration

**Tech Stack:**
- Vite + React 18 + TypeScript
- Tailwind CSS v4 with @tailwindcss/postcss
- React Router for navigation
- Context + useReducer for state management

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Runs at http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Card, etc.)
│   ├── upload/          # Upload interface components
│   └── results/         # Results display components
├── context/             # AppContext with useReducer
├── pages/               # UploadPage, ResultsPage
├── types/               # TypeScript definitions
├── utils/               # Utilities (validation, cleanup, mock data)
└── workers/             # Web Workers (placeholder for backend)
```

## Architecture Principles

### Privacy-First Design
This is the core architectural constraint:
- All screenshot/image processing MUST happen client-side (browser-based)
- No server upload of user content
- No data persistence - immediate deletion post-analysis
- Use Web Workers for isolated processing
- Only anonymous usage metrics allowed (no content tracking)

### Current Implementation
**Completed:**
- Privacy modal with GDPR/CCPA compliance
- Upload interface with drag-drop (1-3 items, 5MB max)
- File preview with remove/reorder
- Manual text input alternative
- Complete results display (all 3 sections)
- State management with AppContext
- Error boundary and loading states
- Responsive design (tablet+)

**Using Mock Data:**
- Currently displays example analysis results
- Ready for backend integration

### User Flow Constraints
```
1. Privacy acceptance (required first)
2. Upload 1-3 items:
   - Screenshots (PNG/JPEG, max 5MB each)
   - OR manual text input
3. Processing overlay (simulated ~2 seconds)
4. Results display with:
   - Type identification (Type 3w4 example)
   - 5 behavioral dimensions
   - Growth recommendations
5. Download results or analyze again
6. Automatic data cleanup
```

## Core Analysis Engine (To Be Implemented)

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

## Implementation Status

### ✅ Phase 1: Frontend Complete
- [x] Vite + React 18 + TypeScript setup
- [x] Tailwind CSS v4 configuration
- [x] Privacy modal with compliance
- [x] Upload interface (drag-drop + manual input)
- [x] File preview with controls
- [x] Results display components
- [x] State management (Context + useReducer)
- [x] Error handling and loading states
- [x] Responsive design
- [x] Mock data for testing

### 🚧 Phase 1: Backend Remaining
- [ ] Tesseract.js OCR implementation
- [ ] Web Workers setup
- [ ] Pattern matching for Types 3, 4, 7
- [ ] 5-dimensional linguistic analysis
- [ ] Confidence scoring system
- [ ] Data cleanup automation

### 📋 Phase 2: Core ML (Planned)
- [ ] Complete all 9 types + wings
- [ ] Enhanced analysis engine
- [ ] Improved confidence scoring

### 📋 Phase 3: Full Features (Planned)
- [ ] Growth recommendations engine
- [ ] Platform-specific insights
- [ ] Enhanced UI/UX

## Key Configuration Notes

### Tailwind CSS v4
**Important:** Tailwind v4 uses different syntax:
- Use `@import "tailwindcss"` in CSS (NOT `@tailwind` directives)
- PostCSS config requires `@tailwindcss/postcss` plugin
- See `postcss.config.js` and `src/index.css` for correct setup

### File Upload Limits
- **MIN_FILES:** 1 (low barrier to entry)
- **MAX_FILES:** 3 (focused, not overwhelming)
- **MAX_FILE_SIZE:** 5MB per file
- **ACCEPTED_TYPES:** PNG, JPEG, JPG

### State Management
- AppContext provides global state
- useReducer handles complex state logic
- Actions: ACCEPT_PRIVACY, ADD_FILES, START_PROCESSING, etc.
- See `src/types/app.types.ts` for full action list

## When Implementing Backend Features

### For OCR Integration
1. Use Tesseract.js for client-side processing
2. Set up Web Worker to avoid blocking UI
3. Process images in batch if multiple files
4. Extract text and pass to analysis engine
5. Clean up image data immediately after

### For Analysis Engine
1. Create pattern matching algorithms (start with Types 3, 4, 7)
2. Implement 5-dimensional scoring
3. Calculate confidence levels
4. Collect evidence quotes
5. Return `AnalysisResult` type (see `src/types/analysis.types.ts`)

### Integration Points
- Mock data in `src/utils/mockData.ts` shows expected format
- Replace `mockAnalysisResult` with actual analysis in `UploadPage.tsx:handleAnalyze`
- Use existing types for type safety
- Maintain < 30 second processing time target

## UX Principles Implemented

### Progressive Disclosure
- Privacy modal shown first
- Manual text input hidden behind toggle
- File preview only shows when files added
- Progress bar only shows when content added

### Low Barriers to Entry
- Only 1 item minimum (vs original 5)
- Maximum 3 items (vs original 10)
- Smaller file size (5MB vs 10MB)
- Clear, simple messaging

### Clear Feedback
- Visual upload state (pending/processing/error)
- Progress indicator
- Success/error messages
- Loading overlays

## Privacy Compliance

**GDPR/CCPA Requirements:**
- Privacy notice before any data collection
- No personal data stored
- Client-side processing only
- Immediate data deletion
- Anonymous usage analytics only

**Data Lifecycle:**
1. User uploads → stored in memory only
2. Processing → happens in browser
3. Results generated → displayed immediately
4. Data deleted → automatic cleanup on:
   - Analysis completion
   - Page navigation
   - Browser close
   - "Analyze Again" action

## Known Issues & Solutions

### Tailwind CSS v4 Migration
If you see PostCSS errors:
1. Ensure `@tailwindcss/postcss` is installed
2. Use `@import "tailwindcss"` in CSS (not `@tailwind`)
3. Check `postcss.config.js` has correct plugin

### Type Errors
- All types defined in `src/types/`
- Use strict TypeScript mode
- Import from `'../types'` for convenience

## Testing the App

1. Start dev server: `npm run dev`
2. Visit http://localhost:5173/
3. Accept privacy modal
4. Upload 1-3 images OR paste text
5. Click "Analyze My Patterns"
6. View mock results
7. Test "Analyze Again" and "Download Results"

## Next Steps for Backend Developer

1. Implement Tesseract.js OCR in `src/workers/ocr.worker.ts`
2. Create pattern matching in `src/utils/patternMatching.ts`
3. Build analysis engine in `src/utils/analysisEngine.ts`
4. Replace mock data call in `src/pages/UploadPage.tsx`
5. Test with real data
6. Optimize for < 30 second processing time

## Future Enhancements

Post-MVP features:
- Instagram/Facebook analysis
- Relationship dynamics analysis
- Temporal tracking (growth over time)
- API for coaches
- Native mobile apps
- More Enneagram types initially (start with 3)
