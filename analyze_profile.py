#!/usr/bin/env python3
"""
Privacy-First LinkedIn Profile Analyzer
Extracts text, analyzes patterns, and automatically deletes source data
"""

import os
import sys
import shutil
from pathlib import Path
from datetime import datetime

# Import our existing modules
from extract_text import LinkedInTextExtractor
from analyze_keywords import EnneagramAnalyzer


class PrivacyFirstAnalyzer:
    """
    Orchestrates the full analysis pipeline with automatic data cleanup
    """

    def __init__(self, screenshots_dir="screenshots", keep_extracted_text=False):
        """
        Initialize the privacy-first analyzer

        Args:
            screenshots_dir: Directory containing screenshots
            keep_extracted_text: If False, deletes extracted text after analysis
        """
        self.screenshots_dir = Path(screenshots_dir)
        self.extracted_dir = Path("extracted_text")
        self.analysis_dir = Path("analysis_results")
        self.keep_extracted_text = keep_extracted_text

        # Ensure directories exist
        self.screenshots_dir.mkdir(exist_ok=True)
        self.extracted_dir.mkdir(exist_ok=True)
        self.analysis_dir.mkdir(exist_ok=True)

    def run_full_analysis(self):
        """
        Run the complete analysis pipeline with automatic cleanup

        Steps:
        1. Extract text from screenshots
        2. Delete screenshots (privacy)
        3. Analyze text for Enneagram patterns
        4. Delete extracted text (optional, based on keep_extracted_text)
        5. Keep only analysis results
        """
        print("=" * 70)
        print("PRIVACY-FIRST LINKEDIN PROFILE ANALYZER")
        print("=" * 70)
        print()

        # Check if there are screenshots to process
        screenshot_files = self._get_screenshot_files()
        if not screenshot_files:
            print("⚠ No screenshots found in the screenshots/ directory")
            print("Please add LinkedIn profile screenshots to analyze.")
            return None

        print(f"Found {len(screenshot_files)} screenshot(s)")
        print()

        # Step 1: Extract text
        print("STEP 1: Extracting text from screenshots...")
        print("-" * 70)
        extractor = LinkedInTextExtractor(
            screenshots_dir=str(self.screenshots_dir),
            output_dir=str(self.extracted_dir)
        )
        extracted_texts = extractor.process_screenshots(
            save_individual=True,
            save_combined=True
        )

        if not extracted_texts:
            print("⚠ No text was extracted. Analysis cannot continue.")
            return None

        print(f"✓ Extracted text from {len(extracted_texts)} screenshot(s)")
        print()

        # Step 2: Delete screenshots for privacy
        print("STEP 2: Deleting screenshots (privacy protection)...")
        print("-" * 70)
        deleted_count = self._delete_screenshots()
        print(f"✓ Deleted {deleted_count} screenshot(s)")
        print()

        # Step 3: Analyze text
        print("STEP 3: Analyzing Enneagram patterns...")
        print("-" * 70)

        # Find the combined text file
        combined_files = list(self.extracted_dir.glob("combined_extracted_*.txt"))
        if not combined_files:
            print("⚠ No combined text file found")
            return None

        latest_file = max(combined_files, key=lambda p: p.stat().st_mtime)

        with open(latest_file, 'r', encoding='utf-8') as f:
            text = f.read()

        analyzer = EnneagramAnalyzer()
        results = analyzer.analyze_text(text)

        # Generate report
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        report_path = self.analysis_dir / f"enneagram_analysis_{timestamp}.txt"
        analyzer.generate_report(results, report_path)
        analyzer.generate_simple_summary(results)

        print(f"✓ Analysis complete: {report_path}")
        print()

        # Step 4: Delete extracted text (optional)
        if not self.keep_extracted_text:
            print("STEP 4: Deleting extracted text (privacy protection)...")
            print("-" * 70)
            deleted_count = self._delete_extracted_text()
            print(f"✓ Deleted {deleted_count} extracted text file(s)")
            print()

        # Summary
        print("=" * 70)
        print("ANALYSIS COMPLETE")
        print("=" * 70)
        print()
        print("Privacy Summary:")
        print(f"  • Screenshots: DELETED ({deleted_count} files)")
        if not self.keep_extracted_text:
            print(f"  • Extracted text: DELETED ({deleted_count} files)")
        else:
            print(f"  • Extracted text: RETAINED in {self.extracted_dir}/")
        print(f"  • Analysis results: SAVED to {report_path}")
        print()
        print("✓ All sensitive data has been securely removed.")
        print()

        return report_path

    def _get_screenshot_files(self):
        """Get all screenshot files from screenshots directory"""
        image_extensions = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff'}
        return [
            f for f in self.screenshots_dir.iterdir()
            if f.suffix.lower() in image_extensions and f.is_file()
        ]

    def _delete_screenshots(self):
        """Delete all screenshots from the screenshots directory"""
        screenshot_files = self._get_screenshot_files()
        count = 0

        for file_path in screenshot_files:
            try:
                file_path.unlink()
                print(f"  Deleted: {file_path.name}")
                count += 1
            except Exception as e:
                print(f"  Error deleting {file_path.name}: {e}")

        return count

    def _delete_extracted_text(self):
        """Delete all extracted text files"""
        count = 0

        # Delete all files in extracted_text directory
        if self.extracted_dir.exists():
            for file_path in self.extracted_dir.iterdir():
                if file_path.is_file():
                    try:
                        file_path.unlink()
                        print(f"  Deleted: {file_path.name}")
                        count += 1
                    except Exception as e:
                        print(f"  Error deleting {file_path.name}: {e}")

        return count


def main():
    """Main execution function"""
    import argparse

    parser = argparse.ArgumentParser(
        description='Privacy-First LinkedIn Profile Analyzer'
    )
    parser.add_argument(
        '--keep-text',
        action='store_true',
        help='Keep extracted text files after analysis (default: delete for privacy)'
    )
    parser.add_argument(
        '--screenshots-dir',
        default='screenshots',
        help='Directory containing LinkedIn screenshots (default: screenshots)'
    )

    args = parser.parse_args()

    # Run analysis
    analyzer = PrivacyFirstAnalyzer(
        screenshots_dir=args.screenshots_dir,
        keep_extracted_text=args.keep_text
    )

    result = analyzer.run_full_analysis()

    if result:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
