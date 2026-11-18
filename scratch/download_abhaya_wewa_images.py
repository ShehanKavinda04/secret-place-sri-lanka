import urllib.request
import re
import os

query = 'Abhaya+Wewa+Basawakkulama+reservoir+Anuradhapura'
url = f'https://www.google.com/search?q={query}&udm=2'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
images = re.findall(r'https://encrypted-tbn0\.gstatic\.com/images\?q=[^\"\'\s]+', html)

seen = set()
unique = []
for img in images:
    if img not in seen:
        seen.add(img)
        unique.append(img)

print(f"Found {len(unique)} images.")

output_dir = 'public/images'
for i, img_url in enumerate(unique[:4]):
    filename = f"abhaya_wewa_gallery_{i+1}.jpg"
    filepath = os.path.join(output_dir, filename)
    try:
        r = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(r).read()
        with open(filepath, 'wb') as f:
            f.write(data)
        print(f"Saved: {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error {filename}: {e}")
