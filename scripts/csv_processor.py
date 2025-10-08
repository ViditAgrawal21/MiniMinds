import os
from pathlib import Path
import pandas as pd
import json
import re
from typing import Dict, List, Any

class ScanDataGenerator:
    def __init__(self, csv_file_path: str):
        """Initialize with CSV file path"""
        # Resolve the CSV path in a few sensible locations so the script
        # works whether run from the repo root, the scripts folder, or
        # elsewhere.
        csv_path = Path(csv_file_path)
        if not csv_path.is_absolute():
            script_dir = Path(__file__).resolve().parent
            candidates = [
                script_dir / csv_file_path,        # scripts/<csv>
                script_dir.parent / csv_file_path, # repo root/<csv>
                Path.cwd() / csv_file_path         # current working dir
            ]
            found = None
            for c in candidates:
                if c.exists():
                    found = c
                    break
            if found is None:
                # Provide a helpful error listing attempted locations
                tried = ', '.join(str(c) for c in candidates)
                raise FileNotFoundError(f"CSV file not found. Tried: {tried}")
            csv_path = found

        print(f"Resolved CSV path: {csv_path}")
        self.df = pd.read_csv(csv_path)
        self.conditions = {}
        self.translations = {}
        
    def normalize_condition_name(self, name: str) -> str:
        """Normalize condition name for use as keys"""
        # Remove special characters and convert to camelCase
        name = name.strip()
        # Split by spaces and capitalize each word
        words = name.split()
        if len(words) == 1:
            return words[0].lower()
        return words[0].lower() + ''.join(word.capitalize() for word in words[1:])
    
    def create_translation_key(self, condition: str, context: str, index: int = None) -> str:
        """Create translation key in the format used in the app"""
        normalized = self.normalize_condition_name(condition)
        if index is not None:
            return f"scanQuestions.{normalized}.{context}.{index}"
        return f"scanQuestions.{normalized}.{context}"
    
    def process_csv(self):
        """Process CSV and organize data by condition"""
        print(f"Processing {len(self.df)} questions...")
        
        # Group by condition
        grouped = self.df.groupby('Condition Name')
        
        for condition_name, group in grouped:
            print(f"Processing condition: {condition_name}")
            questions = []
            
            for idx, row in group.iterrows():
                question_data = {
                    'text': row['Question Text'],
                    'scores': {
                        'stronglyAgree': int(row['Strongly Agree Score']),
                        'agree': int(row['Agree Score']),
                        'neutral': int(row['Neutral Score']),
                        'disagree': int(row['Disagree Score']),
                        'stronglyDisagree': int(row['Strongly Disagree Score'])
                    }
                }
                questions.append(question_data)
            
            self.conditions[condition_name] = questions
            print(f"  - Added {len(questions)} questions")
    
    def generate_intro_text(self, condition_name: str) -> Dict[str, str]:
        """Generate intro text for a condition"""
        # Default intro templates
        return {
            'title': condition_name,
            'overview': f"{condition_name} is an important aspect of mental well-being. This assessment will help you understand your current state regarding {condition_name.lower()}. It involves learning techniques to recognize, understand, and manage various aspects that may affect your daily life and relationships."
        }
        
    # Add this method to the ScanDataGenerator class:
    def generate_question_database_json(self):
        """Generate questionDatabase.json format"""
        database = {"conditions": {}}

        for condition_name, questions in self.conditions.items():
            database["conditions"][condition_name] = {
                "questions": [],
                "isReverseScored": []
            }

            for question in questions:
                database["conditions"][condition_name]["questions"].append({
                    "text": question['text'],
                    "scores": question['scores']
                })
                database["conditions"][condition_name]["isReverseScored"].append(
                    self.is_reverse_scored(question['text'])
                )
        return database

    def generate_translations(self):
        """Generate translation JSON structure"""
        self.translations = {
            'scanIntro': {},
            'scanQuestions': {}
        }

        for condition_name, questions in self.conditions.items():
            normalized_name = self.normalize_condition_name(condition_name)

            # Intro translations
            intro_data = self.generate_intro_text(condition_name)
            self.translations['scanIntro'][normalized_name] = {
                'title': intro_data['title'],
                'overview': intro_data['overview']
            }

            # Question translations
            self.translations['scanQuestions'][normalized_name] = {
                'title': condition_name,
                'questions': {},
                'options': {
                    'stronglyDisagree': 'Strongly Disagree',
                    'disagree': 'Disagree',
                    'neutral': 'Neutral',
                    'agree': 'Agree',
                    'stronglyAgree': 'Strongly Agree'
                }
            }

            # Add each question
            for idx, question in enumerate(questions, 1):
                self.translations['scanQuestions'][normalized_name]['questions'][str(idx)] = question['text']
    
    def generate_question_data_structure(self):
        """Generate the React Native question data structure"""
        question_structure = []
        
        for condition_name, questions in self.conditions.items():
            normalized_name = self.normalize_condition_name(condition_name)
            
            # Group questions in pairs (as per the original structure)
            question_pairs = []
            for i in range(0, len(questions), 2):
                pair = []
                for j in range(2):
                    if i + j < len(questions):
                        q = questions[i + j]
                        question_num = i + j + 1
                        
                        # Determine if this question should have reversed scoring
                        # (You may need to adjust this logic based on your requirements)
                        is_reverse_scored = self.is_reverse_scored(q['text'])
                        
                        question_obj = {
                            'filename': f"t('scanQuestions.{normalized_name}.title', '{condition_name}')",
                            'Q_id': str(question_num),
                            'Name': f"t('scanQuestions.{normalized_name}.questions.{question_num}', '{q['text']}')",
                            'Option 1': f"t('scanQuestions.{normalized_name}.options.stronglyDisagree', 'Strongly Disagree')",
                            'Option 1 Weight': str(q['scores']['stronglyDisagree'] if not is_reverse_scored else q['scores']['stronglyAgree']),
                            'Option 2': f"t('scanQuestions.{normalized_name}.options.disagree', 'Disagree')",
                            'Option 2 Weight': str(q['scores']['disagree'] if not is_reverse_scored else q['scores']['agree']),
                            'Option 3': f"t('scanQuestions.{normalized_name}.options.neutral', 'Neutral')",
                            'Option 3 Weight': str(q['scores']['neutral']),
                            'Option 4': f"t('scanQuestions.{normalized_name}.options.agree', 'Agree')",
                            'Option 4 Weight': str(q['scores']['agree'] if not is_reverse_scored else q['scores']['disagree']),
                            'Option 5': f"t('scanQuestions.{normalized_name}.options.stronglyAgree', 'Strongly Agree')",
                            'Option 5 Weight': str(q['scores']['stronglyAgree'] if not is_reverse_scored else q['scores']['stronglyDisagree'])
                        }
                        pair.append(question_obj)
                
                if pair:
                    question_pairs.append(pair)
            
            # Create the structure for this condition
            condition_structure = {
                f"[t('scanQuestions.{normalized_name}.title', '{condition_name}')]": question_pairs
            }
            question_structure.append(condition_structure)
        
        return question_structure
    
    def is_reverse_scored(self, question_text: str) -> bool:
        """Determine if a question should be reverse scored based on its wording"""
        # Keywords that indicate positive statements (should be reverse scored)
        positive_indicators = [
            'easy', 'confident', 'comfortable', 'satisfied', 'good', 'well',
            'healthy', 'positive', 'effectively', 'successfully', 'able to',
            'rarely', 'seldom', 'never'
        ]
        
        question_lower = question_text.lower()
        return any(indicator in question_lower for indicator in positive_indicators)
    
    def generate_scan_data_array(self):
        """Generate the scanData array for ScanIntro"""
        scan_data = []
        
        for condition_name in self.conditions.keys():
            normalized_name = self.normalize_condition_name(condition_name)
            scan_data.append({
                'name': condition_name,
                'questionScreen': f"{normalized_name}Question"
            })
        
        return scan_data
    
    def generate_translation_keys_mapping(self):
        """Generate the translationKeys mapping"""
        translation_keys = {}
        
        for condition_name in self.conditions.keys():
            normalized_name = self.normalize_condition_name(condition_name)
            translation_keys[condition_name] = normalized_name
        
        return translation_keys
    
    def save_outputs(self, output_dir: str = './output'):
        """Save all generated files"""
        import os
        os.makedirs(output_dir, exist_ok=True)
        
        # Save translations JSON
        with open(f'{output_dir}/translations.json', 'w', encoding='utf-8') as f:
            json.dump(self.translations, f, indent=2, ensure_ascii=False)
        print(f"Saved translations to {output_dir}/translations.json")
        
        # Save question structure
        question_structure = self.generate_question_data_structure()
        with open(f'{output_dir}/question_structure.json', 'w', encoding='utf-8') as f:
            json.dump(question_structure, f, indent=2, ensure_ascii=False)
        print(f"Saved question structure to {output_dir}/question_structure.json")
        
        # Save scan data array
        scan_data = self.generate_scan_data_array()
        with open(f'{output_dir}/scan_data.json', 'w', encoding='utf-8') as f:
            json.dump(scan_data, f, indent=2, ensure_ascii=False)
        print(f"Saved scan data to {output_dir}/scan_data.json")
        
        # Save translation keys mapping
        translation_keys = self.generate_translation_keys_mapping()
        with open(f'{output_dir}/translation_keys.json', 'w', encoding='utf-8') as f:
            json.dump(translation_keys, f, indent=2, ensure_ascii=False)
        print(f"Saved translation keys to {output_dir}/translation_keys.json")
        
        # Generate TypeScript code
        self.generate_typescript_code(output_dir)
    
    def generate_typescript_code(self, output_dir: str):
        """Generate TypeScript code snippets"""
        
        # Generate ScreenQuestionData code
        ts_code = "// Auto-generated question data\n"
        ts_code += "// Generated from CSV using Python script\n\n"
        ts_code += "const ScreenQuestionData = useMemo(\n"
        ts_code += "  () => [\n"
        
        for condition_name, questions in self.conditions.items():
            normalized_name = self.normalize_condition_name(condition_name)
            ts_code += f"    {{\n"
            ts_code += f"      [t('scanQuestions.{normalized_name}.title', '{condition_name}')]: [\n"
            
            # Group questions in pairs
            for i in range(0, len(questions), 2):
                ts_code += "        [\n"
                
                for j in range(2):
                    if i + j < len(questions):
                        q = questions[i + j]
                        question_num = i + j + 1
                        is_reverse = self.is_reverse_scored(q['text'])
                        
                        ts_code += "          {\n"
                        ts_code += f"            filename: t('scanQuestions.{normalized_name}.title', '{condition_name}'),\n"
                        ts_code += f"            Q_id: '{question_num}',\n"
                        ts_code += f"            Name: t('scanQuestions.{normalized_name}.questions.{question_num}', '{q['text']}'),\n"
                        ts_code += f"            'Option 1': t('scanQuestions.{normalized_name}.options.stronglyDisagree', 'Strongly Disagree'),\n"
                        ts_code += f"            'Option 1 Weight': '{q['scores']['stronglyDisagree'] if not is_reverse else q['scores']['stronglyAgree']}',\n"
                        ts_code += f"            'Option 2': t('scanQuestions.{normalized_name}.options.disagree', 'Disagree'),\n"
                        ts_code += f"            'Option 2 Weight': '{q['scores']['disagree'] if not is_reverse else q['scores']['agree']}',\n"
                        ts_code += f"            'Option 3': t('scanQuestions.{normalized_name}.options.neutral', 'Neutral'),\n"
                        ts_code += f"            'Option 3 Weight': '{q['scores']['neutral']}',\n"
                        ts_code += f"            'Option 4': t('scanQuestions.{normalized_name}.options.agree', 'Agree'),\n"
                        ts_code += f"            'Option 4 Weight': '{q['scores']['agree'] if not is_reverse else q['scores']['disagree']}',\n"
                        ts_code += f"            'Option 5': t('scanQuestions.{normalized_name}.options.stronglyAgree', 'Strongly Agree'),\n"
                        ts_code += f"            'Option 5 Weight': '{q['scores']['stronglyAgree'] if not is_reverse else q['scores']['stronglyDisagree']}',\n"
                        ts_code += "          },\n"
                
                ts_code += "        ],\n"
            
            ts_code += "      ],\n"
            ts_code += "    },\n"
        
        ts_code += "  ],\n"
        ts_code += "  [locale]\n"
        ts_code += ");\n"
        
        with open(f'{output_dir}/question_data_typescript.txt', 'w', encoding='utf-8') as f:
            f.write(ts_code)
        print(f"Saved TypeScript code to {output_dir}/question_data_typescript.txt")
        
        # Generate scanData array code
        scan_data_code = "// Auto-generated scan data array\n"
        scan_data_code += "const scanData = [\n"
        
        for condition_name in self.conditions.keys():
            normalized_name = self.normalize_condition_name(condition_name)
            scan_data_code += f"  {{ name: '{condition_name}', questionScreen: '{normalized_name}Question' }},\n"
        
        scan_data_code += "];\n"
        
        with open(f'{output_dir}/scan_data_typescript.txt', 'w', encoding='utf-8') as f:
            f.write(scan_data_code)
        print(f"Saved scan data TypeScript to {output_dir}/scan_data_typescript.txt")
        
        # Generate translationKeys mapping code
        translation_keys_code = "// Auto-generated translation keys mapping\n"
        translation_keys_code += "const translationKeys: { [key: string]: string } = {\n"
        
        for condition_name in self.conditions.keys():
            normalized_name = self.normalize_condition_name(condition_name)
            translation_keys_code += f"  '{condition_name}': '{normalized_name}',\n"
        
        translation_keys_code += "};\n"
        
        with open(f'{output_dir}/translation_keys_typescript.txt', 'w', encoding='utf-8') as f:
            f.write(translation_keys_code)
        print(f"Saved translation keys TypeScript to {output_dir}/translation_keys_typescript.txt")
    
    def generate_report(self):
        """Generate a summary report"""
        print("\n" + "="*60)
        print("GENERATION REPORT")
        print("="*60)
        print(f"Total Conditions: {len(self.conditions)}")
        print(f"Total Questions: {sum(len(q) for q in self.conditions.values())}")
        print("\nConditions processed:")
        for condition_name, questions in self.conditions.items():
            print(f"  - {condition_name}: {len(questions)} questions")
        print("="*60 + "\n")

# Main execution
if __name__ == "__main__":
    # Configuration
    CSV_FILE = "test.csv"  # Update this path
    OUTPUT_DIR = "./output"
    
    print("Starting CSV processing...")
    print(f"Reading from: {CSV_FILE}")
    print(f"Output directory: {OUTPUT_DIR}\n")
    
    # Create generator instance
    generator = ScanDataGenerator(CSV_FILE)
    
    # Process the CSV
    generator.process_csv()
    
    # Generate translations
    print("\nGenerating translations...")
    generator.generate_translations()
    
    # Save all outputs
    print("\nSaving outputs...")
    generator.save_outputs(OUTPUT_DIR)
    
    # Generate report
    generator.generate_report()
    
    print("Processing complete!")
    print(f"\nNext steps:")
    print(f"1. Review generated files in {OUTPUT_DIR}/")
    print(f"2. Copy translations to your i18n locale files")
    print(f"3. Update ScanQuestions.tsx with the generated TypeScript code")
    print(f"4. Update ScanIntro.tsx with the generated scan data array")