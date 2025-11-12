# Privacy-First Analysis Workflow

This document explains how the privacy-first analysis system automatically deletes sensitive data after processing.

## Overview

The `analyze_profile.py` script implements a privacy-first workflow that:

1. ✅ Extracts text from screenshots
2. 🗑️ **DELETES screenshots immediately**
3. ✅ Analyzes text for Enneagram patterns
4. 🗑️ **DELETES extracted text** (optional)
5. ✅ Keeps only the analysis results

## Quick Start

### Privacy Mode (Default - Deletes Everything)

```bash
python3 analyze_profile.py
```

This will:
- Extract text from screenshots in `screenshots/`
- **Delete all screenshots**
- Analyze the text
- **Delete all extracted text**
- Keep only the analysis report in `analysis_results/`

### Keep Extracted Text (Optional)

If you need to keep the extracted text for debugging:

```bash
python3 analyze_profile.py --keep-text
```

This will delete screenshots but keep the extracted text files.

## Workflow Steps

### Step 1: Extract Text
- Reads all images from `screenshots/` directory
- Uses Tesseract OCR to extract text
- Saves to `extracted_text/` directory

### Step 2: Delete Screenshots 🗑️
- Automatically deletes all screenshot files
- **Cannot be undone** - screenshots are permanently removed
- Protects user privacy by removing source images

### Step 3: Analyze Patterns
- Analyzes extracted text for Enneagram type keywords
- Generates detailed report with supporting quotes
- Saves to `analysis_results/enneagram_analysis_[timestamp].txt`

### Step 4: Delete Extracted Text 🗑️ (Optional)
- By default, deletes all extracted text files
- Only the analysis report remains
- Use `--keep-text` flag to preserve extracted text

## What Gets Kept

After analysis with default privacy mode:

```
analysis_results/
└── enneagram_analysis_20251112_143022.txt  ✅ KEPT
```

Everything else is deleted:
- `screenshots/*.png` ❌ DELETED
- `extracted_text/*.txt` ❌ DELETED

## Privacy Considerations

### Why Delete Screenshots?
- Screenshots may contain sensitive personal information
- Profile pictures, names, and personal posts should not be stored
- Aligns with privacy-first architecture from PHASE1_TODO.md

### Why Delete Extracted Text?
- Even text-only data can be identifying
- Analysis results contain only patterns and keywords, not full content
- Minimizes data retention

### What About the Analysis Report?
The analysis report contains:
- ✅ Keyword frequency counts
- ✅ Category breakdowns
- ✅ Sample quotes (limited context)
- ❌ NO full profile text
- ❌ NO screenshots
- ❌ NO personally identifying images

## Manual Cleanup (If Needed)

If you've already run the old scripts and want to clean up:

```bash
# Delete all screenshots
rm screenshots/*

# Delete all extracted text
rm extracted_text/*

# Keep only analysis results
ls analysis_results/
```

## Command Line Options

```bash
# Default: Delete everything except analysis
python3 analyze_profile.py

# Keep extracted text
python3 analyze_profile.py --keep-text

# Use custom screenshots directory
python3 analyze_profile.py --screenshots-dir /path/to/screenshots
```

## Comparison: Old vs New Workflow

### Old Workflow (Manual)
```bash
python3 extract_text.py       # Creates extracted_text/
python3 analyze_keywords.py   # Creates analysis_results/
# Screenshots and text remain on disk ⚠️
```

### New Workflow (Privacy-First)
```bash
python3 analyze_profile.py    # Automatically cleans up
# Only analysis results remain ✅
```

## Integration with Frontend

When your frontend developer integrates this:

1. User uploads screenshots (client-side, in-memory only)
2. Screenshots are processed immediately
3. **Screenshots deleted** before user sees results
4. Only analysis results are displayed
5. No data is sent to servers
6. No data is permanently stored

This aligns with the "privacy-first architecture" goal from your PHASE1_TODO.md.

## Testing

⚠️ **WARNING:** The privacy workflow deletes files permanently!

Before testing, make backup copies of any screenshots you want to keep:

```bash
# Backup screenshots
cp -r screenshots screenshots_backup

# Run analysis
python3 analyze_profile.py

# Restore if needed
cp -r screenshots_backup screenshots
```

## Next Steps

- [ ] Add memory cleanup for browser-based implementation
- [ ] Implement automatic data purging after set time period
- [ ] Add user confirmation before deletion (optional UX improvement)
- [ ] Browser storage clearing for client-side version
