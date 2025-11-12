import { useAppContext } from '../../context/AppContext';
import { Button } from './Button';

export function PrivacyModal() {
  const { dispatch } = useAppContext();

  const handleAccept = () => {
    dispatch({ type: 'ACCEPT_PRIVACY' });
  };

  const handleDecline = () => {
    window.location.href = 'https://www.enneagraminstitute.com/';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Your Privacy Matters
          </h2>

          <p className="text-gray-700 text-center mb-6">
            All analysis happens directly in your browser. Your data never leaves your device and is automatically deleted after analysis.
          </p>

          <div className="bg-green-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex items-center text-sm text-green-800">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No server uploads</span>
            </div>
            <div className="flex items-center text-sm text-green-800">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant deletion after analysis</span>
            </div>
            <div className="flex items-center text-sm text-green-800">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No account needed</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleAccept}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue
            </Button>
            <button
              onClick={handleDecline}
              className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
