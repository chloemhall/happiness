import { useAppContext } from '../../context/AppContext';
import { UploadedFile } from '../../types';

export function FilePreview() {
  const { state, dispatch } = useAppContext();

  if (state.uploadedFiles.length === 0) {
    return null;
  }

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_FILE', payload: id });
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      dispatch({
        type: 'REORDER_FILES',
        payload: { fromIndex: index, toIndex: index - 1 },
      });
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < state.uploadedFiles.length - 1) {
      dispatch({
        type: 'REORDER_FILES',
        payload: { fromIndex: index, toIndex: index + 1 },
      });
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Uploaded Files ({state.uploadedFiles.length})
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state.uploadedFiles.map((file, index) => (
          <FilePreviewItem
            key={file.id}
            file={file}
            index={index}
            total={state.uploadedFiles.length}
            onRemove={() => handleRemove(file.id)}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface FilePreviewItemProps {
  file: UploadedFile;
  index: number;
  total: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

function FilePreviewItem({
  file,
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
}: FilePreviewItemProps) {
  return (
    <div className="relative group bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors">
      {/* Thumbnail */}
      <div className="aspect-square bg-gray-100 relative">
        <img
          src={file.preview}
          alt={file.file.name}
          className="w-full h-full object-cover"
        />

        {/* Status Overlay */}
        {file.status === 'processing' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-3 border-white border-t-transparent rounded-full" />
          </div>
        )}

        {file.status === 'error' && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-75 flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Order Badge */}
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {index + 1}
        </div>

        {/* Control Buttons */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-colors"
            title="Remove"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Reorder Buttons */}
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {index > 0 && (
            <button
              onClick={onMoveUp}
              className="bg-gray-700 hover:bg-gray-800 text-white p-1.5 rounded-full shadow-lg transition-colors"
              title="Move up"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {index < total - 1 && (
            <button
              onClick={onMoveDown}
              className="bg-gray-700 hover:bg-gray-800 text-white p-1.5 rounded-full shadow-lg transition-colors"
              title="Move down"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* File Name */}
      <div className="p-2">
        <p className="text-xs text-gray-600 truncate" title={file.file.name}>
          {file.file.name}
        </p>
        <p className="text-xs text-gray-400">
          {(file.file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
}
