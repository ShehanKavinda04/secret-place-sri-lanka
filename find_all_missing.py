import json

with open('scratch_extracted_spots.json', 'r', encoding='utf-8') as f:
    spots = json.load(f)

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    trans_code = f.read()

missing_by_spot = {}

for sid, s in spots.items():
    bp = s['blueprint']
    hn = s['narrative']
    missing_by_spot[sid] = {'bp': False, 'hn_lines': []}
    
    if bp:
        if json.dumps(bp, ensure_ascii=False) not in trans_code and bp not in trans_code:
            missing_by_spot[sid]['bp'] = bp
            
    if hn:
        paragraphs = [p.strip() for p in hn.split('\n\n') if p.strip()]
        for p in paragraphs:
            for l in p.split('\n'):
                l = l.strip()
                if l and json.dumps(l, ensure_ascii=False) not in trans_code and l not in trans_code:
                    missing_by_spot[sid]['hn_lines'].append(l)

total_missing_lines = sum(len(v['hn_lines']) for v in missing_by_spot.values())
total_missing_bp = sum(1 for v in missing_by_spot.values() if v['bp'])
print(f"Total missing blueprints: {total_missing_bp}, Total missing narrative lines: {total_missing_lines}")

for sid, v in missing_by_spot.items():
    if v['bp'] or v['hn_lines']:
        print(f"Spot: {sid:<30} | Missing BP: {bool(v['bp'])} | Missing HN lines: {len(v['hn_lines'])}")

with open('scratch_all_missing.json', 'w', encoding='utf-8') as f:
    json.dump(missing_by_spot, f, ensure_ascii=False, indent=2)
