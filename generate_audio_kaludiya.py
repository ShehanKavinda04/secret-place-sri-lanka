import os
from gtts import gTTS

text = """The Story of Anuradhapura Kaludiya Pokuna Forest Monastery: From Past to Present

Located on the southern boundary of the Mihintale Chetiyagiri rock complex within the sacred kingdom of Anuradhapura, surrounded by a silent, dense forest, Kaludiya Pokuna stands as a living sanctuary of ancient Sri Lankan forest-monastic discipline and remarkable engineering craftsmanship. Mentioned in the ancient Mahavamsa and early inscriptions as "Kaladighavapi," this sacred ground earned the name "Kaludiya Pokuna" (Black Water Pond) because the shadows of natural rock formations and the dense forest canopy cast dark reflections upon its natural reservoir, making the water appear deep black.

The historical narrative begins in the 3rd century BCE with the arrival of Arahat Mahinda in Sri Lanka. It was initially constructed as a cave hermitage complex—carved with drip ledges into the rock—offered for the meditative lives of Arhats residing around the Mihintale sanctuary. Over time, during the late Anuradhapura period, King Kassapa IV (898–914 CE) restored this hermitage and dedicated it to the Pamsukulika (austere forest-dwelling) monks under the name "Hadasunna." Slab inscriptions further reveal that King Sena IV (950–953 CE) donated villages for the upkeep and daily alms of the monks residing here.

Featuring simple "Padhanaghara" (double-platform) meditation structures devoid of ornate carvings, over 30 caves inscribed with early Brahmi script, and ancient bathing pond technology integrated seamlessly into the natural rock, the site showcases the exceptionally austere spiritual lifestyle of that era.

As the kingdom shifted toward the southwest, this sanctuary lay buried beneath dense jungle for centuries. Today, it stands as a protected reserve under the Department of Forest Conservation and the Department of Archaeology. Within the quiet forest, meditating forest-dwelling monks continue to reside, making Kaludiya Pokuna shine as a profoundly tranquil haven that safeguards its historical monastic heritage in the Rajarata region.
"""

output_path = r"g:\reserch project my\secret-place-sri-lanka\public\audio\kaludiya_pokuna_history.mp3"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
tts = gTTS(text, lang='en')
tts.save(output_path)
print("Audio saved successfully!")
