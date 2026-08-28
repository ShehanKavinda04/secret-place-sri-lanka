import os
import re

from gtts import gTTS


route_path = os.path.join(os.path.dirname(__file__), 'routes', 'web.php')
with open(route_path, encoding='utf-8') as route_file:
    route_source = route_file.read()

match = re.search(
    r"'ruwanweli'.*?'history_narrative' => <<<'EOD'\n(.*?)\nEOD",
    route_source,
    re.DOTALL,
)
if not match:
    raise RuntimeError('Ruwanwelisaya narrative not found')

text = re.sub(r'\$([^$]+)\$', r'\1', match.group(1)).replace('\\', '')
output_path = os.path.join(os.path.dirname(__file__), 'public', 'audio', 'ruwanweli_history.mp3')
gTTS(text, lang='en').save(output_path)
print(f'Audio saved to {output_path}')