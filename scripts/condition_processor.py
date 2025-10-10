
import json
import os
from typing import Dict, List, Any
import time
import random
from google.cloud import translate_v2 as translate
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'booking-system-468212-8c4638c345f3.json'
translate_client = translate.Client()
class ConditionDataProcessor:
    def __init__(self):
        self.supported_languages = {
            'english': 'en',
            'hindi': 'hi', 
            'marathi': 'mr'
        }



    def translate_text(self,text, target_lang):
        """Translate using paid Google Cloud Translation API"""
        try:
            translate_client = translate.Client()
            result = translate_client.translate(
                text,
                target_language=target_lang
            )
            #result['translatedText'] = []
            print(result['translatedText'])
            return result['translatedText']

        except Exception as e:
            print(f"Translation failed: {e}")
            return text
    def create_multilingual_content(self, text: str) -> Dict[str, str]:
        """Create multilingual content for a given text"""
        return {
            'english': text,
            #'hindi': text,
            #'marathi': text
            'hindi': self.translate_text(text, 'hi'),
            'marathi': self.translate_text(text, 'mr')
        }

    def determine_issue_type(self, issue_name: str) -> str:
        """Determine the issue type based on issue name"""
        behavioral_issues = [
            'ADHD', 'Conduct Issues', 'Violent and Aggressive Behaviour',
            'Autism & inflected Disability'
        ]

        mental_health_issues = [
            'Depression', 'Anxiety issues like PTSD', 'Loneliness'
        ]

        developmental_issues = [
            'Learning Disability', 'Dealing with Children of Special Needs'
        ]

        social_issues = [
            'Parenting from Child point of View',
            'Parenting from parents Point of View'
        ]

        if issue_name in behavioral_issues:
            return 'Behavioural Issues'
        elif issue_name in mental_health_issues:
            return 'Mental Health Issues'
        elif issue_name in developmental_issues:
            return 'Developmental Issues'
        elif issue_name in social_issues:
            return 'Social Issues'
        else:
            return 'General Issues'

    def process_cards_by_type(self, cards: List[Dict], card_type: str) -> List[Dict]:
        """Process cards and create structured format with translations"""
        processed_cards = []

        for i, card in enumerate(cards, 1):
            processed_card = {
                'id': i,
                'xp': int(card.get('Xp', 5)),
                'title': self.create_multilingual_content(card['Card Title']),
                'description': self.create_multilingual_content(card['Card Description'])
            }
            processed_cards.append(processed_card)

        return processed_cards

    def create_condition_structure(self, condition_name: str, cards_data: List[Dict]) -> Dict:
        """Create the complete structure for a condition"""

        # Group cards by type
        common_suggestions = [card for card in cards_data if card['Type'] == 'Common Suggestion']
        yoga_meditation = [card for card in cards_data if card['Type'] == 'Yoga and Meditation']
        relaxation = [card for card in cards_data if card['Type'] == 'Relaxation']
        CBT = [card for card in cards_data if card['Type'] == 'CBT']
        REBT = [card for card in cards_data if card['Type'] == 'REBT']
        # Create the structure
        structure = {
            'condition': condition_name,
            'issueType': self.determine_issue_type(condition_name),
            'interventions': {}
        }

        # Add Common Suggestions
        if common_suggestions:
            structure['interventions']['commonSuggestions'] = {
                'type': 'Primary',
                'interventionSubType': '10 Common Suggestions',
                'cards': self.process_cards_by_type(common_suggestions, 'Common Suggestion')
            }

        # Add Yoga and Meditation
        if yoga_meditation:
            structure['interventions']['yoga'] = {
                'type': 'Secondary',
                'interventionSubType': 'Yoga And Meditation Techniques',
                'cards': self.process_cards_by_type(yoga_meditation, 'Yoga and Meditation')
            }

        # Add Relaxation
        if relaxation:
            structure['interventions']['relaxation'] = {
                'type': 'Secondary',
                'interventionSubType': 'Relaxation',
                'cards': self.process_cards_by_type(relaxation, 'Relaxation')
            }

        # Add CBT and REBT sections (template structure)
        structure['interventions']['cbt'] = {
            'type': 'Tertiary',
            'interventionSubType': 'CBT Interventions',
            'cards': self.process_cards_by_type(CBT, 'CBT')
        }

        structure['interventions']['rebt'] = {
            'type': 'Tertiary', 
            'interventionSubType': 'REBT Interventions',
            'cards': self.process_cards_by_type(REBT, 'REBT')
        }

        return structure



    def process_final_data(self, input_file: str, output_dir: str = 'condition_files_v5'):
        """Process the Final_Data.json file and create condition-specific files"""

        # Create output directory
        os.makedirs(output_dir, exist_ok=True)

        # Load the input data
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Group data by condition
        conditions = {}
        for item in data:
            condition = item['Issue Name']
            if condition not in conditions:
                conditions[condition] = []
            conditions[condition].append(item)

        print(f"Found {len(conditions)} conditions to process:")
        for condition in conditions.keys():
            print(f"  - {condition}")

        # Process each condition
        for condition_name, condition_data in conditions.items():
            print(f"\nProcessing: {condition_name}")

            try:
                # Create the structured data
                structured_data = self.create_condition_structure(condition_name, condition_data)

                # Create filename (replace spaces and special characters)
                safe_filename = condition_name.replace(' ', '_').replace('&', 'and').replace('/', '_')
                output_file = os.path.join(output_dir, f"{safe_filename}_comprehensive_data.json")

                # Save the file
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(structured_data, f, indent=2, ensure_ascii=False)

                print(f"  ✓ Created: {output_file}")

            except Exception as e:
                print(f"  ✗ Error processing {condition_name}: {e}")

        print(f"\nProcessing complete! Files saved in '{output_dir}' directory.")


def translate_text_paid(text, target_lang='hi'):
    """Translate using paid Google Cloud Translation API"""
    try:
        translate_client = translate.Client()

        result = translate_client.translate(
            text,
            target_language=target_lang
        )

        return result['translatedText']

    except Exception as e:
        print(f"Translation failed: {e}")
        return text
def main():
    """Main function to run the processor"""
    processor = ConditionDataProcessor()

    # Process the Final_Data.json file
    input_file = 'converted_data_fixed.json'

    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found!")
        return

    print("Starting condition data processing...")
    print("Note: Translation may take some time due to API rate limits.")

    processor.process_final_data(input_file)

if __name__ == "__main__":
    main()
