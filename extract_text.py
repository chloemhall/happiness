#!/usr/bin/env python3
"""
LinkedIn Profile Text Extractor
Extracts text from LinkedIn profile screenshots using Tesseract OCR
"""

import os
import sys
from pathlib import Path
from PIL import Image
import pytesseract
from datetime import datetime


class LinkedInTextExtractor:
    def __init__(self, screenshots_dir="screenshots", output_dir="extracted_text"):
        """
        Initialize the text extractor

        Args:
            screenshots_dir: Directory containing LinkedIn screenshot images
            output_dir: Directory to save extracted text files
        """
        self.screenshots_dir = Path(screenshots_dir)
        self.output_dir = Path(output_dir)

        # Create directories if they don't exist
        self.screenshots_dir.mkdir(exist_ok=True)
        self.output_dir.mkdir(exist_ok=True)

    def extract_text_from_image(self, image_path):
        """
        Extract text from a single image using Tesseract OCR

        Args:
            image_path: Path to the image file

        Returns:
            Extracted text as string
        """
        try:
            # Open the image
            img = Image.open(image_path)

            # Use tesseract to extract text
            # The config options optimize for LinkedIn profiles
            custom_config = r'--oem 3 --psm 6'  # OEM 3 = LSTM, PSM 6 = uniform text block
            text = pytesseract.image_to_string(img, config=custom_config)

            return text.strip()
        except Exception as e:
            print(f"Error extracting text from {image_path}: {e}")
            return ""

    def process_screenshots(self, save_individual=True, save_combined=True):
        """
        Process all screenshots in the screenshots directory

        Args:
            save_individual: Save each screenshot's text to separate file
            save_combined: Save all extracted text to one combined file

        Returns:
            Dictionary mapping filename to extracted text
        """
        # Supported image formats
        image_extensions = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff'}

        # Find all image files
        image_files = [
            f for f in self.screenshots_dir.iterdir()
            if f.suffix.lower() in image_extensions
        ]

        if not image_files:
            print(f"No images found in {self.screenshots_dir}")
            return {}

        print(f"Found {len(image_files)} screenshot(s) to process")

        extracted_texts = {}
        all_text = []

        # Process each image
        for idx, image_path in enumerate(sorted(image_files), 1):
            print(f"Processing {idx}/{len(image_files)}: {image_path.name}...")

            text = self.extract_text_from_image(image_path)
            extracted_texts[image_path.name] = text

            # Save individual file if requested
            if save_individual and text:
                output_filename = f"{image_path.stem}_extracted.txt"
                output_path = self.output_dir / output_filename

                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(f"Source: {image_path.name}\n")
                    f.write(f"Extracted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                    f.write("-" * 60 + "\n\n")
                    f.write(text)

                print(f"  → Saved to {output_path}")

            # Collect for combined file
            if text:
                all_text.append(f"\n{'='*60}\n")
                all_text.append(f"Source: {image_path.name}\n")
                all_text.append(f"{'='*60}\n\n")
                all_text.append(text)

        # Save combined file if requested
        if save_combined and all_text:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            combined_path = self.output_dir / f"combined_extracted_{timestamp}.txt"

            with open(combined_path, 'w', encoding='utf-8') as f:
                f.write(f"LinkedIn Profile Text Extraction\n")
                f.write(f"Extracted: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Total screenshots: {len(image_files)}\n")
                f.write(''.join(all_text))

            print(f"\n✓ Combined text saved to {combined_path}")

        return extracted_texts

    def get_word_count(self, text):
        """Get word count from extracted text"""
        return len(text.split())

    def save_stats(self, extracted_texts):
        """Save extraction statistics"""
        stats_path = self.output_dir / "extraction_stats.txt"

        with open(stats_path, 'w', encoding='utf-8') as f:
            f.write("Text Extraction Statistics\n")
            f.write("=" * 60 + "\n\n")

            total_words = 0
            for filename, text in extracted_texts.items():
                word_count = self.get_word_count(text)
                total_words += word_count
                f.write(f"{filename}: {word_count} words\n")

            f.write(f"\nTotal words extracted: {total_words}\n")

        print(f"Statistics saved to {stats_path}")


def main():
    """Main execution function"""
    print("LinkedIn Profile Text Extractor")
    print("=" * 60 + "\n")

    # Initialize extractor
    extractor = LinkedInTextExtractor()

    # Process all screenshots
    extracted_texts = extractor.process_screenshots(
        save_individual=True,
        save_combined=True
    )

    if extracted_texts:
        print(f"\n✓ Successfully processed {len(extracted_texts)} screenshot(s)")
        extractor.save_stats(extracted_texts)
    else:
        print("\n⚠ No text was extracted. Make sure:")
        print("  1. Screenshots are in the 'screenshots' folder")
        print("  2. Images are clear and readable")
        print("  3. Tesseract is properly installed")


if __name__ == "__main__":
    main()
