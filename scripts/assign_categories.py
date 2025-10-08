import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
qdb_path = root / 'src' / 'data' / 'questionDatabase.json'
backup_path = qdb_path.with_suffix('.json.bak')

with open(qdb_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if not backup_path.exists():
    with open(backup_path, 'w', encoding='utf-8') as bf:
        json.dump(data, bf, ensure_ascii=False, indent=2)
    print(f'Backup written to: {backup_path}')
else:
    print(f'Backup already exists at: {backup_path}')

# Keyword-based category mapping
family_keys = ['family', 'parent', 'parenting', 'children', 'child', 'bonding', 'mother', 'father', 'dad', 'mom']
education_keys = ['school', 'academic', 'exam', 'study', 'teacher', 'class', 'bully', 'bullying', 'bunk', 'attendance', 'exam stress', 'exam']
peer_keys = ['friend', 'friendship', 'dating', 'breakup', 'peer', 'relationship', 'fomo', 'gaming', 'internet', 'social', 'darkweb', 'onlyfans', 'abusive', 'conduct', 'violent', 'aggressive']

conditions = data.get('conditions', {})
updated = 0
for key in list(conditions.keys()):
    low = key.lower()
    assigned = None

    # family has highest priority
    if any(k in low for k in family_keys):
        assigned = 'Family Bonding'
    elif any(k in low for k in education_keys):
        assigned = 'Education'
    elif any(k in low for k in peer_keys):
        assigned = 'Peer to Peer Interaction'
    else:
        assigned = 'Other'

    if conditions[key].get('category') != assigned:
        conditions[key]['category'] = assigned
        updated += 1

with open(qdb_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Assigned categories for {updated} conditions. Wrote updated questionDatabase.json')
