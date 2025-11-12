import { useCallback, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { validateFile, validateFileCount } from '../../utils/fileValidation';
import { MAX_FILES } from '../../types';

export function DragDropZone() {
  const { state, dispatch } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setError(null);

    // Validate file count
    const countValidation = validateFileCount(
      state.uploadedFiles.length,
      fileArray.length,
      MAX_FILES
    );
    if (!countValidation.isValid) {
      setError(countValidation.error || 'Too many files');
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (const file of fileArray) {
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid file');
        return;
      }
      validFiles.push(file);
    }

    // Add valid files
    dispatch({ type: 'ADD_FILES', payload: validFiles });
  }, [state.uploadedFiles.length, dispatch]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ''; // Reset input
  }, [handleFiles]);

  const remainingSlots = MAX_FILES - state.uploadedFiles.length;

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
          ${remainingSlots === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          accept="image/png,image/jpeg,image/jpg"
          multiple
          onChange={handleFileInput}
          disabled={remainingSlots === 0}
        />

        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center ${remainingSlots === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <svg
            className={`w-16 h-16 mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <p className="text-xl font-semibold text-gray-900 mb-2">
            {isDragging ? 'Drop your images here' : 'Drop images here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse
          </p>

          <div className="text-xs text-gray-400">
            {remainingSlots} of {MAX_FILES} slots available
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
