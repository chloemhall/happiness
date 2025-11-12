# HappinessGPT Test Plan - Phase 1

**Version:** 1.0
**Status:** Ready for Implementation
**Coverage Target:** 80%+ for critical paths

---

## Testing Strategy

### Test Pyramid Approach
- **70% Unit Tests** - Individual functions, utilities, and components
- **20% Integration Tests** - Component interactions, workflows
- **10% E2E Tests** - Complete user journeys (future phase)

### Testing Framework Stack
- **Vitest** - Fast unit test runner (Vite-native)
- **React Testing Library** - Component testing
- **jsdom** - DOM environment for tests
- **@testing-library/user-event** - User interaction simulation

---

## Test Categories

## 1. Utility Functions Tests

### File Validation (`fileValidation.ts`)

**Test Suite:** `fileValidation.test.ts`

#### Test Cases:
- ✅ `validateFile()`
  - Should accept valid PNG file
  - Should accept valid JPEG file
  - Should reject invalid file types (PDF, TXT, etc.)
  - Should reject files exceeding size limit (5MB)
  - Should return proper error messages for each failure

- ✅ `validateFileCount()`
  - Should allow upload when under max limit
  - Should reject when exceeding max files (3)
  - Should calculate total count correctly (current + new)
  - Should return proper error message with file counts

**Priority:** HIGH - Critical for user input safety

---

### Data Cleanup (`dataCleanup.ts`)

**Test Suite:** `dataCleanup.test.ts`

#### Test Cases:
- ✅ Should clear uploaded files from memory
- ✅ Should purge extracted text data
- ✅ Should clear analysis results
- ✅ Should handle cleanup errors gracefully
- ✅ Should verify complete data deletion (no residuals)

**Priority:** HIGH - Privacy-first requirement

---

## 2. Component Tests

### Button Component (`Button.tsx`)

**Test Suite:** `Button.test.tsx`

#### Test Cases:
- ✅ Should render with default props (primary, md)
- ✅ Should render all variants (primary, secondary, outline, ghost)
- ✅ Should render all sizes (sm, md, lg)
- ✅ Should apply custom className
- ✅ Should handle onClick events
- ✅ Should be disabled when disabled prop is true
- ✅ Should show proper focus styles on keyboard navigation

**Priority:** MEDIUM - Reusable component

---

### Card Component (`Card.tsx`)

**Test Suite:** `Card.test.tsx`

#### Test Cases:
- ✅ Should render children content
- ✅ Should apply custom className
- ✅ Should render with proper semantic HTML

**Priority:** LOW - Simple presentational component

---

### LoadingSpinner Component (`LoadingSpinner.tsx`)

**Test Suite:** `LoadingSpinner.test.tsx`

#### Test Cases:
- ✅ Should render spinner animation
- ✅ Should display optional loading text
- ✅ Should have accessibility attributes (aria-label)

**Priority:** MEDIUM - User feedback component

---

### ErrorBoundary Component (`ErrorBoundary.tsx`)

**Test Suite:** `ErrorBoundary.test.tsx`

#### Test Cases:
- ✅ Should render children when no error
- ✅ Should catch errors and display fallback UI
- ✅ Should log errors to console
- ✅ Should allow error recovery if provided
- ✅ Should display error message to user

**Priority:** HIGH - Application stability

---

## 3. Page Component Tests

### UploadPage (`UploadPage.tsx`)

**Test Suite:** `UploadPage.test.tsx`

#### Test Cases:
- ✅ Should render upload interface
- ✅ Should display privacy policy before upload
- ✅ Should show drag-and-drop zone
- ✅ Should accept file drops
- ✅ Should validate files on upload (5MB max)
- ✅ Should display thumbnail previews
- ✅ Should allow file removal
- ✅ Should allow file reordering
- ✅ Should show manual text input option
- ✅ Should toggle between screenshot/text input modes
- ✅ Should validate max file count (3)
- ✅ Should show error messages for invalid uploads
- ✅ Should enable analyze button with minimum 1 item

**Priority:** HIGH - Core user interaction

---

### ResultsPage (`ResultsPage.tsx`)

**Test Suite:** `ResultsPage.test.tsx`

#### Test Cases:
- ✅ Should render analysis results
- ✅ Should display 5 behavioral dimensions
- ✅ Should show Enneagram type with confidence score
- ✅ Should display supporting evidence quotes
- ✅ Should show growth recommendations
- ✅ Should render platform statistics
- ✅ Should handle missing optional data gracefully
- ✅ Should provide "Analyze Again" action
- ✅ Should trigger data cleanup on reset

**Priority:** HIGH - Core results display

---

## 4. Context Tests

### AppContext (`AppContext.tsx`)

**Test Suite:** `AppContext.test.tsx`

#### Test Cases:
- ✅ Should provide initial state
- ✅ Should update uploaded files state
- ✅ Should update analysis results state
- ✅ Should handle loading states
- ✅ Should handle error states
- ✅ Should reset application state
- ✅ Should maintain state across re-renders

**Priority:** HIGH - State management foundation

---

## 5. Integration Tests

### Upload Flow Integration

**Test Suite:** `uploadFlow.integration.test.tsx`

#### Test Cases:
- ✅ Complete flow: Select files → Preview → Validate → Process
- ✅ Should handle validation errors in flow
- ✅ Should transition between upload states
- ✅ Should integrate with AppContext state updates

**Priority:** HIGH - Critical user path

---

### Analysis Flow Integration

**Test Suite:** `analysisFlow.integration.test.tsx`

#### Test Cases:
- ✅ Complete flow: Upload → Process → Display Results
- ✅ Should show loading state during processing
- ✅ Should display results correctly
- ✅ Should handle analysis errors
- ✅ Should cleanup data after completion

**Priority:** HIGH - Critical user path

---

## 6. Type Safety Tests

### Type Definitions (`*.types.ts`)

**Test Suite:** `types.test.ts`

#### Test Cases:
- ✅ Should enforce EnneagramType range (1-9)
- ✅ Should validate Wing combinations
- ✅ Should enforce confidence score range (0-100)
- ✅ Should validate BehavioralDimension structure
- ✅ Should validate AnalysisResult completeness

**Priority:** MEDIUM - Type safety validation

---

## 7. Future Test Categories (Phase 2+)

### Pattern Matching Tests
- Type 3 (Achiever) keyword detection
- Type 4 (Individualist) keyword detection
- Type 7 (Enthusiast) keyword detection
- Frequency scoring accuracy
- Confidence calculation

### OCR Tests
- Tesseract.js integration
- Text extraction accuracy
- Multi-image batch processing
- Worker thread communication

### Web Worker Tests
- Message passing
- Isolated processing
- Error handling in workers

---

## Test Execution Plan

### Development Workflow
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- fileValidation.test
```

### CI/CD Integration
- All tests must pass before merge
- Coverage reports generated on each PR
- Failing tests block deployment

---

## Coverage Requirements

### Critical Paths (90%+ coverage required)
- File validation
- Data cleanup
- Upload flow
- Results display
- Error handling

### Important Features (80%+ coverage required)
- Component rendering
- State management
- Integration points

### Nice-to-have (70%+ coverage)
- Utility functions
- UI components

---

## Test Data Strategy

### Mock Data
- Create `mockData.ts` with sample:
  - Valid/invalid files (max 3 items, 5MB each)
  - Sample analysis results
  - Sample behavioral dimensions
  - Sample Enneagram types

### Test Fixtures
- Sample images for upload testing (under 5MB)
- Sample text extracts (1-3 items)
- Sample error scenarios

---

## Testing Best Practices

### DO:
- ✅ Test user behavior, not implementation details
- ✅ Use descriptive test names: "should [expected behavior] when [condition]"
- ✅ Arrange-Act-Assert pattern
- ✅ Test error states and edge cases
- ✅ Mock external dependencies (API calls, workers)
- ✅ Test accessibility (screen readers, keyboard navigation)

### DON'T:
- ❌ Test internal component state directly
- ❌ Test CSS styles (use visual regression tools instead)
- ❌ Over-mock (keep tests close to real usage)
- ❌ Write brittle tests that break with refactoring
- ❌ Ignore test failures or flaky tests

---

## Phase 1 Test Priorities (Week-by-Week)

### Week 1: Foundation Testing
- [ ] Set up testing framework
- [ ] File validation tests
- [ ] Button component tests
- [ ] Basic render tests for pages

### Week 2: Core Feature Testing
- [ ] Upload flow integration tests
- [ ] Data cleanup tests
- [ ] Error boundary tests
- [ ] Context tests

### Week 3: Complete Coverage
- [ ] Results page tests
- [ ] Full integration tests
- [ ] Edge case coverage
- [ ] Documentation of test gaps

---

## Success Metrics

### Quantitative
- ✅ 80%+ overall code coverage
- ✅ 90%+ coverage for critical paths
- ✅ All tests pass in < 30 seconds
- ✅ Zero flaky tests

### Qualitative
- ✅ Tests document expected behavior
- ✅ Tests catch regressions
- ✅ Easy to add new tests
- ✅ Team confident in test suite

---

## Test Maintenance

### Regular Tasks
- Update tests when requirements change
- Refactor tests when code refactors
- Remove obsolete tests
- Monitor test execution time
- Review coverage reports weekly

### Warning Signs
- ⚠️ Tests taking too long (>1 min)
- ⚠️ Coverage dropping below 80%
- ⚠️ Flaky tests appearing
- ⚠️ Tests not catching bugs

---

## Resources

### Documentation
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Team Guidelines
- Review test PRs for quality
- Pair on complex test scenarios
- Share testing patterns in team docs
