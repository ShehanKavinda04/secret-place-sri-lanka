import re
import urllib.parse
import urllib.request
import json
import os

with open(r'C:\Users\Shehan Kavinda\.gemini\antigravity-ide\brain\7d523653-24fe-44f4-80b9-2cbc513ccb9b\.system_generated\steps\309\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

files = set(re.findall(r'File:([a-zA-Z0-9_\-\. ]+\.jpg)', text, re.IGNORECASE))
print('Found image files:', files)

out_dir = r'g:\reserch project my\secret-place-sri-lanka\public\images'

# Fetch direct URLs from Wikimedia Commons API
for idx, fn in enumerate(sorted(list(files))):
    title = f"File:{fn}"
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json"
    req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req).read().decode('utf-8')
        data = json.loads(resp)
        pages = data.get('query', {}).get('pages', {})
        for pid, pdata in pages.items():
            imginfo = pdata.get('imageinfo', [{}])[0]
            thumburl = imginfo.get('thumburl') or imginfo.get('url')
            if thumburl:
                print(f"Downloading {fn} from {thumburl}")
                img_data = urllib.request.urlopen(urllib.request.Request(thumburl, headers={'User-Agent': 'Mozilla/5.0'})).read()
                save_name = f"abhaya_wewa_gallery_{idx+1}.jpg"
                with open(os.path.join(out_dir, save_name), 'wb') as out_f:
                    out_f.write(img_data)
                print(f"Saved {save_name} ({len(img_data)} bytes)")
    except Exception as e:
        print(f"Error fetching {fn}: {e}")
