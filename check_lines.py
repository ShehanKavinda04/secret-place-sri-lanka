import json
import re

with open('scratch_extracted_spots.json', 'r', encoding='utf-8') as f:
    spots = json.load(f)

abhaya = spots['abhayagiriya']
hn = abhaya['narrative']
bp = abhaya['blueprint']

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    trans_code = f.read()

# Let's extract SI dict and TA dict by matching JSON blocks or python-safe parsing
# Or load through a small node script
print("Blueprint len:", len(bp))
print("Narrative len:", len(hn))

paragraphs = [p.strip() for p in hn.split('\n\n') if p.strip()]
print(f"Paragraphs count: {len(paragraphs)}")
for idx, p in enumerate(paragraphs):
    lines = [l.strip() for l in p.split('\n') if l.strip()]
    for lidx, l in enumerate(lines):
        in_code = json.dumps(l, ensure_ascii=False) in trans_code
        if not in_code:
            print(f"MISSING [P{idx+1} L{lidx+1}]: {repr(l)}")
        else:
            print(f"OK [P{idx+1} L{lidx+1}]: {repr(l[:40])}")
