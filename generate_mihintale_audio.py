from gtts import gTTS

narrative = """
Mihintale, a mountain peak near Anuradhapura, holds profound spiritual significance as the cradle of Buddhism in Sri Lanka. It was here in the 3rd century BCE that the Indian monk Mahinda, son of Emperor Ashoka, met King Devanampiyatissa and delivered the first Buddhist teachings on the island. Ascending the ancient granite stairway in the pre-dawn hours offers a deeply meditative experience, tracing the footsteps of countless pilgrims over millennia.

As the sun begins its ascent, casting golden hues over the vast plains and ancient stupas below, the morning chant of monks echoes through the misty air. The tranquil environment at the peak, particularly around the Ambasthala Dagoba where the historic meeting took place, naturally encourages a state of inner peace and mindfulness. The cool morning breeze and the panoramic views of the surrounding forests and reservoirs provide a perfect setting for reflection and meditation.

The Mihintale Sunrise Meditation experience is designed to align your mind with the awakening rhythms of nature. Guided by experienced practitioners, participants engage in mindfulness of breathing and loving-kindness meditation while overlooking the sacred city. This practice not only rejuvenates the spirit but also connects you deeply with the historical and spiritual heritage of Sri Lanka's oldest monastic city.
"""

tts = gTTS(text=narrative, lang='en', slow=False)
output_path = r"g:\reserch project my\secret-place-sri-lanka\public\audio\mihintale_sunrise_history.mp3"
tts.save(output_path)
print(f"Successfully generated {output_path}")
