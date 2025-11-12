# LinkedIn Text Extraction Guide

This guide explains how to extract text from LinkedIn profile screenshots using Tesseract OCR.

## Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Verify Tesseract Installation

Check that tesseract is installed and accessible:

```bash
tesseract --version
```

If not installed, install via Homebrew (macOS):
```bash
brew install tesseract
```

## Usage

### Basic Workflow

1. **Add Screenshots**
   - Place your LinkedIn profile screenshots in the `screenshots/` folder
   - Supported formats: PNG, JPG, JPEG, BMP, TIFF

2. **Run the Extractor**
   ```bash
   python extract_text.py
   ```

3. **Check the Output**
   - Individual text files: `extracted_text/[filename]_extracted.txt`
   - Combined file: `extracted_text/combined_extracted_[timestamp].txt`
   - Statistics: `extracted_text/extraction_stats.txt`

## What the Script Does

1. Scans the `screenshots/` directory for images
2. Processes each image with Tesseract OCR
3. Extracts all visible text
4. Saves results in two ways:
   - **Individual files**: One `.txt` file per screenshot
   - **Combined file**: All extracted text in one file with source labels
5. Generates statistics (word counts per file)

## Output Structure

```
extracted_text/
├── screenshot1_extracted.txt
├── screenshot2_extracted.txt
├── combined_extracted_20250112_143022.txt
└── extraction_stats.txt
```

## Next Steps: Keyword Analysis

The extracted text files are ready for keyword analysis. You can:

1. Define your keyword lists (e.g., Type 3, Type 4, Type 7 patterns)
2. Build a keyword matching algorithm to analyze the text
3. Score and identify patterns based on frequency

Example keywords from PHASE1_TODO.md:
- **Type 3 (Achiever)**: "achieve", "success", "goal", "efficient"
- **Type 4 (Individualist)**: "feel", "unique", "authentic", "identity"
- **Type 7 (Enthusiast)**: "exciting", "new", "opportunity", "fun"

## Tips for Better Extraction

- Use high-resolution screenshots
- Ensure text is clear and not blurry
- Avoid screenshots with heavy overlays or graphics
- LinkedIn profile pages with clear text work best

## Troubleshooting

**No text extracted?**
- Check image quality
- Verify tesseract is installed: `tesseract --version`
- Try with a different screenshot

**Poor quality extraction?**
- Increase screenshot resolution
- Ensure good contrast between text and background
- Remove any filters or effects from screenshots
