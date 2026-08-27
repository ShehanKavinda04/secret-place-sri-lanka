import urllib.request
import os

urls = [
    ("https://picsum.photos/seed/mihintale1/800/600", "public/images/mihintale_sunrise_gallery_1.jpg"),
    ("https://picsum.photos/seed/mihintale11/800/600", "public/images/mihintale_sunrise_gallery_2.jpg"),
    ("https://picsum.photos/seed/mihintale12/800/600", "public/images/mihintale_sunrise_gallery_3.jpg"),
    ("https://picsum.photos/seed/mihintale13/800/600", "public/images/mihintale_sunrise_gallery_4.jpg")
]

req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for url, dest in urls:
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            data = response.read()
            with open(dest, 'wb') as out_file:
                out_file.write(data)
        print(f"Downloaded {dest}")
    except Exception as e:
        print(f"Failed {dest}: {e}")
