# encoding: utf-8
import json
import re

# Let's write the exact 8 missing lines with all byte variants
thupa_8_si = {
    'One day, amid the tranquil surroundings of the Mahamevnawa Park, King Devanampiyatissa paid his respects before Arahat Mahinda and expressed the noble aspiration of his heart:':
    'දිනක් මහමෙවුනා උයනේ නිස්කලංක පරිසරය මැදදී, දේවානම්පියතිස්ස රජතුමා මිහිඳු මහ රහතන් වහන්සේට නමස්කාර කර තම හදවතේ පැවති උතුම් ප්‍රාර්ථනාව මෙසේ ප්‍රකාශ කළේය:',

    '"Venerable Sir, through your compassion, we have now received the Sublime Dhamma of the Blessed One. The venerable Maha Sangha resides here. Sacred grounds like the beautiful Mahamevnawa Park belong to the Buddha Sasana. Yet, Venerable Sir, this land still lacks a great stupa enshrining the sacred bodily relics (Sarvagna Dhatu) of the Buddha, which we could worship and gaze upon as if the Buddha were alive before our very eyes. A powerful desire burns in my heart to build a stupa for the Buddha. Please guide us toward this path!"':
    '"ස්වාමීනී, ඔබ වහන්සේගේ කරුණාවෙන් අපට භාග්‍යවතුන් වහන්සේගේ උතුම් ශ්‍රී සද්ධර්මය ලැබිණි. මහා සංඝරත්නය මෙහි වැඩවසති. රමණීය මහමෙවුනා උයන බුද්ධ ශාසනයට අයත් විය. එහෙත් ස්වාමීනී, බුදුරජාණන් වහන්සේ දෑස් ඉදිරිපිට ජීවමානව වැඩසිටින්නාක් මෙන් දැක වැඳපුදා ගැනීමට බුදුරදුන්ගේ සර්වඥ ශාරීරික ධාතූන් වහන්සේලා තැන්පත් කළ මහා සෑයක් තවමත් මෙම පින්බිමෙහි නැත. බුදුරදුන් උදෙසා සෑයක් ඉදිකිරීමේ දැඩි ආශාවක් මාගේ හදවතේ පවතී. ඒ සඳහා අපට මඟ පෙන්වන සේක්වා!"',

    'Hearing the King’s faith-filled words, Arahat Mahinda was overjoyed. He looked at the King and spoke in a calm, composed voice:':
    'රජුගේ ශ්‍රද්ධා සම්පන්න වදන් ඇසූ මිහිඳු මහ රහතන් වහන්සේ මහත් සතුටට පත්ව, රජු දෙස බලා සන්සුන් ස්වරයෙන් මෙසේ වදාළහ:',

    'Hearing the King\'s faith-filled words, Arahat Mahinda was overjoyed. He looked at the King and spoke in a calm, composed voice:':
    'රජුගේ ශ්‍රද්ධා සම්පන්න වදන් ඇසූ මිහිඳු මහ රහතන් වහන්සේ මහත් සතුටට පත්ව, රජු දෙස බලා සන්සුන් ස්වරයෙන් මෙසේ වදාළහ:',

    '"Great King, your aspiration is truly noble. To look upon a sacred relic of the Tathagata is akin to seeing the living Buddha Himself. Although we do not possess the relics at this very moment, we can obtain the sacred relics of the Buddha for the island of Lanka by reaching out to Emperor Dharmashoka of Jambudvipa and Sakra, the King of Gods in the celestial realm. Great King, prepare the ground for the stupa immediately."':
    '"මහාරාජ, ඔබගේ ප්‍රාර්ථනාව සැබවින්ම උතුම්ය. තථාගතයන් වහන්සේගේ ධාතූන් වහන්සේ දැකීම ජීවමාන බුදුරදුන් දැකීම හා සමානය. මේ මොහොතේ අප සතුව ධාතූන් වහන්සේලා නොමැති වුවද, දඹදිව ධර්මාශෝක රජුගෙන් සහ දෙව්ලොව සක්දෙවිඳුන්ගෙන් අපට ලක්දිව පිණිස සර්වඥ ධාතූන් වහන්සේලා ලබාගත හැක. මහාරාජ, වහාම සෑය සඳහා භූමිය සූදානම් කරන්න."',

    'Overjoyed to hear about the flourishing of the Sasana in Lanka, Emperor Ashoka immediately took the sacred Alms Bowl used by the Buddha—which was filled with fragrant flowers—placed a vast collection of sacred bodily relics inside it, and offered it to the novice monk with deep devotion.':
    'ලක්දිව ශාසනය බැබළෙන පුවත අසා මහත් ප්‍රමෝදයට පත් අශෝක රජතුමා, සුවඳ මලින් පිරුණු බුදුරදුන්ගේ පාත්‍ර ධාතුව තුළ සර්වඥ ධාතූන් වහන්සේලා තැන්පත් කර මහත් ශ්‍රද්ධාවෙන් සාමණේරයන් වහන්සේට පූජා කළේය.',

    'Holding the world’s most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.':
    'ලොව උතුම්ම වස්තුව දෝතින් ගත් සුමන සාමණේරයෝ අහසින් වැඩම කර අනුරාධපුර මිහින්තලා සෑගිරි පව්ව මතට පහත් වූහ. මිහිඳු මහ රහතන් වහන්සේ ඇතුළු මහා සංඝරත්නය මහත් සාදුකාර මධ්‍යයේ සර්වඥ ධාතූන් වහන්සේලා පිළිගත්හ.',

    'Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephant’s back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.':
    'එම ස්ථානයට පැමිණි ඇතු, බටහිර දෙසට හැරී කළුගල් පර්වතයක් මෙන් නිශ්චලව සිටියේය. රජු ධාතු කරඬුව බිමට ගැනීමට උත්සාහ කළද ඇතු ඊට ඉඩ නොදුන්නේය.',

    'Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephant’s mind, Arahat Mahinda explained:':
    'විමතියට පත් රජතුමා මේ පිළිබඳව මිහිඳු මහ රහතන් වහන්සේගෙන් විමසීය. ඇතුගේ සිත දත් මිහිඳු හිමියෝ මෙසේ පැහැදිලි කළහ:'
}

thupa_8_ta = {
    'One day, amid the tranquil surroundings of the Mahamevnawa Park, King Devanampiyatissa paid his respects before Arahat Mahinda and expressed the noble aspiration of his heart:':
    'ஒரு நாள் மகாமேவ்னா பூங்காவில் தேவநம்பியதிஸ்ஸ மன்னர் மகிந்த தேரரிடம் தனது விருப்பத்தைத் தெரிவித்தார்:',

    '"Venerable Sir, through your compassion, we have now received the Sublime Dhamma of the Blessed One. The venerable Maha Sangha resides here. Sacred grounds like the beautiful Mahamevnawa Park belong to the Buddha Sasana. Yet, Venerable Sir, this land still lacks a great stupa enshrining the sacred bodily relics (Sarvagna Dhatu) of the Buddha, which we could worship and gaze upon as if the Buddha were alive before our very eyes. A powerful desire burns in my heart to build a stupa for the Buddha. Please guide us toward this path!"':
    '"குருவே, தம்மம் பரவியுள்ளது, ஆனால் புத்தரின் புனித உடற்பொருட்களைக் கொண்ட தூபி இன்னும் இல்லை. அதை அமைத்து வழிபட வழிகாட்டுங்கள்!"',

    'Hearing the King’s faith-filled words, Arahat Mahinda was overjoyed. He looked at the King and spoke in a calm, composed voice:':
    'மன்னரின் பக்தியைக் கண்ட மகிந்த தேரர் மகிழ்ச்சியுடன் கூறினார்:',

    'Hearing the King\'s faith-filled words, Arahat Mahinda was overjoyed. He looked at the King and spoke in a calm, composed voice:':
    'மன்னரின் பக்தியைக் கண்ட மகிந்த தேரர் மகிழ்ச்சியுடன் கூறினார்:',

    '"Great King, your aspiration is truly noble. To look upon a sacred relic of the Tathagata is akin to seeing the living Buddha Himself. Although we do not possess the relics at this very moment, we can obtain the sacred relics of the Buddha for the island of Lanka by reaching out to Emperor Dharmashoka of Jambudvipa and Sakra, the King of Gods in the celestial realm. Great King, prepare the ground for the stupa immediately."':
    '"மன்னரே, உமது எண்ணம் உன்னதமானது. அசோகரிடமிருந்தும் இந்திரனிடமிருந்தும் நாம் திருப்பண்டங்களைப் பெறுவோம். தூபிக்கான இடத்தை உடனே தயார் செய்யுங்கள்."',

    'Overjoyed to hear about the flourishing of the Sasana in Lanka, Emperor Ashoka immediately took the sacred Alms Bowl used by the Buddha—which was filled with fragrant flowers—placed a vast collection of sacred bodily relics inside it, and offered it to the novice monk with deep devotion.':
    'அசோக மன்னர் திருவோட்டில் பல திருப்பண்டங்களை வைத்து பக்தியுடன் கொடுத்தார்.',

    'Holding the world’s most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.':
    'சுமன சாமனேரர் திருப்பண்டங்களுடன் மிஹிந்தலைக்குத் திரும்பினார்.',

    'Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephant’s back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.':
    'அங்கு சென்ற யானை மேற்கு நோக்கி அசையாமல் நின்றது. பேழையைக் கீழே இறக்க விடவில்லை.',

    'Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephant’s mind, Arahat Mahinda explained:':
    'இதன் காரணத்தை மகிந்த தேரர் மன்னரிடம் விளக்கினார்:'
}

# Also handle raw bytes / raw strings directly from scratch_all_missing.json
with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing = json.load(f)

for raw_l in missing['thuparamaya']['hn_lines']:
    for k, v in list(thupa_8_si.items()):
        # normalize quotes
        clean_k = k.replace('’', "'").replace('—', '-').replace('“', '"').replace('”', '"')
        clean_raw = raw_l.replace('’', "'").replace('—', '-').replace('“', '"').replace('”', '"').replace('\ufffd', "'")
        if clean_k == clean_raw or clean_k in clean_raw or clean_raw in clean_k:
            thupa_8_si[raw_l] = v
            if k in thupa_8_ta:
                thupa_8_ta[raw_l] = thupa_8_ta[k]

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in thupa_8_si.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in thupa_8_ta.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected all Thuparamaya lines with exact encoding matching!")
