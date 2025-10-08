"""
Fix CSV scores and duplicate condition entries, then validate.
Generates `test.fixed.csv` next to the original and runs csv_validator.py on it.
"""
import sys
from pathlib import Path
import pandas as pd
import subprocess

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = Path(__file__).resolve().parent
# Look for test.csv in scripts/ and repo root
candidate_paths = [
    SCRIPTS / 'test.csv',
    SCRIPTS.parent / 'test.csv'
]
INPUT = None
for p in candidate_paths:
    if p.exists():
        INPUT = p
        break
if INPUT is None:
    # default to scripts/test.csv (will error later)
    INPUT = SCRIPTS / 'test.csv'
OUTPUT = SCRIPTS / 'test.fixed.csv'

SCORE_MAP = {10:5, 8:4, 6:3, 4:2, 2:1}
SCORE_COLS = [
    'Strongly Agree Score',
    'Agree Score',
    'Neutral Score',
    'Disagree Score',
    'Strongly Disagree Score'
]

print(f"Reading: {INPUT}")
if not INPUT.exists():
    print(f"Input file not found: {INPUT}")
    sys.exit(2)

# Read CSV
df = pd.read_csv(INPUT)

# Normalize scores: map known 10/8/6/4/2 pattern to 5..1; keep values already in 1-5
for col in SCORE_COLS:
    def map_val(v):
        try:
            iv = int(v)
        except Exception:
            return v
        if iv in SCORE_MAP:
            return SCORE_MAP[iv]
        if 1 <= iv <= 5:
            return iv
        # fallback: scale from 1..10 to 1..5
        mapped = max(1, min(5, int(round(iv / 10 * 5))))
        return mapped
    df[col] = df[col].apply(map_val)

# Trim each condition to first 10 rows to enforce QUESTIONS_PER_CONDITION
out_rows = []
for cond, group in df.groupby('Condition Name', sort=False):
    kept = group.head(10)
    out_rows.append(kept)

fixed_df = pd.concat(out_rows, ignore_index=True)

# Save fixed CSV
fixed_df.to_csv(OUTPUT, index=False)
print(f"Wrote fixed CSV: {OUTPUT}")

# Run validator on fixed CSV
print("\nRunning validator on fixed CSV...\n")
res = subprocess.run([sys.executable, str(SCRIPTS / 'csv_validator.py'), str(OUTPUT)], cwd=str(SCRIPTS))
sys.exit(res.returncode)
