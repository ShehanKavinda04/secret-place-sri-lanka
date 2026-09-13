# encoding: utf-8
import json
import re

with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

print("Starting comprehensive translation for all remaining spots...")
