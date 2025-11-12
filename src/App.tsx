import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { UploadPage } from './pages/UploadPage';
import { ResultsPage } from './pages/ResultsPage';
import { PrivacyModal } from './components/common/PrivacyModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ProgressBar } from './components/common/LoadingSpinner';

function AppRoutes() {
  const { state } = useAppContext();

  // Show privacy modal first if not accepted
  if (!state.privacyAccepted && state.phase === 'privacy') {
    return <PrivacyModal />;
  }

  // Show processing overlay
  if (state.phase === 'processing') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Analyzing Your Patterns
          </h2>
          <ProgressBar
            progress={state.processingProgress}
            message="Processing your communication data"
          />
          <p className="mt-4 text-sm text-gray-600 text-center">
            This may take up to 30 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
