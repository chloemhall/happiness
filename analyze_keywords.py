#!/usr/bin/env python3
"""
Enneagram Type Keyword Analyzer
Analyzes extracted text for all 9 Enneagram type patterns
"""

import re
from pathlib import Path
from collections import defaultdict
from datetime import datetime


class EnneagramAnalyzer:
    """Analyzes text for Enneagram type patterns"""

    def __init__(self):
        # Type 1 (Perfectionist/Reformer) - Principled, corrective, improvement-focused
        self.type1_keywords = {
            'correctness': ['should', 'should not', 'ought', 'must', 'correct', 'incorrect', 'right', 'wrong'],
            'improvement': ['improve', 'improvement', 'better', 'enhance', 'optimize', 'refine', 'perfect'],
            'standards': ['standard', 'quality', 'excellence', 'integrity', 'principle', 'ethics', 'proper'],
            'criticism': ['issue', 'problem', 'mistake', 'error', 'flaw', 'fix', 'address'],
            'organization': ['organize', 'structure', 'system', 'process', 'method', 'efficient', 'order'],
            'responsibility': ['responsibility', 'duty', 'obligation', 'accountable', 'conscientious']
        }

        # Type 2 (Helper) - Warm, other-focused, supportive
        self.type2_keywords = {
            'helping': ['help', 'helping', 'helped', 'support', 'supporting', 'assist', 'serve', 'care'],
            'relationships': ['relationship', 'connect', 'connection', 'friend', 'friendship', 'together', 'close'],
            'needs': ['need', 'needs', 'want', 'desire', 'require'],
            'appreciation': ['appreciate', 'appreciation', 'grateful', 'thank', 'thanks', 'gratitude'],
            'giving': ['give', 'giving', 'offer', 'provide', 'share', 'contribute'],
            'others': ['you', 'your', 'others', 'people', 'someone', 'everyone', 'celebrate']
        }

        # Type 3 (Achiever) - Success, achievement, efficiency oriented
        self.type3_keywords = {
            'achievement': ['achieve', 'achieved', 'achieving', 'accomplishment', 'success', 'successful', 'win', 'winning', 'won'],
            'goals': ['goal', 'target', 'objective', 'milestone', 'aim'],
            'performance': ['efficient', 'effective', 'productivity', 'optimize', 'performance', 'execute', 'execution', 'deliver'],
            'metrics': ['revenue', 'growth', 'metric', 'kpi', 'measure', 'result', 'outcome', 'roi'],
            'status': ['leader', 'top', 'best', 'leading', 'competitive', 'ambitious', 'ambition'],
            'speed': ['fast', 'quick', 'velocity', 'rapid', 'speed', 'accelerate']
        }

        # Type 4 (Individualist) - Authenticity, emotion, uniqueness
        self.type4_keywords = {
            'emotions': ['feel', 'feeling', 'felt', 'emotion', 'emotional', 'heart'],
            'authenticity': ['authentic', 'genuine', 'real', 'true', 'honest'],
            'identity': ['identity', 'self', 'who i am', 'unique', 'individual', 'different', 'special'],
            'meaning': ['meaning', 'meaningful', 'purpose', 'deep', 'depth', 'significance'],
            'creativity': ['creative', 'creativity', 'artistic', 'express', 'expression'],
            'introspection': ['realize', 'realized', 'reflect', 'thought', 'understand', 'appreciate']
        }

        # Type 5 (Investigator) - Analytical, knowledge-seeking, observant
        self.type5_keywords = {
            'analysis': ['analyze', 'analysis', 'analytical', 'examine', 'investigate', 'study'],
            'knowledge': ['know', 'knowledge', 'learn', 'learning', 'understand', 'understanding', 'comprehend'],
            'research': ['research', 'data', 'information', 'facts', 'evidence', 'findings'],
            'thinking': ['think', 'thinking', 'thought', 'consider', 'contemplate', 'reason'],
            'expertise': ['expert', 'expertise', 'mastery', 'specialist', 'competent', 'proficient'],
            'insight': ['insight', 'observe', 'observation', 'perspective', 'theory', 'concept']
        }

        # Type 6 (Loyalist) - Collaborative, cautious, security-oriented
        self.type6_keywords = {
            'collaboration': ['we', 'us', 'our', 'team', 'together', 'collective', 'group'],
            'planning': ['plan', 'planning', 'prepare', 'preparation', 'anticipate', 'consider'],
            'caution': ['risk', 'careful', 'cautious', 'safe', 'safety', 'security', 'concern'],
            'loyalty': ['loyal', 'loyalty', 'commit', 'commitment', 'dedicated', 'reliable', 'trust'],
            'questions': ['what if', 'question', 'questioning', 'doubt', 'uncertain', 'worry'],
            'support': ['support', 'backup', 'guidance', 'advice', 'reassurance']
        }

        # Type 7 (Enthusiast) - Possibilities, new experiences, excitement
        self.type7_keywords = {
            'novelty': ['new', 'novel', 'fresh', 'latest', 'cutting-edge'],
            'excitement': ['exciting', 'excited', 'enthusiasm', 'passionate', 'energized', 'thrill'],
            'opportunities': ['opportunity', 'opportunities', 'possibility', 'potential', 'chance'],
            'variety': ['variety', 'diverse', 'range', 'multiple', 'different options'],
            'future': ['future', 'tomorrow', 'next', 'upcoming', 'ahead', 'forward'],
            'positive': ['fun', 'enjoy', 'amazing', 'awesome', 'great', 'incredible', 'love'],
            'exploration': ['explore', 'discover', 'adventure', 'experience', 'try', 'build']
        }

        # Type 8 (Challenger) - Direct, assertive, powerful
        self.type8_keywords = {
            'assertion': ['will', 'must', 'need to', 'have to', 'going to', 'demand'],
            'strength': ['strong', 'strength', 'power', 'powerful', 'force', 'control'],
            'directness': ['direct', 'directly', 'straight', 'clear', 'blunt', 'honest'],
            'leadership': ['lead', 'leader', 'leadership', 'charge', 'command', 'authority'],
            'justice': ['justice', 'fair', 'unfair', 'stand up', 'fight', 'protect'],
            'confrontation': ['confront', 'challenge', 'push', 'demand', 'insist', 'assert']
        }

        # Type 9 (Peacemaker) - Harmonious, inclusive, consensus-seeking
        self.type9_keywords = {
            'harmony': ['harmony', 'peace', 'peaceful', 'calm', 'balance', 'balanced'],
            'agreement': ['agree', 'agreement', 'consensus', 'common ground', 'compromise'],
            'inclusion': ['everyone', 'all', 'inclusive', 'include', 'every', 'whole'],
            'perspective': ['perspective', 'view', 'viewpoint', 'see', 'sides', 'understand'],
            'acceptance': ['accept', 'accepting', 'okay', 'fine', 'whatever', 'comfortable'],
            'avoidance': ['avoid', 'maybe', 'perhaps', 'could', 'might', 'easy', 'simple']
        }

        self.all_types = {
            'Type 1 (Perfectionist)': self.type1_keywords,
            'Type 2 (Helper)': self.type2_keywords,
            'Type 3 (Achiever)': self.type3_keywords,
            'Type 4 (Individualist)': self.type4_keywords,
            'Type 5 (Investigator)': self.type5_keywords,
            'Type 6 (Loyalist)': self.type6_keywords,
            'Type 7 (Enthusiast)': self.type7_keywords,
            'Type 8 (Challenger)': self.type8_keywords,
            'Type 9 (Peacemaker)': self.type9_keywords
        }

    def extract_context(self, text, keyword, context_words=10):
        """
        Extract context around a keyword match

        Args:
            text: Full text to search
            keyword: Keyword that was matched
            context_words: Number of words to show before and after

        Returns:
            List of context snippets
        """
        # Create case-insensitive pattern
        pattern = re.compile(r'\b' + re.escape(keyword) + r'\b', re.IGNORECASE)
        matches = []

        for match in pattern.finditer(text):
            start = match.start()
            end = match.end()

            # Find sentence boundaries or use word count
            # Go backwards to find start
            words_before = text[:start].split()
            start_pos = max(0, len(' '.join(words_before[-context_words:])))
            if words_before:
                context_start = text[:start].rfind(' ', max(0, start - 100), start - start_pos)
                if context_start == -1:
                    context_start = max(0, start - 100)
            else:
                context_start = 0

            # Go forward to find end
            words_after = text[end:].split()
            end_words = ' '.join(words_after[:context_words])
            context_end = end + len(end_words)

            snippet = text[context_start:context_end].strip()
            if snippet:
                matches.append(snippet)

        return matches

    def analyze_text(self, text):
        """
        Analyze text for all Enneagram type patterns

        Args:
            text: Text to analyze

        Returns:
            Dictionary with analysis results
        """
        text_lower = text.lower()
        results = {}

        for type_name, categories in self.all_types.items():
            type_results = {
                'total_matches': 0,
                'categories': {},
                'matches': []
            }

            for category, keywords in categories.items():
                category_matches = []

                for keyword in keywords:
                    # Count matches (case insensitive, whole word)
                    pattern = r'\b' + re.escape(keyword) + r'\b'
                    matches = re.findall(pattern, text_lower)
                    count = len(matches)

                    if count > 0:
                        # Get context for this keyword
                        contexts = self.extract_context(text, keyword)

                        category_matches.append({
                            'keyword': keyword,
                            'count': count,
                            'contexts': contexts[:3]  # Limit to 3 examples
                        })

                        type_results['total_matches'] += count
                        type_results['matches'].extend([{
                            'keyword': keyword,
                            'category': category,
                            'context': ctx
                        } for ctx in contexts[:2]])  # Top 2 contexts per keyword

                if category_matches:
                    type_results['categories'][category] = category_matches

            results[type_name] = type_results

        return results

    def generate_report(self, results, output_path):
        """
        Generate a readable analysis report

        Args:
            results: Analysis results from analyze_text()
            output_path: Path to save the report
        """
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("ENNEAGRAM TYPE KEYWORD ANALYSIS REPORT\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("=" * 80 + "\n\n")

            # Summary scores
            f.write("SUMMARY SCORES\n")
            f.write("-" * 80 + "\n")
            sorted_types = sorted(results.items(), key=lambda x: x[1]['total_matches'], reverse=True)

            for type_name, data in sorted_types:
                f.write(f"{type_name}: {data['total_matches']} matches\n")

            f.write("\n" + "=" * 80 + "\n\n")

            # Detailed breakdown per type
            for type_name, data in sorted_types:
                f.write(f"{type_name.upper()}\n")
                f.write("=" * 80 + "\n")
                f.write(f"Total Matches: {data['total_matches']}\n\n")

                if data['categories']:
                    f.write("Category Breakdown:\n")
                    f.write("-" * 80 + "\n")

                    for category, matches in data['categories'].items():
                        category_total = sum(m['count'] for m in matches)
                        f.write(f"\n{category.upper()} ({category_total} matches):\n")

                        for match in matches:
                            f.write(f"  • '{match['keyword']}': {match['count']} times\n")

                    # Show evidence (supporting quotes)
                    if data['matches']:
                        f.write("\n" + "-" * 80 + "\n")
                        f.write("SUPPORTING EVIDENCE (Sample Quotes):\n")
                        f.write("-" * 80 + "\n")

                        # Group by category and show top examples
                        for i, match in enumerate(data['matches'][:10], 1):  # Top 10 quotes
                            f.write(f"\n{i}. [{match['category']}] \"{match['keyword']}\"\n")
                            f.write(f"   ...{match['context']}...\n")
                else:
                    f.write("No matches found for this type.\n")

                f.write("\n" + "=" * 80 + "\n\n")

    def generate_simple_summary(self, results):
        """Generate a simple text summary for console output"""
        sorted_types = sorted(results.items(), key=lambda x: x[1]['total_matches'], reverse=True)

        print("\n" + "=" * 60)
        print("KEYWORD ANALYSIS SUMMARY")
        print("=" * 60 + "\n")

        for type_name, data in sorted_types:
            percentage = (data['total_matches'] / sum(r['total_matches'] for r in results.values()) * 100) if sum(r['total_matches'] for r in results.values()) > 0 else 0
            print(f"{type_name}:")
            print(f"  Matches: {data['total_matches']} ({percentage:.1f}%)")
            print(f"  Categories: {len(data['categories'])}")
            print()


def main():
    """Main execution function"""
    print("Enneagram Type Keyword Analyzer")
    print("=" * 60 + "\n")

    # Set up paths
    extracted_dir = Path("extracted_text")
    analysis_dir = Path("analysis_results")
    analysis_dir.mkdir(exist_ok=True)

    # Find the most recent combined extraction file
    combined_files = list(extracted_dir.glob("combined_extracted_*.txt"))

    if not combined_files:
        print("⚠ No extracted text files found.")
        print("Please run extract_text.py first.")
        return

    # Use the most recent file
    latest_file = max(combined_files, key=lambda p: p.stat().st_mtime)
    print(f"Analyzing: {latest_file.name}\n")

    # Read the text
    with open(latest_file, 'r', encoding='utf-8') as f:
        text = f.read()

    # Analyze
    analyzer = EnneagramAnalyzer()
    results = analyzer.analyze_text(text)

    # Generate outputs
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    report_path = analysis_dir / f"enneagram_analysis_{timestamp}.txt"

    analyzer.generate_report(results, report_path)
    analyzer.generate_simple_summary(results)

    print(f"✓ Detailed report saved to: {report_path}")


if __name__ == "__main__":
    main()
