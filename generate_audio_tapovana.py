import os
from gtts import gTTS

text = """The Story of Anuradhapura Tapovana Forest Monastery: From Past to Present

Located near the sacred land of Mihintale, as well as the Ruwanwelisaya and the Jaya Sri Maha Bodhi, the sanctuary dense with foliage continues to offer solace to monks seeking silence and spiritual well-being. This is none other than the Anuradhapura Tapovana Forest Monastery, a remarkably serene and sacred retreat established within the holy land of Anuradhapura to preserve the traditional forest-dwelling monastic discipline.

The historical concept of this monastery traces back to the noble spiritual lifestyle of the Pamsukulika—the austere forest-dwelling monks who resided along the western boundaries of the Anuradhapura Kingdom between the 8th and 10th centuries. Breathing new life into this incomparable heritage in the modern era, the foundation stone of the Anuradhapura Tapovana Forest Monastery was laid under the guidance of the Sri Kalyani Dharmashrama Samstha, founded under the leadership of the Most Venerable Kahapola Sumangala Nayaka Thero and the Most Venerable Matara Sri Nyanarama Maha Nayaka Thero of the Sri Lanka Ramanya Maha Nikaya.

Stepping away from the village temple culture and the noisy urban environment, practicing asceticism in the forest became the primary lifestyle of the resident monks. Within these grounds, which feature small meditation huts (Kuti) surrounded by dense trees, walking meditation paths (Cankamana), and tranquil Bodhi platforms, the monks scrupulously preserve the disciplined forest monastic tradition—even going on alms rounds (Pindapata) with bowl in hand, just as in ancient Sri Lanka.

Over time, this hermitage did not remain exclusive to the resident monks; it also became a spiritual haven for thousands of local and foreign devotees visiting the Atamasthana in Anuradhapura. By bringing peace to restless minds through daily Satipatthana meditation programs, Dhamma discussions, and Poya day observance retreats, the Anuradhapura Tapovana Forest Monastery continues to shine today as a quiet spiritual beacon in the Rajarata region.
"""

output_path = r"g:\reserch project my\secret-place-sri-lanka\public\audio\tapovana_history.mp3"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
tts = gTTS(text, lang='en')
tts.save(output_path)
print("Audio saved successfully!")
