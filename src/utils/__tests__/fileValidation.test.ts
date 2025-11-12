import { describe, it, expect } from 'vitest';
import { validateFile, validateFileCount } from '../fileValidation';

describe('fileValidation', () => {
  describe('validateFile', () => {
    it('should accept valid PNG file', () => {
      const file = new File(['content'], 'test.png', { type: 'image/png' });
      const result = validateFile(file);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept valid JPEG file', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const result = validateFile(file);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject invalid file type (PDF)', () => {
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const result = validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid file type');
      expect(result.error).toContain('PNG or JPEG');
    });

    it('should reject invalid file type (TXT)', () => {
      const file = new File(['content'], 'notes.txt', { type: 'text/plain' });
      const result = validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('should reject file exceeding size limit', () => {
      // Create a file larger than MAX_FILE_SIZE (5MB)
      const largeContent = new Array(6 * 1024 * 1024).join('a'); // 6MB
      const file = new File([largeContent], 'large.png', { type: 'image/png' });

      const result = validateFile(file);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('size exceeds');
      expect(result.error).toContain('MB limit');
    });

    it('should accept file at exact size limit', () => {
      // Create a file exactly at MAX_FILE_SIZE (5MB)
      const content = new Array(5 * 1024 * 1024).join('a');
      const file = new File([content], 'exact.png', { type: 'image/png' });

      const result = validateFile(file);

      expect(result.isValid).toBe(true);
    });

    it('should return descriptive error messages', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const result = validateFile(file);

      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe('string');
      expect(result.error!.length).toBeGreaterThan(0);
    });
  });

  describe('validateFileCount', () => {
    const maxFiles = 3;

    it('should allow upload when under max limit', () => {
      const result = validateFileCount(1, 1, maxFiles);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should allow upload when exactly at max limit', () => {
      const result = validateFileCount(2, 1, maxFiles);

      expect(result.isValid).toBe(true);
    });

    it('should reject when exceeding max files', () => {
      const result = validateFileCount(2, 2, maxFiles);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Maximum 3 files');
      expect(result.error).toContain('4 files');
    });

    it('should calculate total count correctly', () => {
      const result = validateFileCount(2, 3, maxFiles);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('5 files');
    });

    it('should handle edge case with 0 current files', () => {
      const result = validateFileCount(0, 2, maxFiles);

      expect(result.isValid).toBe(true);
    });

    it('should handle edge case with 0 new files', () => {
      const result = validateFileCount(2, 0, maxFiles);

      expect(result.isValid).toBe(true);
    });

    it('should reject when new files alone exceed limit', () => {
      const result = validateFileCount(0, 4, maxFiles);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('4 files');
    });

    it('should provide clear error message with counts', () => {
      const result = validateFileCount(2, 2, maxFiles);

      expect(result.error).toContain('Maximum');
      expect(result.error).toContain('3');
      expect(result.error).toContain('4');
    });
  });
});
