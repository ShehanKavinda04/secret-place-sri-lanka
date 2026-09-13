import json

with open('scratch_extracted_spots.json', 'r', encoding='utf-8') as f:
    spots = json.load(f)

for sid, s in spots.items():
    bp = s['blueprint']
    hn = s['narrative']
    print(f"\n==================== SPOT: {sid} ====================")
    if bp:
        print(f"[BLUEPRINT]\n{bp[:120]}...\n")
    if hn:
        lines = [l.strip() for l in hn.split('\n') if l.strip()]
        print(f"[NARRATIVE LINES: {len(lines)}]")
        for idx, l in enumerate(lines[:5]):
            print(f"  {idx+1}: {l[:80]}")
        if len(lines) > 5:
            print(f"  ... and {len(lines)-5} more lines")

