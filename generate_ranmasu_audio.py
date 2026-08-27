from gtts import gTTS
import os

narrative = """
Located below the bund of Tissa Wewa in the sacred city of Anuradhapura, near the Isurumuniya Temple, Ranmasu Uyana is a unique royal garden where ancient Sri Lankan royal luxury and breathtaking water engineering seamlessly intertwined. Originating in the 3rd century BCE and magnificently developed during the 8th to 10th centuries CE (especially under the reign of King Sena IV/Mahinda IV), this sanctuary was reserved for the leisure and bathing of the kings and royal family members of Anuradhapura. Ancient slab inscriptions testify that the garden earned the name "Ranmasu Uyana" (Goldfish Park) due to the golden fish that swam in the waters flowing among its natural rocks and stone pavilions.

The royal bathing ponds carved out of stone and the intricate water circulation system found here showcase the pride of ancient Sinhala engineering. Water flowing from Tissa Wewa first passed through the garden's bathing pools, stone channels, and artificial waterfalls before being directed to irrigate the royal paddy fields without any waste. Furthermore, it was within this sacred and picturesque land that Prince Saliya met Asokamala and shared their romance, and where the unique "Sakwala Chakraya" (Stargate / Starmap)—which still astounds the world today—is carved onto a rock face.

Nurtured for centuries under the historical shadow of the Anuradhapura Kingdom, this royal garden became an attractive retreat for seekers of nature and spiritual peace in the modern era. Taking advantage of this serene environment filled with massive natural boulders, shade-giving trees, and ancient ruins, the modern "Ranmasu Uyana Mindfulness Walk" (Walking Meditation) experience was introduced.

By walking slowly through this historical garden during the morning and evening, taking in the beauty of the natural woodland and the cool breeze, weary minds and bodies worn down by the noisy modern world receive an unparalleled spiritual refresh. Ranmasu Uyana stands today as a beautiful, living spiritual bridge connecting the historic royal pride of Anuradhapura with modern healthy mental wellness practices.
"""

tts = gTTS(text=narrative, lang='en', slow=False)
output_path = r"g:\reserch project my\secret-place-sri-lanka\public\audio\ranmasu_uyana_history.mp3"
tts.save(output_path)
print(f"Successfully generated {output_path}")
