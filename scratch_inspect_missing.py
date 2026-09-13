import json

with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing = json.load(f)

print("Spots with missing items:")
for sid, v in missing.items():
    if v['bp'] or v['hn_lines']:
        print(f"=== {sid} ===")
        if v['bp']:
            print(f"  BP ({len(v['bp'])} chars): {v['bp'][:80]}...")
        if v['hn_lines']:
            print(f"  HN lines ({len(v['hn_lines'])}):")
            for i, l in enumerate(v['hn_lines'][:3]):
                print(f"    {i+1}: {l[:70]}...")
            if len(v['hn_lines']) > 3:
                print(f"    ... and {len(v['hn_lines'])-3} more lines")

