import json
import re

with open('scratch_extracted_spots.json', 'r', encoding='utf-8') as f:
    spots = json.load(f)

# Let's collect all lines that need translation
lines_by_spot = {}
for sid, s in spots.items():
    hn = s.get('narrative')
    bp = s.get('blueprint')
    lines_by_spot[sid] = {
        'bp': bp,
        'lines': []
    }
    if hn:
        paragraphs = [p.strip() for p in hn.split('\n\n') if p.strip()]
        for p in paragraphs:
            for l in p.split('\n'):
                l = l.strip()
                if l:
                    lines_by_spot[sid]['lines'].append(l)

print(f"Collected lines for {len(lines_by_spot)} spots.")
with open('scratch_lines_by_spot.json', 'w', encoding='utf-8') as f:
    json.dump(lines_by_spot, f, ensure_ascii=False, indent=2)
