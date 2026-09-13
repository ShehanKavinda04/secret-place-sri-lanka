# -*- coding: utf-8 -*-
import json

extra_SI = {
    "Discover a world of unique, decorative items, cooking pots, lamps, and more. A heritage of artistry in every piece, crafted from the rich red laterite clay of the dry zone.": "වියළි කලාපයේ රතු මැටි උපයෝගී කරගනිමින් නිපදවන ලද අනර්ඝ සැරසිලි භාණ්ඩ, මුට්ටි, පහන් සහ තවත් බොහෝ දේ. සෑම නිර්මාණයකම හෙළ කලා උරුමය රැඳී ඇත.",
    "Durable cotton": "කල්පවතින කපු",
    "Experience the art of authentic handloom weaving and natural dyeing techniques.": "ස්වභාවික සායම් සහ සාම්ප්‍රදායික අත්යන්ත්‍ර රෙදි විවීමේ කලාව අත්විඳින්න.",
    "Experience the magical process of transforming raw lotus stems into exquisite fabric.": "අමු නෙළුම් දඬු මනරම් සේද රෙදි බවට පත්කිරීමේ ආශ්චර්යමත් ක්‍රියාවලිය අත්විඳින්න.",
    "Experience the magical process of transforming raw lotus stems into exquisite fabric. Understand how this unique eco-friendly enterprise provides vital income.": "අමු නෙළුම් දඬු මනරම් රෙදි බවට පත් කිරීමේ ක්‍රියාවලිය අත්විඳිමින්, මෙම පරිසර හිතකාමී ව්‍යවසායයෙන් ප්‍රජාවට ලැබෙන ආදායම පිළිබඳ අවබෝධයක් ලබාගන්න.",
    "Granite": "කළුගල්",
    "Learn the ancient techniques of wheel-throwing and hand-building from hereditary potters. Shape your own terracotta souvenirs.": "පාරම්පරික මැටි ශිල්පීන්ගෙන් සකපෝරුව භාවිතය සහ අතින් මැටි භාණ්ඩ තැනීමේ පුරාණ ක්‍රම ඉගෙන ගන්න. ඔබේම මැටි සිහිවටනයක් නිර්මාණය කරගන්න.",
    "Local handloom cooperatives supporting female artisans who weave vibrant cotton fabrics.": "විචිත්‍රවත් කපු රෙදි වියන කාන්තා ශිල්පිනියන් සවිබල ගන්වන ප්‍රාදේශීය අත්යන්ත්‍ර සමුපකාර.",
    "Lotus Silk Farm Visit": "නෙළුම් සේද ගොවිපල චාරිකාව",
    "Master stonemasons recreate the glory of ancient Anuradhapura.": "ප්‍රවීණ ගල් වඩුවන් පැරණි අනුරාධපුරයේ කලා මහිමය යළි මතු කරති.",
    "Pan Weaving Masterclass": "පන් විවීමේ ප්‍රවීණතා පන්තිය",
    "Sit alongside local weavers near the ancient reservoirs to learn the delicate art of processing and braiding natural reeds into colourful mats.": "පැරණි වැව් ආසන්නයේ දේශීය වියන්නියන් සමඟ හිඳිමින් ස්වභාවික පන් සකස් කර වර්ණවත් පැදුරු විවීමේ සියුම් කලාව ඉගෙන ගන්න.",
    "Skilled carpenters shape locally sourced timber into stunning architectural elements.": "දක්ෂ වඩු ශිල්පීන් දේශීය දැව යොදාගනිමින් විශිෂ්ට වාස්තු විද්‍යාත්මක අංග නිමවති.",
    "Walk through heritage villages and participate in traditional clay-pot culinary experiences.": "පාරම්පරික ගම්මාන හරහා ඇවිද යමින් වලංවල පිසින දේශීය ආහාර පිසීමේ අත්දැකීමට එක්වන්න.",
    "Watch mesmerising demonstrations of granite carving, learning about the ancient tools and sheer patience required.": "පුරාණ ආයුධ සහ ඉවසීම උපයෝගී කරගනිමින් කරන කළුගල් කැටයම්වල සිත් ඇදගන්නාසුළු ප්‍රදර්ශන නරඹන්න.",
    "An innovative, highly sustainable MSME craft where artisans extract delicate micro-fibres from the lotus stems gathered from Anuradhapura’s ancient lakes to weave rare, luxurious textiles.": "අනුරාධපුරයේ පැරණි වැව්වලින් නෙළාගන්නා නෙළුම් දඬුවලින් ලබාගන්නා සියුම් නූල් භාවිතයෙන් අතිශය දුර්ලභ, සුඛෝපභෝගී රෙදිපිළි වියන තිරසාර ක්ෂුද්‍ර කර්මාන්තයකි."
}

extra_TA = {
    "Discover a world of unique, decorative items, cooking pots, lamps, and more. A heritage of artistry in every piece, crafted from the rich red laterite clay of the dry zone.": "உலர்ந்த வலயத்தின் செம்மண்ணால் செய்யப்பட்ட தனித்துவமான அலங்காரப் பொருட்கள், சமையல் பானைகள், விளக்குகள் ஆகியவற்றைக் கண்டறியுங்கள்.",
    "Durable cotton": "நீடித்த பருத்தி",
    "Experience the art of authentic handloom weaving and natural dyeing techniques.": "இயற்கை சாயமிடுதல் மற்றும் பாரம்பரிய கைத்தறி நெசவு கலையை அனுபவியுங்கள்.",
    "Experience the magical process of transforming raw lotus stems into exquisite fabric.": "தாமரை தண்டுகளை நேர்த்தியான துணியாக மாற்றும் மாயாஜால செயல்முறையை அனுபவியுங்கள்.",
    "Experience the magical process of transforming raw lotus stems into exquisite fabric. Understand how this unique eco-friendly enterprise provides vital income.": "தாமரை தண்டுகளை நேர்த்தியான துணியாக மாற்றும் செயல்முறையை அனுபவித்து, இந்த சூழல் நட்பு தொழில் எவ்வாறு வாழ்வாதாரத்தை வழங்குகிறது என்பதைப் புரிந்து கொள்ளுங்கள்.",
    "Granite": "கருங்கல்",
    "Learn the ancient techniques of wheel-throwing and hand-building from hereditary potters. Shape your own terracotta souvenirs.": "பாரம்பரிய குயவர்களிடமிருந்து சக்கர மண்பாண்ட நுட்பங்களைக் கற்றுக்கொண்டு உங்கள் சொந்த நினைவுப் பொருட்களை உருவாக்குங்கள்.",
    "Local handloom cooperatives supporting female artisans who weave vibrant cotton fabrics.": "துடிப்பான பருத்தி ஆடைகளை நெய்யும் பெண் கைவினைஞர்களை ஆதரிக்கும் உள்ளூர் கைத்தறி கூட்டுறவுகள்.",
    "Lotus Silk Farm Visit": "தாமரை பட்டு பண்ணை வருகை",
    "Master stonemasons recreate the glory of ancient Anuradhapura.": "முன்னணி சிற்பிகள் பண்டைய அனுராதபுரத்தின் பெருமையை மீண்டும் உருவாக்குகிறார்கள்.",
    "Pan Weaving Masterclass": "நாணல் பாய் நெசவு முன்னணி வகுப்பு",
    "Sit alongside local weavers near the ancient reservoirs to learn the delicate art of processing and braiding natural reeds into colourful mats.": "பண்டைய நீர்த்தேக்கங்களுக்கு அருகில் உள்ளூர் நெசவாளர்களுடன் அமர்ந்து வண்ணமயமான பாய்களை நெய்யும் கலையைக் கற்றுக்கொள்ளுங்கள்.",
    "Skilled carpenters shape locally sourced timber into stunning architectural elements.": "திறமையான தச்சர்கள் உள்ளூர் மரத்தைப் பயன்படுத்தி பிரமிக்க வைக்கும் கட்டிடக்கலை கூறுகளை உருவாக்குகிறார்கள்.",
    "Walk through heritage villages and participate in traditional clay-pot culinary experiences.": "பாரம்பரிய கிராமங்கள் வழியே சென்று பாரம்பரிய மண்பானை சமையல் அனுபவங்களில் பங்கேற்கவும்.",
    "Watch mesmerising demonstrations of granite carving, learning about the ancient tools and sheer patience required.": "பண்டைய கருவிகள் மற்றும் பொறுமையுடன் செய்யப்படும் கருங்கல் செதுக்கல் செயல்விளக்கங்களைக் காணுங்கள்.",
    "An innovative, highly sustainable MSME craft where artisans extract delicate micro-fibres from the lotus stems gathered from Anuradhapura’s ancient lakes to weave rare, luxurious textiles.": "அனுராதபுர ஏரிகளில் இருந்து சேகரிக்கப்படும் தாமரை தண்டுகளில் இருந்து நுண்ணிய இழைகளை பிரித்தெடுத்து அரிய ஆடைகளை நெய்யும் சுற்றுச்சூழல் கைவினைத்தொழில்."
}

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    code = f.read()

si_entries_str = ",\n".join([f'        {json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}' for k, v in extra_SI.items()])
ta_entries_str = ",\n".join([f'        {json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}' for k, v in extra_TA.items()])

si_split = code.split("    },\n    TA: {")
if len(si_split) == 2:
    new_code = si_split[0] + ",\n" + si_entries_str + "\n    },\n    TA: {" + si_split[1]
    ta_split = new_code.rsplit("    }\n};", 1)
    if len(ta_split) == 2:
        final_code = ta_split[0] + ",\n" + ta_entries_str + "\n    }\n};" + ta_split[1]
        with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
            f.write(final_code)
        print("Successfully added remaining extra craft translations!")
