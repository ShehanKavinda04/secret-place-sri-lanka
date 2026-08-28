import os

from gtts import gTTS


text = (
    'The Sri Maha Bodhi Malu Vihara is a temple complex surrounding the sacred '
    'Mahamewna Gardens and the outer terraces of the Jaya Sri Maha Bodhi. It has '
    'been a site of continuous Buddhist worship, chanting, and meditation for '
    'over two millennia, serving as a sanctuary for pilgrims visiting the sacred tree.'
)
output_path = os.path.join(os.path.dirname(__file__), 'public', 'audio', 'srimahabodhi_malu_history.mp3')
gTTS(text, lang='en').save(output_path)
print(f'Audio saved to {output_path}')