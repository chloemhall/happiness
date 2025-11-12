import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Platform } from '../../types';
import { Button } from '../common/Button';

export function ManualTextInput() {
  const { state, dispatch } = useAppContext();
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState<Platform>('LinkedIn');

  const handleAdd = () => {
    if (text.trim().length === 0) return;

    dispatch({
      type: 'ADD_MANUAL_INPUT',
      payload: { text: text.trim(), platform },
    });

    setText('');
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_MANUAL_INPUT', payload: index });
  };

  return (
    <div className="space-y-4">
      {/* Input Area */}
      <div className="space-y-3">
        {/* Platform Selector */}
        <div className="flex gap-4 justify-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="LinkedIn"
              checked={platform === 'LinkedIn'}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">LinkedIn</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="Twitter"
              checked={platform === 'Twitter'}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="mr-2 h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Twitter</span>
          </label>
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Paste a ${platform} post here...`}
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        {/* Add Button */}
        <Button
          onClick={handleAdd}
          variant="outline"
          size="md"
          disabled={text.trim().length === 0}
          className="w-full"
        >
          Add Post
        </Button>
      </div>

      {/* Added Posts List */}
      {state.manualInputs.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Added ({state.manualInputs.length})
          </p>
          {state.manualInputs.map((input, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 group hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                    {input.platform}
                  </span>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {input.text}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="ml-3 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
