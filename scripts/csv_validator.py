"""
CSV Validator for Question Database
Validates CSV structure before processing
"""

import pandas as pd
import sys
from pathlib import Path
from typing import List, Dict, Tuple

class CSVValidator:
    """Validates question CSV format and content"""
    
    REQUIRED_COLUMNS = [
        'Condition Name',
        'Question Text',
        'Strongly Agree Score',
        'Agree Score',
        'Neutral Score',
        'Disagree Score',
        'Strongly Disagree Score'
    ]
    
    QUESTIONS_PER_CONDITION = 10
    VALID_SCORES = [1, 2, 3, 4, 5]
    
    def __init__(self, csv_path: str):
        """Initialize validator with CSV path"""
        # Resolve CSV path similar to other scripts so 'test.csv' works
        # when run from the scripts folder or repo root.
        self.csv_path = csv_path
        self._tried_paths: List[str] = []
        csv_path_obj = Path(csv_path)
        if not csv_path_obj.is_absolute():
            script_dir = Path(__file__).resolve().parent
            candidates = [
                script_dir / csv_path,        # scripts/<csv>
                script_dir.parent / csv_path, # repo root/<csv>
                Path.cwd() / csv_path         # current working dir
            ]
            found = None
            for c in candidates:
                if c.exists():
                    found = c
                    break
            if found:
                self.csv_path = str(found)
            else:
                self._tried_paths = [str(c) for c in candidates]
        self.df = None
        self.errors: List[str] = []
        self.warnings: List[str] = []
        
    def validate(self) -> Tuple[bool, List[str], List[str]]:
        """
        Main validation method
        Returns: (is_valid, errors, warnings)
        """
        print(f"Validating CSV: {self.csv_path}")
        print("=" * 60)
        
        # Load CSV
        if not self._load_csv():
            return False, self.errors, self.warnings
        
        # Run validations
        self._validate_structure()
        self._validate_content()
        self._validate_conditions()
        self._validate_scoring()
        
        # Print results
        self._print_results()
        
        is_valid = len(self.errors) == 0
        return is_valid, self.errors, self.warnings
    
    def _load_csv(self) -> bool:
        """Load and verify CSV file"""
        print(f"Attempting to load: {self.csv_path}")
        try:
            self.df = pd.read_csv(self.csv_path)
            print(f"✓ CSV loaded successfully")
            print(f"  - Rows: {len(self.df)}")
            print(f"  - Columns: {len(self.df.columns)}")
            return True
        except FileNotFoundError:
            if self._tried_paths:
                self.errors.append(f"File not found: {self.csv_path}. Tried: {', '.join(self._tried_paths)}")
            else:
                self.errors.append(f"File not found: {self.csv_path}")
            return False
        except Exception as e:
            self.errors.append(f"Error loading CSV: {str(e)}")
            return False
    
    def _validate_structure(self):
        """Validate CSV structure"""
        print("\nValidating structure...")
        
        # Check required columns
        missing_cols = set(self.REQUIRED_COLUMNS) - set(self.df.columns)
        if missing_cols:
            self.errors.append(f"Missing required columns: {missing_cols}")
        else:
            print("  ✓ All required columns present")
        
        # Check for extra columns
        extra_cols = set(self.df.columns) - set(self.REQUIRED_COLUMNS)
        if extra_cols:
            self.warnings.append(f"Extra columns found (will be ignored): {extra_cols}")
    
    def _validate_content(self):
        """Validate content of each column"""
        print("\nValidating content...")
        
        # Check for null values
        null_counts = self.df[self.REQUIRED_COLUMNS].isnull().sum()
        if null_counts.any():
            for col, count in null_counts.items():
                if count > 0:
                    self.errors.append(f"Column '{col}' has {count} null values")
        else:
            print("  ✓ No null values found")
        
        # Check question text
        empty_questions = self.df[self.df['Question Text'].str.strip() == '']
        if len(empty_questions) > 0:
            self.errors.append(f"{len(empty_questions)} rows have empty question text")
        
        # Check condition names
        empty_conditions = self.df[self.df['Condition Name'].str.strip() == '']
        if len(empty_conditions) > 0:
            self.errors.append(f"{len(empty_conditions)} rows have empty condition names")
    
    def _validate_conditions(self):
        """Validate condition structure"""
        print("\nValidating conditions...")
        
        conditions = self.df.groupby('Condition Name')
        
        for condition_name, group in conditions:
            question_count = len(group)
            
            if question_count != self.QUESTIONS_PER_CONDITION:
                self.errors.append(
                    f"Condition '{condition_name}' has {question_count} questions "
                    f"(expected {self.QUESTIONS_PER_CONDITION})"
                )
            else:
                print(f"  ✓ {condition_name}: {question_count} questions")
        
        total_conditions = len(conditions)
        print(f"\nTotal conditions: {total_conditions}")
    
    def _validate_scoring(self):
        """Validate scoring columns"""
        print("\nValidating scoring...")
        
        score_columns = [
            'Strongly Agree Score',
            'Agree Score',
            'Neutral Score',
            'Disagree Score',
            'Strongly Disagree Score'
        ]
        
        for col in score_columns:
            # Check data type
            if not pd.api.types.is_numeric_dtype(self.df[col]):
                self.errors.append(f"Column '{col}' contains non-numeric values")
                continue
            
            # Check score range
            invalid_scores = self.df[~self.df[col].isin(self.VALID_SCORES)]
            if len(invalid_scores) > 0:
                self.errors.append(
                    f"Column '{col}' has {len(invalid_scores)} invalid scores "
                    f"(must be {self.VALID_SCORES})"
                )
        
        # Check for potential reverse scoring issues
        self._check_reverse_scoring()
        
        if not self.errors:
            print("  ✓ All scores valid")
    
    def _check_reverse_scoring(self):
        """Check for potential reverse scoring patterns"""
        print("\nChecking reverse scoring patterns...")
        
        # Keywords indicating positive statements
        positive_keywords = [
            'control', 'able to', 'comfortable', 'confident', 'easy',
            'healthy', 'good', 'well', 'positive', 'effectively'
        ]
        
        reverse_scored_count = 0
        
        for idx, row in self.df.iterrows():
            question = row['Question Text'].lower()
            
            # Check if question contains positive keywords
            is_positive = any(keyword in question for keyword in positive_keywords)
            
            # Check scoring pattern
            strongly_agree = row['Strongly Agree Score']
            strongly_disagree = row['Strongly Disagree Score']
            
            if is_positive:
                if strongly_agree > strongly_disagree:
                    self.warnings.append(
                        f"Row {idx + 2}: Positive question may need reverse scoring\n"
                        f"  Question: {row['Question Text'][:60]}...\n"
                        f"  Current: SA={strongly_agree}, SD={strongly_disagree}"
                    )
                else:
                    reverse_scored_count += 1
        
        print(f"  Found {reverse_scored_count} reverse-scored questions")
    
    def _print_results(self):
        """Print validation results"""
        print("\n" + "=" * 60)
        print("VALIDATION RESULTS")
        print("=" * 60)
        
        if self.errors:
            print(f"\n❌ ERRORS ({len(self.errors)}):")
            for i, error in enumerate(self.errors, 1):
                print(f"  {i}. {error}")
        
        if self.warnings:
            print(f"\n⚠️  WARNINGS ({len(self.warnings)}):")
            for i, warning in enumerate(self.warnings, 1):
                print(f"  {i}. {warning}")
        
        if not self.errors and not self.warnings:
            print("\n✅ CSV is valid! Ready to process.")
        elif not self.errors:
            print("\n✅ CSV is valid but has warnings. Review before processing.")
        else:
            print("\n❌ CSV has errors. Please fix before processing.")
        
        print("=" * 60)
    
    def get_summary(self) -> Dict:
        """Get validation summary"""
        if self.df is None:
            return {}
        
        conditions = self.df.groupby('Condition Name').size()
        
        return {
            'total_rows': len(self.df),
            'total_conditions': len(conditions),
            'conditions': dict(conditions),
            'errors': len(self.errors),
            'warnings': len(self.warnings),
            'is_valid': len(self.errors) == 0
        }


def main():
    """Main function"""
    if len(sys.argv) < 2:
        print("Usage: python csv_validator.py <path_to_csv>")
        print("Example: python csv_validator.py test.csv")
        sys.exit(1)
    
    csv_path = sys.argv[1]
    
    validator = CSVValidator(csv_path)
    is_valid, errors, warnings = validator.validate()
    
    # Print summary
    summary = validator.get_summary()
    if summary:
        print("\nSUMMARY:")
        print(f"  Total rows: {summary['total_rows']}")
        print(f"  Conditions: {summary['total_conditions']}")
        print(f"  Errors: {summary['errors']}")
        print(f"  Warnings: {summary['warnings']}")
    
    # Exit with appropriate code
    sys.exit(0 if is_valid else 1)


if __name__ == "__main__":
    main()