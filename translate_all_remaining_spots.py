# encoding: utf-8
import json
import re

with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

# Let's inspect all missing lines
all_missing_lines = []
for sid, data in missing_data.items():
    for l in data.get('hn_lines', []):
        all_missing_lines.append((sid, l))

print(f"Total missing lines to process: {len(all_missing_lines)}")

# Let's write a translation generator that translates each line with context
