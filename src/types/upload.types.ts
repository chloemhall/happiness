// Upload Types
export interface UploadedFile {
  id: string;
  file: File;
  preview: string; // Base64 or Object URL
  status: 'pending' | 'processing' | 'completed' | 'error';
  extractedText?: string;
  error?: string;
}

export type Platform = 'LinkedIn' | 'Twitter';

export interface ManualTextInput {
  text: string;
  platform: Platform;
}

export interface UploadState {
  files: UploadedFile[];
  manualInputs: ManualTextInput[];
  maxFiles: number;
  acceptedFileTypes: string[];
}

// File Validation
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILES = 3;
export const MIN_FILES = 1;
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
