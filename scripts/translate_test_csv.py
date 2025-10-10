#!/usr/bin/env python3
"""
Translate test.csv questions into Hindi and Marathi and merge into
src/i18n/locales/hi/translation.json and src/i18n/locales/mr/translation.json

Usage:
  python scripts/translate_test_csv.py

The script expects a Google Cloud service account JSON to be available via
the environment variable GOOGLE_APPLICATION_CREDENTIALS or placed in the
repo root with the default filename used below.
"""
import csv
import json
import os
import re
import time
from collections import defaultdict
from typing import Dict, List

try:
    from google.cloud import translate_v2 as translate
except Exception:
    translate = None


DEFAULT_CREDENTIALS = "booking-system-468212-8c4638c345f3.json"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TEST_CSV = os.path.join(ROOT, "test.csv")
LOCALE_PATH = os.path.join(ROOT, "src", "i18n", "locales")


def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "_", s)
    s = re.sub(r"_+", "_", s)
    return s.strip("_")


def read_test_csv(path: str) -> Dict[str, List[str]]:
    groups = defaultdict(list)
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        headers = next(reader, None)
        # Expect first column: Condition Name, second column: Question Text
        for row in reader:
            if not row:
                continue
            condition = row[0].strip()
            question = row[1].strip() if len(row) > 1 else ""
            if condition and question:
                groups[condition].append(question)
    return groups


def translate_texts(client, texts: List[str], target_lang: str) -> List[str]:
    if not client:
        raise RuntimeError("google.cloud.translate library not available")

    # translate supports lists; we'll batch and sleep between calls to be polite
    results = []
    batch_size = 50
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        resp = client.translate(batch, target_language=target_lang)
        # resp can be a list of dicts when input is list
        if isinstance(resp, list):
            for r in resp:
                results.append(r.get("translatedText", ""))
        else:
            results.append(resp.get("translatedText", ""))
        time.sleep(0.2)
    return results


def load_json(path: str) -> dict:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    return {}


def save_json(path: str, data: dict):
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)


def merge_translations_into_locale(locale_file: str, translations: Dict[str, dict]):
    data = load_json(locale_file)
    if "scanQuestions" not in data or not isinstance(data["scanQuestions"], dict):
        data["scanQuestions"] = {}

    for slug, payload in translations.items():
        # payload: { 'condition': original_name, 'title': translated_condition, 'questions': [..] }
        data["scanQuestions"][slug] = payload

    save_json(locale_file, data)


def main():
    csv_path = TEST_CSV
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found. Place test.csv in the repo root.")
        return

    if not translate:
        print("google-cloud-translate package not available. Install it with:\n  pip install google-cloud-translate")
        return

    # Ensure credentials
    if not os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"):
        cred_path = os.path.join(ROOT, DEFAULT_CREDENTIALS)
        if os.path.exists(cred_path):
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
            print(f"Using credentials from {cred_path}")
        else:
            print("No GOOGLE_APPLICATION_CREDENTIALS set and default credential file not found.")
            print("Set GOOGLE_APPLICATION_CREDENTIALS or place the service account JSON in the repo root.")
            return

    client = translate.Client()

    groups = read_test_csv(csv_path)
    print(f"Found {len(groups)} conditions in {csv_path}")

    # Load question database keys so we can map CSV condition names to the
    # canonical condition keys used by the app
    qdb_path = os.path.join(ROOT, "src", "data", "questionDatabase.json")
    qdb = {}
    if os.path.exists(qdb_path):
        with open(qdb_path, "r", encoding="utf-8") as fh:
            try:
                qdb = json.load(fh)
            except Exception:
                qdb = {}

    condition_keys = list(qdb.get("conditions", {}).keys()) if isinstance(qdb, dict) else []

    def normalize_for_match(s: str) -> str:
        return re.sub(r"[^a-z0-9]", "", s.lower().strip().replace(" ", ""))

    # Build lookup of normalized -> canonical key
    normalized_map = {normalize_for_match(k): k for k in condition_keys}

    # Build translations per language
    for lang_code, locale in [("hi", "hi"), ("mr", "mr")]:
        print(f"Translating to {lang_code}...")
        translations_for_locale = {}
        for condition, questions in groups.items():
            # Attempt to map CSV condition name to canonical key from questionDatabase
            norm = normalize_for_match(condition)
            canonical = normalized_map.get(norm) or condition

            # slug that the app expects: camelCase of canonical key
            slug = slugify(canonical).replace("_", "")

            # Translate condition title (use canonical as fallback display)
            try:
                trans_title = translate_texts(client, [canonical], lang_code)[0]
            except Exception as e:
                print(f"Failed translating title '{canonical}': {e}")
                trans_title = canonical

            try:
                trans_questions = translate_texts(client, questions, lang_code)
            except Exception as e:
                print(f"Failed translating questions for '{canonical}': {e}")
                trans_questions = questions

            translations_for_locale[slug] = {
                "condition": canonical,
                "title": trans_title,
                "questions": trans_questions,
            }

        # Also create scanIntro style entries (title + overview) so screens
        # that read `scanIntro.<slug>.title` get translated labels.
        intro_translations = {}
        for slug, payload in translations_for_locale.items():
            condition = payload["condition"]
            # Build a simple overview sentence and translate it
            default_overview = f"This assessment helps evaluate {condition.lower()}."
            try:
                trans_overview = translate_texts(client, [default_overview], lang_code)[0]
            except Exception as e:
                print(f"Failed translating overview for '{condition}': {e}")
                trans_overview = default_overview

            intro_translations[slug] = {
                "title": payload["title"],
                "overview": trans_overview,
            }

        locale_file = os.path.join(LOCALE_PATH, lang_code, "translation.json")
        if not os.path.exists(locale_file):
            print(f"Locale file {locale_file} not found; creating a new one")
            save_json(locale_file, {})

        print(f"Merging {len(translations_for_locale)} conditions into {locale_file}")
        # Merge both scanQuestions and scanIntro payloads
        merge_translations_into_locale(locale_file, translations_for_locale)

        # Add scanIntro entries
        data = load_json(locale_file)
        if "scanIntro" not in data or not isinstance(data["scanIntro"], dict):
            data["scanIntro"] = {}

        for slug, intro_payload in intro_translations.items():
            data["scanIntro"][slug] = intro_payload

        save_json(locale_file, data)

    print("All done. Remember to restart Metro bundler with --reset-cache to pick up the updated JSON files.")


if __name__ == "__main__":
    main()
