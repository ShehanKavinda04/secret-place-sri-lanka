import gtts
import sys
import os

text = """The Story of Nuwara Wewa Lakeside Yoga & Wellness Experience: From Ancient Heritage to Modern Spiritual Well-being

Spanning across thousands of acres along the eastern boundary of the sacred city of Anuradhapura, the giant Nuwara Wewa is not merely another marvel of ancient irrigation technology. Believed to have been constructed by King Vattagamani Abhaya (Walagamba) in the 1st century BCE, this historical reservoir has sustained the paddy fields of the Rajarata region while bestowing an unwavering sense of tranquility upon the entire city since antiquity.

Nurtured for centuries under the shadow of the Ruwanwelisaya and the sacred breezes blowing from the Jaya Sri Maha Bodhi, this lakeside became a captivating retreat for local and foreign travelers in the modern era who deeply seek nature and spiritual serenity. Although not an ancient religious shrine, the "Lakeside Yoga & Mindfulness" experience was born out of this pure natural calm, taking advantage of the quiet environment surrounded by the cool foliage of the Nuwara Wewa bank.

Whether as the morning sunbeams fall upon the water surface of Nuwara Wewa or as the sun sets against the backdrop of the quiet forest in the evening, the minds of wellness seekers resting on the lakeside are enveloped in a deep spiritual focus. Through breathing exercises, yoga postures (asanas), and meditation techniques practiced amidst the cool breeze blowing off Nuwara Wewa, weary minds and bodies worn out by the noisy modern world find unmatched rejuvenation.

Though this experience is neither an ancient archaeological ruin nor a temple, it continues to shine on the banks of Nuwara Wewa as a beautiful, living spiritual bridge connecting the historic soil of the Anuradhapura Kingdom, the gentle ripples of the lake, and modern healthy wellness practices."""

tts = gtts.gTTS(text, lang='en')
tts.save('g:/reserch project my/secret-place-sri-lanka/public/audio/nuwara_wewa_history.mp3')
print("Audio saved successfully")
