import urllib.parse
import urllib.request
import json
import os

search_api = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=Nuwara+Wewa+Anuradhapura&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json"

req = urllib.request.Request(search_api, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0 (contact: info@example.com)'})
try:
    resp = urllib.request.urlopen(req).read().decode('utf-8')
    data = json.loads(resp)
    pages = data.get('query', {}).get('pages', {})
    print("Found count:", len(pages))

    out_dir = r'g:\reserch project my\secret-place-sri-lanka\public\images'
    saved = 0
    for pid, pdata in pages.items():
        title = pdata.get('title', '')
        print("Checking:", title)
        imginfo = pdata.get('imageinfo', [{}])[0]
        thumburl = imginfo.get('thumburl') or imginfo.get('url')
        if thumburl:
            saved += 1
            save_name = f"nuwara_wewa_raw_{saved}.jpg"
            img_data = urllib.request.urlopen(urllib.request.Request(thumburl, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0'})).read()
            with open(os.path.join(out_dir, save_name), 'wb') as out_f:
                out_f.write(img_data)
            print(f"Saved {save_name} from {title} ({len(img_data)} bytes)")
except Exception as e:
    print("Error:", e)
