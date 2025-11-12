import { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES, FileValidationResult } from '../types';

export function validateFile(file: File): FileValidationResult {
  // Check file type
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Please upload PNG or JPEG images only.`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    return {
      isValid: false,
      error: `File size exceeds ${sizeMB}MB limit.`,
    };
  }

  return { isValid: true };
}

export function validateFileCount(currentCount: number, newCount: number, maxFiles: number): FileValidationResult {
  const totalCount = currentCount + newCount;

  if (totalCount > maxFiles) {
    return {
      isValid: false,
      error: `Maximum ${maxFiles} files allowed. You're trying to upload ${totalCount} files.`,
    };
  }

  return { isValid: true };
}
