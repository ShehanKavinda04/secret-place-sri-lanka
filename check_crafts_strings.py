import re
import json

with open('resources/js/Data/craftsDatabase.js', 'r', encoding='utf-8') as f:
    crafts_content = f.read()

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    trans_content = f.read()

strings_to_check = set()

for m in re.finditer(r'(title|desc|label|subtitle|description):\s*[\'"`](.*?)[\'"`]', crafts_content):
    strings_to_check.add(m.group(2))

for m in re.finditer(r'features:\s*\[(.*?)\]', crafts_content, re.DOTALL):
    feats = re.findall(r'[\'"`](.*?)[\'"`]', m.group(1))
    for feat in feats:
        strings_to_check.add(feat)

print(f"Total crafts strings extracted: {len(strings_to_check)}")

si_missing = [s for s in sorted(strings_to_check) if f'"{s}"' not in trans_content and f"'{s}'" not in trans_content]
print(f"Missing strings count: {len(si_missing)}")
for s in si_missing:
    print(f" - {repr(s)}")
