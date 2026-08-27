from gtts import gTTS
import os

narrative = """
Ranmasu Uyana, also known as the Royal Goldfish Park, is an ancient pleasure garden located in the sacred city of Anuradhapura. 
Spanning approximately 40 acres, this beautifully designed park dates back to the 3rd century BCE, during the reign of King Tissa. 
It served as a serene retreat for the royals, masterfully integrating nature, water management, and stunning rock carvings.

The garden features intricate bathing pavilions built among massive boulders, fed by the waters of the Tissa Wewa reservoir. 
However, what truly captivates visitors today is the mysterious Sakwala Chakraya, often referred to as the 'Stargate'. 
Carved into a rock face, this enigmatic circular diagram is believed by some to be an ancient map of the universe, or perhaps a meditation tool used by monks in later centuries.

Walking through Ranmasu Uyana today, one can almost hear the echoes of royal laughter and feel the deep, contemplative silence that later settled over the ruins. 
The park stands as a testament to the advanced hydraulic engineering, artistic brilliance, and the seamless blend of luxury and spirituality in ancient Sri Lanka.
"""

tts = gTTS(text=narrative, lang='en', slow=False)
output_path = r"g:\reserch project my\secret-place-sri-lanka\public\audio\ranmasu_uyana_history.mp3"
tts.save(output_path)
print(f"Successfully generated {output_path}")
