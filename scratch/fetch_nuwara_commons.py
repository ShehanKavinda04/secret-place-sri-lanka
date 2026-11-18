import urllib.parse
import urllib.request
import json
import os

category = "Category:Nuwara_Wewa"
api_url = f"https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle={urllib.parse.quote(category)}&cmtype=file&cmlimit=20&format=json"

req = urllib.request.Request(api_url, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0 (contact: info@example.com)'})
try:
    resp = urllib.request.urlopen(req).read().decode('utf-8')
    data = json.loads(resp)
    members = data.get('query', {}).get('categorymembers', [])
    print("Found files:", [m['title'] for m in members])

    out_dir = r'g:\reserch project my\secret-place-sri-lanka\public\images'

    for idx, item in enumerate(members):
        title = item['title']
        info_api = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1280&format=json"
        info_req = urllib.request.Request(info_api, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0'})
        info_resp = json.loads(urllib.request.urlopen(info_req).read().decode('utf-8'))
        pages = info_resp.get('query', {}).get('pages', {})
        for pid, pdata in pages.items():
            imginfo = pdata.get('imageinfo', [{}])[0]
            thumburl = imginfo.get('thumburl') or imginfo.get('url')
            if thumburl:
                print(f"Downloading {title} from {thumburl}")
                img_data = urllib.request.urlopen(urllib.request.Request(thumburl, headers={'User-Agent': 'SecretPlacesSriLankaResearchBot/1.0'})).read()
                save_name = f"nuwara_wewa_photo_{idx+1}.jpg"
                with open(os.path.join(out_dir, save_name), 'wb') as out_f:
                    out_f.write(img_data)
                print(f"Saved {save_name} ({len(img_data)} bytes)")
except Exception as e:
    print("Error:", e)
