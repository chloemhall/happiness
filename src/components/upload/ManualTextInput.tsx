import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Platform } from '../../types';
import { Button } from '../common/Button';

export function ManualTextInput() {
  const { state, dispatch } = useAppContext();
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState<Platform>('LinkedIn');
  const [showInput, setShowInput] = useState(false);

  const handleAdd = () => {
    if (text.trim().length === 0) return;

    dispatch({
      type: 'ADD_MANUAL_INPUT',
      payload: { text: text.trim(), platform },
    });

    setText('');
    setShowInput(false);
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_MANUAL_INPUT', payload: index });
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Manual Text Input
        </h3>
        {!showInput && (
          <Button
            onClick={() => setShowInput(true)}
            variant="outline"
            size="sm"
          >
            + Add Text
          </Button>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Prefer to paste text directly? Add your LinkedIn or Twitter posts here.
      </p>

      {showInput && (
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 space-y-4">
          {/* Platform Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="LinkedIn"
                  checked={platform === 'LinkedIn'}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">LinkedIn</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="Twitter"
                  checked={platform === 'Twitter'}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">Twitter</span>
              </label>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your post text here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {text.length} characters
              </p>
              <p className="text-xs text-gray-500">
                ~{Math.ceil(text.split(/\s+/).filter(w => w).length)} words
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleAdd}
              variant="primary"
              size="sm"
              disabled={text.trim().length === 0}
            >
              Add Post
            </Button>
            <Button
              onClick={() => {
                setShowInput(false);
                setText('');
              }}
              variant="ghost"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Added Inputs List */}
      {state.manualInputs.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Added Posts ({state.manualInputs.length})
          </h4>
          {state.manualInputs.map((input, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {input.platform}
                  </span>
                  <span className="text-xs text-gray-500">
                    ~{Math.ceil(input.text.split(/\s+/).filter(w => w).length)} words
                  </span>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Remove"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {input.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
