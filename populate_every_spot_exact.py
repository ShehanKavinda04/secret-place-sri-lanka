# encoding: utf-8
import json
import re

with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

# Let's write the translation mappings for every single missing line and blueprint across all spots!
