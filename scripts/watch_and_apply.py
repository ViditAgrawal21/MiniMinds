"""
Watch test.csv and automatically run the CSV generator + merge steps so the app's runtime data
(stored in src/data/questionDatabase.json and src/i18n/locales/en/translation.json)
stays in sync with the CSV.

Usage:
  # Run once and exit
  python .\thought-pro\scripts\watch_and_apply.py --once

  # Start watching (runs generator on startup and whenever test.csv changes)
  python .\thought-pro\scripts\watch_and_apply.py

Notes:
- This script calls the repo's existing generator scripts:
  - scripts/csv_processor.py  (produces scripts/output/translations.json and question_structure.json)
  - scripts/merge_translations.py (merges translations.json into src/i18n/locales/en/translation.json)
  - scripts/assign_categories.py (adds category field into src/data/questionDatabase.json)

- After this script updates files, Metro/React Native should detect JSON changes and hot-reload the app.
  If it doesn't, restart Metro or the app.

- Run this from the repo root (the script resolves paths relative to its location).
"""

import subprocess
import time
from pathlib import Path
import argparse
import sys

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_DIR = ROOT / 'scripts'
CSV_FILE = ROOT / 'test.csv'
CSV_PROCESSOR = SCRIPTS_DIR / 'csv_processor.py'
MERGE_SCRIPT = SCRIPTS_DIR / 'merge_translations.py'
ASSIGN_SCRIPT = SCRIPTS_DIR / 'assign_categories.py'
OUTPUT_DIR = SCRIPTS_DIR / 'output'


def run_command(cmd, cwd=None):
    print(f"Running: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, cwd=cwd, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print("Command failed:")
        print(e.stdout)
        return False


def apply_once():
    if not CSV_FILE.exists():
        print(f"CSV file not found at {CSV_FILE}")
        return False

    # Step 1: run csv_processor.py (it writes to scripts/output)
    cmd1 = f"python \"{CSV_PROCESSOR}\""
    print("1) Running CSV processor...")
    if not run_command(cmd1, cwd=str(SCRIPTS_DIR)):
        print("CSV processor failed")
        return False

    # Step 2: run merge_translations.py to merge translations into locale file
    if MERGE_SCRIPT.exists():
        cmd2 = f"python \"{MERGE_SCRIPT}\""
        print("2) Merging generated translations into locale file...")
        if not run_command(cmd2, cwd=str(ROOT)):
            print("Merge translations failed")
            return False
    else:
        print("Merge script not found; skipping merge step.")

    # Step 3: assign categories into questionDatabase.json
    if ASSIGN_SCRIPT.exists():
        cmd3 = f"python \"{ASSIGN_SCRIPT}\""
        print("3) Annotating categories in questionDatabase.json...")
        if not run_command(cmd3, cwd=str(ROOT)):
            print("Assign categories failed")
            return False
    else:
        print("Assign categories script not found; skipping category annotation.")

    print("All done. Updated questionDatabase.json and translations.")
    print("If Metro/React Native doesn't hot-reload, restart Metro or the app to pick up changes.")
    return True


def watch_loop(poll_interval=2.0):
    last_mtime = None
    if not CSV_FILE.exists():
        print(f"CSV file not found at {CSV_FILE}. Waiting...")
    else:
        last_mtime = CSV_FILE.stat().st_mtime
    print("Starting watch loop. Press Ctrl+C to stop.")
    try:
        while True:
            if CSV_FILE.exists():
                mtime = CSV_FILE.stat().st_mtime
                if last_mtime is None or mtime != last_mtime:
                    print(f"Change detected in {CSV_FILE} — running update...")
                    ok = apply_once()
                    if ok:
                        last_mtime = CSV_FILE.stat().st_mtime
                # else: no change
            time.sleep(poll_interval)
    except KeyboardInterrupt:
        print("Watcher stopped by user")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--once', action='store_true', help='Run once and exit')
    args = parser.parse_args()

    if args.once:
        success = apply_once()
        sys.exit(0 if success else 2)
    else:
        # Run once at startup to ensure initial state
        apply_once()
        watch_loop()


if __name__ == '__main__':
    main()
