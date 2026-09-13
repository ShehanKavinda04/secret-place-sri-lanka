# encoding: utf-8
import json
import re

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Load translation dictionaries from populate_abhayagiriya.py
import populate_abhayagiriya

si_additions = populate_abhayagiriya.si_translations
ta_additions = populate_abhayagiriya.ta_translations

# Find SI and TA insertion points
# In translations.js:
# export const translations = {
#     EN: {},
#     SI: {
#         ...
#     },
#     TA: {
#         ...
#     },
# };

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

# Prepare formatted strings to insert
si_str = ""
for k, v in si_additions.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in ta_additions.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

# Insert at the beginning of SI: {
if si_insert_marker in content:
    content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)

# Insert at the beginning of TA: {
if ta_insert_marker in content:
    content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated translations.js successfully!")
