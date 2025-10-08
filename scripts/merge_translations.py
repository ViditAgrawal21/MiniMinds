import json
from pathlib import Path

repo_root = Path(__file__).resolve().parents[1]
locale_path = repo_root / "src" / "i18n" / "locales" / "en" / "translation.json"
generated_path = repo_root / "scripts" / "output" / "translations.json"
backup_path = locale_path.with_suffix('.json.bak')

print(f"Locale: {locale_path}")
print(f"Generated: {generated_path}")

if not locale_path.exists():
    raise SystemExit(f"Locale file not found: {locale_path}")
if not generated_path.exists():
    raise SystemExit(f"Generated translations not found: {generated_path}")

# Load files
with locale_path.open('r', encoding='utf-8') as f:
    locale = json.load(f)
with generated_path.open('r', encoding='utf-8') as f:
    generated = json.load(f)

# Backup
if not backup_path.exists():
    backup_path.write_text(locale_path.read_text(encoding='utf-8'), encoding='utf-8')
    print(f"Backup written to: {backup_path}")
else:
    print(f"Backup already exists at: {backup_path}")

# Merge policy: overwrite scanIntro and scanQuestions with generated blocks
merged = dict(locale)  # shallow copy
if 'scanIntro' in generated:
    merged['scanIntro'] = generated['scanIntro']
    print(f"scanIntro merged: {len(generated['scanIntro'])} entries")
else:
    print("No scanIntro in generated file; leaving existing")

if 'scanQuestions' in generated:
    merged['scanQuestions'] = generated['scanQuestions']
    print(f"scanQuestions merged: {len(generated['scanQuestions'])} entries")
else:
    print("No scanQuestions in generated file; leaving existing")

# Write back
locale_path.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding='utf-8')
print("Merged translation.json written.")
