import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: any;
  route?: string;
}

/**
 * Custom render function that wraps components with necessary providers
 * Use this for integration tests that need context or routing
 */
export function renderWithContext(
  ui: ReactElement,
  { initialState, route = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  // Set initial route if provided
  if (route !== '/') {
    window.history.pushState({}, 'Test page', route);
  }

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        <AppProvider initialState={initialState}>
          {children}
        </AppProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { renderWithContext as render };
