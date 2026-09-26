import os
import re

transport_dir = 'resources/js/Pages/Transport-components'
files = [os.path.join(transport_dir, f) for f in os.listdir(transport_dir) if f.endswith('.jsx')]
files.append('resources/js/Pages/Transport.jsx')

all_strings = set()
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    jsx_texts = re.findall(r'>([^<>{}\n]+)<', content)
    for t in jsx_texts:
        t_clean = t.strip()
        if t_clean and re.search(r'[a-zA-Z]{2,}', t_clean):
            all_strings.add(t_clean)

print("Found", len(all_strings), "strings across Transport files:")
for s in sorted(list(all_strings)):
    print(" -", repr(s))
