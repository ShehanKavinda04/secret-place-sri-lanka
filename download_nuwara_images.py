import urllib.request
import re
import os

url = "https://www.google.com/search?q=Nuwara+Wewa+Lakeside+Yoga+%26+Wellness+Experience+Anuradhapura&sca_esv=c7737a8802ed2fd8&udm=2&biw=838&bih=888"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Google images usually stores image URLs in raw HTML under encrypted-tbn0
images = re.findall(r'https://encrypted-tbn0\.gstatic\.com/images\?q=[^\"\'\s]+', html)

# De-duplicate while preserving order
seen = set()
unique_images = []
for img in images:
    if img not in seen:
        seen.add(img)
        unique_images.append(img)

print(f"Found {len(unique_images)} unique images.")

output_dir = r"g:\reserch project my\secret-place-sri-lanka\public\images"
os.makedirs(output_dir, exist_ok=True)

for i, img_url in enumerate(unique_images[:4]):
    filename = f"nuwara_wewa_gallery_{i+1}.jpg"
    filepath = os.path.join(output_dir, filename)
    try:
        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        img_data = urllib.request.urlopen(img_req).read()
        with open(filepath, 'wb') as f:
            f.write(img_data)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
