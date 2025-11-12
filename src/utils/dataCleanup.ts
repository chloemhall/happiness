import { UploadedFile } from '../types';

/**
 * Clean up object URLs to prevent memory leaks
 */
export function cleanupFilePreview(file: UploadedFile): void {
  if (file.preview && file.preview.startsWith('blob:')) {
    URL.revokeObjectURL(file.preview);
  }
}

/**
 * Clean up all file previews
 */
export function cleanupAllFilePreviews(files: UploadedFile[]): void {
  files.forEach(cleanupFilePreview);
}

/**
 * Clear extracted text data from memory
 */
export function clearTextData(data: string[]): void {
  // Overwrite strings in memory (best effort)
  data.forEach((_, index) => {
    data[index] = '';
  });
  data.length = 0;
}

/**
 * Clear analysis results from memory
 */
export function clearAnalysisData(data: any): void {
  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach(key => {
      delete data[key];
    });
  }
}

/**
 * Complete cleanup after analysis
 */
export function performFullCleanup(files: UploadedFile[], extractedTexts: string[]): void {
  // Clean up file previews
  cleanupAllFilePreviews(files);

  // Clear text data
  clearTextData(extractedTexts);

  // Clear session storage if any
  sessionStorage.removeItem('happinessgpt-analysis');
  sessionStorage.removeItem('happinessgpt-texts');

  // Log cleanup for debugging (only in development)
  if (import.meta.env.DEV) {
    console.log('[Privacy] All data cleaned up from memory');
  }
}
