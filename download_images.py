import requests
from bs4 import BeautifulSoup
import os

url = "https://www.google.com/search?q=Mahamevnawa+Meditation+Centre+anuradapura&tbm=isch"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

images = soup.find_all('img')
image_urls = []

for img in images:
    src = img.get('src')
    if src and src.startswith('http') and 'images/branding' not in src and 'googlelogo' not in src and 'favicon' not in src:
        image_urls.append(src)
        if len(image_urls) == 4:
            break

output_dir = r"g:\reserch project my\secret-place-sri-lanka\public\images"
os.makedirs(output_dir, exist_ok=True)

downloaded = []
for i, img_url in enumerate(image_urls):
    filename = f"mahamevnawa_gallery_{i+1}.jpg"
    filepath = os.path.join(output_dir, filename)
    try:
        img_data = requests.get(img_url, timeout=5).content
        with open(filepath, 'wb') as handler:
            handler.write(img_data)
        downloaded.append(f"/images/{filename}")
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")

print("Downloaded images:", downloaded)
