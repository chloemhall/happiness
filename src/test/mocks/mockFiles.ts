/**
 * Mock file helpers for testing file upload functionality
 */

export function createMockFile(
  name: string,
  type: string,
  size?: number
): File {
  const content = size ? new Array(size).fill('a').join('') : 'mock content';
  return new File([content], name, { type });
}

export function createMockPNG(name = 'test.png', size?: number): File {
  return createMockFile(name, 'image/png', size);
}

export function createMockJPEG(name = 'test.jpg', size?: number): File {
  return createMockFile(name, 'image/jpeg', size);
}

export function createMockPDF(name = 'document.pdf'): File {
  return createMockFile(name, 'application/pdf');
}

export function createLargeFile(sizeMB: number, type = 'image/png'): File {
  const size = sizeMB * 1024 * 1024;
  return createMockFile('large.png', type, size);
}

export function createMockFileList(files: File[]): FileList {
  const fileList = {
    length: files.length,
    item: (index: number) => files[index] || null,
    [Symbol.iterator]: function* () {
      for (const file of files) {
        yield file;
      }
    },
  };

  Object.assign(fileList, files);
  return fileList as FileList;
}
