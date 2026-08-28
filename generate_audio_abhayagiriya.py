import os
import re
import tempfile

from gtts import gTTS


route_path = os.path.join(os.path.dirname(__file__), 'routes', 'web.php')
with open(route_path, encoding='utf-8') as route_file:
    route_source = route_file.read()

match = re.search(
    r"'abhayagiriya'.*?'history_narrative' => <<<'EOD'\n(.*?)\nEOD",
    route_source,
    re.DOTALL,
)
if not match:
    raise RuntimeError('Abhayagiriya narrative not found')

text = re.sub(r'\$([^$]+)\$', r'\1', match.group(1)).replace('\\', '')
output_path = os.path.join(os.path.dirname(__file__), 'public', 'audio', 'abhayagiriya_history.mp3')
paragraphs = [paragraph.strip() for paragraph in text.split('\n\n') if paragraph.strip()]

with tempfile.TemporaryDirectory() as temp_dir:
    chunk_paths = []
    for index, paragraph in enumerate(paragraphs):
        chunk_path = os.path.join(temp_dir, f'chunk_{index}.mp3')
        gTTS(paragraph, lang='en').save(chunk_path)
        chunk_paths.append(chunk_path)

    with open(output_path, 'wb') as output_file:
        for chunk_path in chunk_paths:
            with open(chunk_path, 'rb') as chunk_file:
                output_file.write(chunk_file.read())

print(f'Audio saved to {output_path}')