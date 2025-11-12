# Testing Guide

This directory contains test utilities, helpers, and documentation for the HappinessGPT test suite.

## Directory Structure

```
src/test/
├── setup.ts                 # Global test setup and configuration
├── helpers/                 # Test helper functions
│   └── renderWithContext.tsx  # Custom render with providers
├── mocks/                   # Mock data and utilities
│   └── mockFiles.ts         # File upload mocks
└── README.md               # This file
```

## Running Tests

```bash
# Run all tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- fileValidation.test

# Run tests matching a pattern
npm test -- Button
```

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test with User Interaction

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('should handle clicks', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Test with Context

```typescript
import { describe, it, expect } from 'vitest';
import { renderWithContext, screen } from '../test/helpers/renderWithContext';
import { MyPage } from '../MyPage';

describe('MyPage Integration', () => {
  it('should work with app context', () => {
    const initialState = { user: { name: 'Test' } };

    renderWithContext(<MyPage />, { initialState });

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Test Helpers

### `renderWithContext`

Use this helper when testing components that need:
- AppContext (application state)
- React Router (navigation)

```typescript
import { renderWithContext } from '../test/helpers/renderWithContext';

renderWithContext(<MyComponent />, {
  initialState: { /* custom state */ },
  route: '/specific-route'
});
```

### Mock Files

Use mock file helpers for upload testing:

```typescript
import { createMockPNG, createMockFileList } from '../test/mocks/mockFiles';

const file = createMockPNG('test.png');
const fileList = createMockFileList([file]);
```

## Best Practices

### DO:
- ✅ Test user behavior, not implementation details
- ✅ Use descriptive test names: "should [expected] when [condition]"
- ✅ Follow Arrange-Act-Assert pattern
- ✅ Test error states and edge cases
- ✅ Use `screen.getByRole` for better accessibility testing

### DON'T:
- ❌ Test internal component state directly
- ❌ Use `container.querySelector` (use `screen.getByRole` instead)
- ❌ Test CSS classes for visual behavior
- ❌ Write tests that depend on other tests
- ❌ Ignore test failures

## Coverage Thresholds

The project maintains these coverage thresholds:
- **Lines:** 80%
- **Functions:** 80%
- **Branches:** 80%
- **Statements:** 80%

Critical paths should aim for 90%+ coverage.

## Debugging Tests

### Run specific test in debug mode
```bash
npm test -- --reporter=verbose MyTest
```

### Use test UI for visual debugging
```bash
npm run test:ui
```

### Add debug output in tests
```typescript
import { screen, debug } from '@testing-library/react';

// Print entire document
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));
```

## Common Patterns

### Testing Async Operations
```typescript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### Testing Form Submission
```typescript
const user = userEvent.setup();
await user.type(screen.getByLabelText('Email'), 'test@example.com');
await user.click(screen.getByRole('button', { name: 'Submit' }));
```

### Mocking Functions
```typescript
import { vi } from 'vitest';

const mockFn = vi.fn();
expect(mockFn).toHaveBeenCalledWith('expected-arg');
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event Documentation](https://testing-library.com/docs/user-event/intro)
