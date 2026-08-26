import os
from gtts import gTTS

text = """The Story of Mahamevnawa Buddhist Monastery: From Past to Present

Born on July 1, 1961, the young child entered the order of monkhood on March 26, 1979, at the Seruwila Mangala Raja Maha Viharaya as Venerable Kiribathgoda Gnanananda Thero. Although he was admitted to the University of Sri Jayewardenepura to pursue a Bachelor of Arts degree, a different aspiration arose in his mind while studying the original Buddhist teachings in the Tipitaka. Setting his degree aside, he stepped away from university education and engaged in extensive meditation and Dhamma study in forest hermitages and regions across the Himalayas.
After years of spiritual quest, on August 14, 1999, the foundation stone for the Mahamevnawa Buddhist Monastery was laid on a small piece of land in Wadanawa, Polgahawela.
The primary insight he gained was that ordinary people found it difficult to understand the Dhamma preserved in the complex Pali language. Accordingly, the Sutta Pitaka, Dhammapada, and major Paritta texts were translated into simple, accessible Sinhala. Along with this, a cultural practice of greeting one another with "Namo Buddhaya" was reintroduced into society.
Over time, this small hermitage evolved into a massive monastic network. Registered under the Amarapura Sri Kalyaniwansa Nikaya of the Sri Lanka Amarapura Maha Nikaya, the institution expanded to over 80 monasteries across Sri Lanka and more than 45 overseas branches in countries including the United States, the United Kingdom, Australia, Canada, and Germany. Nearly 1,000 monks and a large number of Dasa Sil Mathas dedicated themselves to the Sambuddha Sasana within the monasteries. The spread of the Dhamma accelerated globally with the establishment of "Shraddha TV" and "Shraddha Radio" in 2012.
However, alongside this rapid transformation, various discussions and debate arose within society and among traditional Buddhist clergy.
While many acknowledged that translating the Tipitaka into plain language was a tremendous catalyst for bringing laypeople closer to the Dhamma, some traditional scholar-monks expressed concern that certain profound concepts found in the Pali commentaries (Atthakatha) lost their original meaning during the simplification process. Additionally, practices differing from traditional temple culture, along with training monks within the monasteries rather than through traditional monastic colleges (Pirivenas), became subjects of public discourse.
Nevertheless, by leveraging modern technology, plain language, and an organized structural framework, the Mahamevnawa Buddhist Monastery has undeniably etched its place in history as an institution that sparked one of the largest Buddhist revivals of the 21st century."""

tts = gTTS(text, lang='en')
output_path = r'g:\reserch project my\secret-place-sri-lanka\public\audio\mahamevnawa_history.mp3'

# Ensure the directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

tts.save(output_path)
print(f"Audio saved to {output_path}")
