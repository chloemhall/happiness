import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, AppContextType, UploadedFile } from '../types';

// Initial State
const initialState: AppState = {
  phase: 'privacy',
  privacyAccepted: false,
  uploadedFiles: [],
  manualInputs: [],
  analysisResult: null,
  error: null,
  processingProgress: 0,
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ACCEPT_PRIVACY':
      return {
        ...state,
        privacyAccepted: true,
        phase: 'upload',
      };

    case 'DECLINE_PRIVACY':
      return {
        ...initialState,
        phase: 'privacy',
      };

    case 'ADD_FILES':
      const newFiles: UploadedFile[] = action.payload.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        status: 'pending',
      }));
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...newFiles],
      };

    case 'REMOVE_FILE':
      const fileToRemove = state.uploadedFiles.find(f => f.id === action.payload);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(f => f.id !== action.payload),
      };

    case 'REORDER_FILES':
      const { fromIndex, toIndex } = action.payload;
      const files = [...state.uploadedFiles];
      const [movedFile] = files.splice(fromIndex, 1);
      files.splice(toIndex, 0, movedFile);
      return {
        ...state,
        uploadedFiles: files,
      };

    case 'UPDATE_FILE_STATUS':
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.map(file =>
          file.id === action.payload.id
            ? { ...file, status: action.payload.status, extractedText: action.payload.extractedText, error: action.payload.error }
            : file
        ),
      };

    case 'ADD_MANUAL_INPUT':
      return {
        ...state,
        manualInputs: [...state.manualInputs, action.payload],
      };

    case 'UPDATE_MANUAL_INPUT':
      return {
        ...state,
        manualInputs: state.manualInputs.map((input, index) =>
          index === action.payload.index
            ? { ...input, text: action.payload.text }
            : input
        ),
      };

    case 'REMOVE_MANUAL_INPUT':
      return {
        ...state,
        manualInputs: state.manualInputs.filter((_, index) => index !== action.payload),
      };

    case 'START_PROCESSING':
      return {
        ...state,
        phase: 'processing',
        processingProgress: 0,
        error: null,
      };

    case 'UPDATE_PROGRESS':
      return {
        ...state,
        processingProgress: action.payload,
      };

    case 'PROCESSING_COMPLETE':
      return {
        ...state,
        phase: 'results',
        analysisResult: action.payload,
        processingProgress: 100,
      };

    case 'PROCESSING_ERROR':
      return {
        ...state,
        phase: 'error',
        error: action.payload,
      };

    case 'RESET':
      // Clean up object URLs
      state.uploadedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      return {
        ...initialState,
        privacyAccepted: true, // Keep privacy accepted
        phase: 'upload',
      };

    default:
      return state;
  }
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
