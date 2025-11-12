import { AnalysisResult } from './analysis.types';
import { UploadedFile, ManualTextInput } from './upload.types';

// App State
export type AppPhase = 'privacy' | 'upload' | 'processing' | 'results' | 'error';

export interface AppState {
  phase: AppPhase;
  privacyAccepted: boolean;
  uploadedFiles: UploadedFile[];
  manualInputs: ManualTextInput[];
  analysisResult: AnalysisResult | null;
  error: string | null;
  processingProgress: number; // 0-100
}

// App Actions
export type AppAction =
  | { type: 'ACCEPT_PRIVACY' }
  | { type: 'DECLINE_PRIVACY' }
  | { type: 'ADD_FILES'; payload: File[] }
  | { type: 'REMOVE_FILE'; payload: string }
  | { type: 'REORDER_FILES'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'UPDATE_FILE_STATUS'; payload: { id: string; status: UploadedFile['status']; extractedText?: string; error?: string } }
  | { type: 'ADD_MANUAL_INPUT'; payload: ManualTextInput }
  | { type: 'UPDATE_MANUAL_INPUT'; payload: { index: number; text: string } }
  | { type: 'REMOVE_MANUAL_INPUT'; payload: number }
  | { type: 'START_PROCESSING' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'PROCESSING_COMPLETE'; payload: AnalysisResult }
  | { type: 'PROCESSING_ERROR'; payload: string }
  | { type: 'RESET' };

// Context Type
export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}
