# encoding: utf-8
import json
import re

# Load missing data
with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

# Load existing translations
with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("Building translation dictionaries...")
