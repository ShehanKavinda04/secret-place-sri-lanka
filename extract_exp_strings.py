import re
import json

with open('resources/js/Pages/ExperienceDetail.jsx', 'r', encoding='utf-8') as f:
    exp_content = f.read()

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    trans_content = f.read()

strings_to_check = set()

# extract experienceDetails values
for m in re.finditer(r'(title|subtitle|overview|desc|location|duration|groupSize|hostName):\s*[\'"`](.*?)[\'"`]', exp_content):
    strings_to_check.add(m.group(2))

# print all
print(f"Total extracted strings: {len(strings_to_check)}")
for s in sorted(strings_to_check):
    print(f" - {repr(s)}")
