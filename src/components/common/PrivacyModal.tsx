import { useAppContext } from '../../context/AppContext';
import { Button } from './Button';

export function PrivacyModal() {
  const { dispatch } = useAppContext();

  const handleAccept = () => {
    dispatch({ type: 'ACCEPT_PRIVACY' });
  };

  const handleDecline = () => {
    // Could redirect to an info page or close the app
    window.location.href = 'https://www.enneagraminstitute.com/';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-green-600"
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
            <h2 className="ml-4 text-3xl font-bold text-gray-900">
              Privacy First
            </h2>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-700">
              Your privacy is our top priority. Here's how we protect your data:
            </p>

            <div className="bg-green-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">No Server Upload</h4>
                  <p className="text-sm text-gray-600">
                    All image processing happens directly in your browser. Your screenshots never touch our servers.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">Instant Deletion</h4>
                  <p className="text-sm text-gray-600">
                    Screenshots and extracted text are automatically deleted from memory immediately after analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">No Tracking</h4>
                  <p className="text-sm text-gray-600">
                    We collect anonymous usage metrics only (button clicks, time). Never your content or results.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">No Account Required</h4>
                  <p className="text-sm text-gray-600">
                    No registration, no login, no stored data. Completely anonymous.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">GDPR & CCPA Compliant</h4>
              <p className="text-sm text-gray-600">
                We meet the highest privacy standards. Your analysis happens entirely on your device.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleAccept}
              variant="primary"
              size="lg"
              className="flex-1"
            >
              I Understand - Continue
            </Button>
            <Button
              onClick={handleDecline}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
