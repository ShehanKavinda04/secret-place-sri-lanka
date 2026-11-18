import urllib.parse
import urllib.request
import json
import os

titles = [
    "File:Nuwara Wewa.jpg",
    "File:Nuwara Wewa Lake Anuradhapura.jpg",
    "File:IMG nuwara wawa.jpg",
    "File:Sri Lanka Tank.jpg",
    "File:Nuwara Wewa Lake Anuradhapura - Sri Lanka (8281461334).jpg"
]

out_dir = r'g:\reserch project my\secret-place-sri-lanka\public\images'

for idx, title in enumerate(titles):
    info_api = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json"
    req = urllib.request.Request(info_api, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0 (contact: info@example.com)'})
    try:
        resp = urllib.request.urlopen(req).read().decode('utf-8')
        pages = json.loads(resp).get('query', {}).get('pages', {})
        for pid, pdata in pages.items():
            imginfo = pdata.get('imageinfo', [{}])[0]
            thumburl = imginfo.get('thumburl') or imginfo.get('url')
            if thumburl:
                print(f"Downloading {title} from {thumburl}")
                img_data = urllib.request.urlopen(urllib.request.Request(thumburl, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0'})).read()
                save_name = f"nuwara_wewa_direct_{idx+1}.jpg"
                with open(os.path.join(out_dir, save_name), 'wb') as out_f:
                    out_f.write(img_data)
                print(f"Saved {save_name} ({len(img_data)} bytes)")
    except Exception as e:
        print(f"Error {title}: {e}")
