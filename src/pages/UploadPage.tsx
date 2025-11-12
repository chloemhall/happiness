import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { DragDropZone } from '../components/upload/DragDropZone';
import { FilePreview } from '../components/upload/FilePreview';
import { ManualTextInput } from '../components/upload/ManualTextInput';
import { Button } from '../components/common/Button';
import { MIN_FILES } from '../types';
import { mockAnalysisResult } from '../utils/mockData';

export function UploadPage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const totalInputs = state.uploadedFiles.length + state.manualInputs.length;
  const canAnalyze = totalInputs >= MIN_FILES;

  const handleAnalyze = () => {
    // TODO: Implement actual analysis
    // For now, use mock data
    dispatch({ type: 'START_PROCESSING' });

    // Simulate processing
    setTimeout(() => {
      dispatch({ type: 'UPDATE_PROGRESS', payload: 30 });
    }, 500);

    setTimeout(() => {
      dispatch({ type: 'UPDATE_PROGRESS', payload: 60 });
    }, 1000);

    setTimeout(() => {
      dispatch({ type: 'UPDATE_PROGRESS', payload: 90 });
    }, 1500);

    setTimeout(() => {
      dispatch({ type: 'PROCESSING_COMPLETE', payload: mockAnalysisResult });
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Enneagram Patterns
          </h1>
          <p className="text-lg text-gray-600">
            Privacy-first AI analysis of your social media communication
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Upload Your Content</h2>
            <p className="text-gray-600 mb-6">
              Upload 5-10 screenshots from LinkedIn or Twitter, or paste text directly.
              All processing happens in your browser - your data never leaves your device.
            </p>

            {/* Privacy Badge */}
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-6">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-green-800 font-medium">
                Client-side processing only • No data uploaded • Instant deletion after analysis
              </p>
            </div>
          </div>

          {/* Upload Components */}
          <DragDropZone />
          <FilePreview />
          <ManualTextInput />

          {/* Progress Indicator */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Content Added
              </span>
              <span className="text-sm text-gray-600">
                {totalInputs} / {MIN_FILES} minimum
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  canAnalyze ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, (totalInputs / MIN_FILES) * 100)}%` }}
              />
            </div>
            {!canAnalyze && (
              <p className="mt-2 text-xs text-gray-500">
                Add at least {MIN_FILES - totalInputs} more item(s) to begin analysis
              </p>
            )}
          </div>

          {/* Analyze Button */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {canAnalyze ? 'Analyze My Communication Patterns' : `Add ${MIN_FILES - totalInputs} More to Continue`}
            </Button>

            {canAnalyze && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                Analysis takes about 30 seconds • All data will be deleted after completion
              </p>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            New to Enneagram?{' '}
            <a
              href="https://www.enneagraminstitute.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Learn about the 9 types
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
