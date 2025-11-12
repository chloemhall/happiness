import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BehavioralDimensions } from '../components/results/BehavioralDimensions';
import { TypeIdentification } from '../components/results/TypeIdentification';
import { GrowthRecommendations } from '../components/results/GrowthRecommendations';
import { Button } from '../components/common/Button';

export function ResultsPage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no analysis result
    if (!state.analysisResult) {
      navigate('/');
    }
  }, [state.analysisResult, navigate]);

  if (!state.analysisResult) {
    return null;
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    const data = JSON.stringify(state.analysisResult, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enneagram-analysis-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Enneagram Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Insights based on your communication patterns
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Analysis completed on {new Date(state.analysisResult.analysisDate).toLocaleDateString()}
          </p>
        </header>

        {/* Privacy Reminder */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-green-800">
              <span className="font-semibold">Privacy Protected:</span> Your uploaded content has been deleted from memory. Only these insights remain temporarily.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {/* Type Identification */}
          <TypeIdentification
            typeResult={state.analysisResult.typeIdentification}
            evidence={state.analysisResult.evidence}
          />

          {/* Behavioral Dimensions */}
          <BehavioralDimensions
            dimensions={state.analysisResult.behavioralDimensions}
          />

          {/* Growth Recommendations */}
          <GrowthRecommendations
            recommendations={state.analysisResult.growthRecommendations}
          />

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Next Steps
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleReset}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Analyze Again
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Download Results
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Results will be cleared when you close this page or analyze again
            </p>
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Learn More About Your Type
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.enneagraminstitute.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Enneagram Institute</h4>
                  <p className="text-sm text-gray-600">Official resources and theory</p>
                </div>
              </a>
              <a
                href={`https://www.enneagraminstitute.com/type-${state.analysisResult.typeIdentification.primaryType}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <div>
                  <h4 className="font-medium text-gray-900">Your Type Details</h4>
                  <p className="text-sm text-gray-600">Deep dive into Type {state.analysisResult.typeIdentification.primaryType}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
