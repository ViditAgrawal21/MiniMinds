This folder contains the CSV processing and translation merge scripts used to keep the app's question database
and translations in sync with a master CSV (`test.csv`).

Files and purpose

- csv_processor.py
  - Reads `test.csv` and produces structured outputs in `scripts/output/`:
    - `translations.json` (translation keys/strings for `scanIntro` and `scanQuestions`)
    - `question_structure.json` (intermediate structure)
    - `scan_data.json` (per-scan metadata)
  - This is the main generator that converts the spreadsheet into runtime data.

- merge_translations.py
  - Merges `scripts/output/translations.json` into the app English locale file:
    `src/i18n/locales/en/translation.json`.
  - It overwrites the `scanIntro` and `scanQuestions` blocks and creates a backup
    `translation.json.bak` the first time it runs.

- assign_categories.py
  - Annotates `src/data/questionDatabase.json` by adding a `category` string per condition
    using a keyword-based mapping (Family / Education / Peer to Peer Interaction / Other).

- watch_and_apply.py
  - Orchestrator that runs the pipeline:
      1) csv_processor.py
      2) merge_translations.py
      3) assign_categories.py
  - Can be run once (`--once`) or started as a watcher that re-runs when `test.csv` changes.

- csv_validator.py
  - Validates CSV format and content (structure, row counts per condition, scoring columns,
    and simple reverse-scoring heuristics). Exits with non-zero code on validation errors.

- csv_fix_and_validate.py
  - Convenience helper: normalizes scores and duplicates, writes `test.fixed.csv` and runs
    `csv_validator.py` against the fixed file. The `test.fixed.csv` produced by this script
    was a generated artifact and has been removed from the repo (it can be re-created by
    running this script if needed).

Removed files / artifacts

- test.fixed.csv
  - This file was a generated artifact produced by `csv_fix_and_validate.py` and is not a
    source file. It has been removed from the `scripts/` folder to keep the repo clean.

How to use

1) Run once and exit (from repo root):

   python .\scripts\watch_and_apply.py --once

2) Run the watcher (re-runs when `test.csv` changes):

   python .\scripts\watch_and_apply.py

3) If you want to just validate a CSV without processing:

   python .\scripts\csv_validator.py test.csv

Notes and recommendations

- The merge script creates a backup of the locale file on first run: `translation.json.bak`.
  Review that backup if you need to revert any generated translations.

- Avoid editing the generated JSON files in `scripts/output/` manually. Instead update
  `test.csv` and re-run the pipeline so translations and the question DB remain consistent.

- The scripts were written to be cross-platform (Windows / macOS / Linux). Some console
  output was adjusted to avoid non-ASCII characters on Windows.

- If you want me to also remove any other script not referenced by the codebase, tell me
  which script(s) you want removed and I'll delete them and update this README accordingly.
