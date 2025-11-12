import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DragDropZone } from '../components/upload/DragDropZone';
import { FilePreview } from '../components/upload/FilePreview';
import { ManualTextInput } from '../components/upload/ManualTextInput';
import { Button } from '../components/common/Button';
import { MIN_FILES, MAX_FILES } from '../types';
import { mockAnalysisResult } from '../utils/mockData';

export function UploadPage() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [showManualInput, setShowManualInput] = useState(false);

  const totalInputs = state.uploadedFiles.length + state.manualInputs.length;
  const canAnalyze = totalInputs >= MIN_FILES;

  const handleAnalyze = () => {
    dispatch({ type: 'START_PROCESSING' });

    // Simulate processing
    setTimeout(() => dispatch({ type: 'UPDATE_PROGRESS', payload: 30 }), 500);
    setTimeout(() => dispatch({ type: 'UPDATE_PROGRESS', payload: 60 }), 1000);
    setTimeout(() => dispatch({ type: 'UPDATE_PROGRESS', payload: 90 }), 1500);
    setTimeout(() => {
      dispatch({ type: 'PROCESSING_COMPLETE', payload: mockAnalysisResult });
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Discover Your Enneagram Type
          </h1>
          <p className="text-lg text-gray-600">
            Upload up to 3 items from LinkedIn or Twitter
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

          {/* Upload Area */}
          <div>
            <DragDropZone />
          </div>

          {/* File Preview */}
          {state.uploadedFiles.length > 0 && <FilePreview />}

          {/* Manual Input Toggle */}
          {!showManualInput && state.uploadedFiles.length === 0 && (
            <div className="text-center pt-4">
              <button
                onClick={() => setShowManualInput(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Or paste text manually →
              </button>
            </div>
          )}

          {/* Manual Input Section */}
          {showManualInput && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Paste Your Posts
                </h3>
                <button
                  onClick={() => setShowManualInput(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <ManualTextInput />
            </div>
          )}

          {/* Progress */}
          {totalInputs > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {totalInputs} of {MAX_FILES} items added
                </span>
                {canAnalyze && (
                  <span className="text-sm text-green-600 font-medium">
                    ✓ Ready to analyze
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    canAnalyze ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalInputs / MAX_FILES) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <div className="pt-4">
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze}
              variant="primary"
              size="lg"
              className="w-full"
            >
              ✨ Analyze My Patterns
            </Button>
            {!canAnalyze && (
              <p className="mt-3 text-sm text-gray-500 text-center">
                Add at least 1 item to get started
              </p>
            )}
          </div>
        </div>

        {/* Footer Help Text */}
        {totalInputs === 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              New to Enneagram?{' '}
              <a
                href="https://www.enneagraminstitute.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Learn more
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
