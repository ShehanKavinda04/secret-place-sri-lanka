# encoding: utf-8
import json
import re

topics_si = {
    "The oldest historically documented tree in the world, serving as the living heartbeat of Sri Lankan Buddhism.":
    "ලෝකයේ පැරණිතම ඓතිහාසික වශයෙන් සනාථ වූ ජීවමාන වෘක්ෂය වන අතර, ශ්‍රී ලාංකීය බුදුසමයේ හදවත බඳු වේ.",

    "A magnificent, awe-inspiring ancient stupa housing sacred relics, standing as a grand marvel of engineering and devotion.":
    "සර්වඥ ධාතූන් වහන්සේලා තැන්පත් කර ඇති, ඉංජිනේරු ශිල්පයේ සහ අසීමිත ශ්‍රද්ධාවේ මහා ආශ්චර්යයක් බඳු පූජනීය මහා ස්තූපය.",

    "An ancient stupa built by King Vattagamani Abhaya, surrounded by beautiful monolithic stone pillars and ruins.":
    "වට්ටගාමිණී අභය රජු විසින් ඉදිකරන ලද, අලංකාර ඒකශෛලීය ගල් කණු සහ නටබුන්වලින් වටවූ ඓතිහාසික ස්තූපය.",

    "A massive monastic complex and ancient center of Buddhist scholarship, featuring a towering, majestic brick stupa.":
    "අහස උසට විහිදුණු මහා ගඩොල් ස්තූපයකින් සමන්විත, පුරාණ බෞද්ධ ශාස්ත්‍රාලෝකයේ කේන්ද්‍රස්ථානයක් වූ මහා ආරණ්‍ය සේනාසනය.",

    "Once the tallest stupa in the ancient world, representing an unparalleled masterpiece of ancient Sri Lankan architecture.":
    "පුරාණ ලෝකයේ උසම ස්තූපය වූ, පුරාණ ශ්‍රී ලංකා වාස්තු විද්‍යාවේ අසමසම විශිෂ්ටතම නිර්මාණය.",

    "Built by King Dutugemunu after leaving his scepter containing Buddha relics, a symbol of profound devotion.":
    "ධාතූන් වහන්සේලා තැන්පත් කළ ජය කුන්තය අභියස දුටුගැමුණු රජු විසින් ඉදිකරන ලද අසමසම ශ්‍රද්ධාවේ සංකේතය.",

    "The Brazen Palace, an ancient multistoried building with hundreds of stone pillars, once a grand monastery.":
    "ගල් කණු සිය ගණනකින් සමන්විත, අතීතයේ මහා සංඝරත්නය වැඩසිටි නව මහල් ලෝවාමහාප්‍රාසාදය.",

    "The magnificent ruins of the Brazen Palace, standing as a testament to the grand monastic life of ancient times.":
    "පුරාණ යුගයේ උතුම් සංඝ ශ්‍රී විභූතිය කියාපාන ලෝවාමහාප්‍රාසාදයේ විශිෂ්ට නටබුන්.",

    "A beautiful rock temple famous for its exquisite ancient stone carvings, including the renowned Isurumuniya Lovers.":
    "ප්‍රකට ඉසුරුමුණි පෙම්යුවල ඇතුළු විශිෂ්ට ගල් කැටයම් කලාවෙන් සුප්‍රසිද්ධ සුන්දර ගල් විහාරය.",

    "An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.":
    "ස්වභාවික ගල් ලෙන් සහ නිස්කලංක පරිසරය මැද භාවනායෝගී භික්ෂූන් වහන්සේලා වැඩසිටි පැරණි ආරණ්‍ය සේනාසනය.",

    "A serene temple complex surrounding the sacred Bodhi tree, offering a profoundly peaceful environment for reflection.":
    "පූජනීය බෝධීන් වහන්සේ වටා පිහිටි, ආධ්‍යාත්මික සුවය සලසන නිස්කලංක පූජා භූමිය.",

    "The sacred mountain peak where Buddhism was introduced to Sri Lanka, featuring ancient steps and panoramic views.":
    "ශ්‍රී ලංකාවට බුදුදහම හඳුන්වා දුන්, ඓතිහාසික පියගැටපෙළ සහ මනරම් පරිසරයකින් යුත් පූජනීය කඳු මුදුන.",

    "A welcoming meditation center close to the sacred city, providing comfortable facilities and expert guidance for beginners exploring mindfulness and breath meditation.":
    "සතිමත්භාවය සහ ආනාපානසති භාවනාව පුහුණු වන සැමට මඟපෙන්වීම ලබාදෙන පූජනීය නගරය අසල පිහිටි භාවනා මධ්‍යස්ථානය.",

    "A serene monastery offering guided meditation and Dhamma teachings in English and Sinhala, ideal for seekers looking to learn traditional Theravada practices.":
    "සම්ප්‍රදායික ථේරවාද බුදුදහම සහ භාවනා පුහුණුව ලබාදෙන නිස්කලංක ධර්ම මධ්‍යස්ථානය.",

    "Authentic Ayurvedic treatments and wellness therapies offered in a serene, traditional setting, focusing on holistic healing and rejuvenation.":
    "සාම්ප්‍රදායික ආයුර්වේද ප්‍රතිකාර සහ සුවතා සත්කාර සලසන උතුරු මැද පළාත් ආයුර්වේද රෝහල.",

    "A serene and historic meditation hermitage perched on a rocky outcrop, offering panoramic views and spiritual tranquility.":
    "මනරම් පරිසරයක ගල් පර්වතයක් මුදුනේ පිහිටි, ආධ්‍යාත්මික ශාන්තිය සලසන ඓතිහාසික ඉසින්බැස්සගල භාවනා ආරණ්‍යය.",

    "A remarkably serene and sacred retreat established within the holy land of Anuradhapura to preserve the traditional forest-dwelling monastic discipline.":
    "සාම්ප්‍රදායික ආරණ්‍යවාසී භික්ෂු ප්‍රතිපදාව ආරක්ෂා කරන අනුරාධපුර පින්බිමේ පිහිටි නිස්කලංක තපෝවනය.",

    "A living sanctuary of ancient Sri Lankan forest-monastic discipline and remarkable engineering craftsmanship.":
    "පුරාණ ශ්‍රී ලාංකීය ආරණ්‍යවාසී විනය සම්ප්‍රදාය සහ විශිෂ්ට නිර්මාණ ශිල්පය සුරකින කළුදිය පොකුණ ආරණ්‍ය සේනාසනය.",

    "Nuwara Wewa Lakeside Yoga & Wellness Experience": "නුවර වැව ඉවුරේ යෝග සහ සුවතා අත්දැකීම",
    "Ranmasu Uyana Mindfulness Walk": "රන්මසු උයන මනෝවිවේක චාරිකාව",
    "Mihintale Sunrise Meditation": "මිහින්තලේ හිරු උදාව භාවනා අත්දැකීම",
    "Ritigala Ancient Forest Bathing": "රිටිගල පුරාණ වන සුවතා අත්දැකීම",
    "Sacred Bodhi Contemplation": "පූජනීය බෝධි මෙනෙහි කිරීමේ අත්දැකීම"
}

topics_ta = {
    "The oldest historically documented tree in the world, serving as the living heartbeat of Sri Lankan Buddhism.":
    "புனித வரலாற்றுப் பதிவுகளைக் கொண்ட உலகின் மிகப் பழமையான மரமும், இலங்கை பௌத்தத்தின் ஜீவநாடியுமாகும்.",

    "A magnificent, awe-inspiring ancient stupa housing sacred relics, standing as a grand marvel of engineering and devotion.":
    "புனித உடற்பொருட்களைக் கொண்ட, பொறியியல் மற்றும் பக்தியின் மாபெரும் அற்புதமாகத் திகழும் புனித தூபி.",

    "An ancient stupa built by King Vattagamani Abhaya, surrounded by beautiful monolithic stone pillars and ruins.":
    "வட்டகாமினி அபய மன்னரால் கட்டப்பட்ட, அழகான கருங்கல் தூண்களால் சூழப்பட்ட பழங்காலத் தூபி.",

    "A massive monastic complex and ancient center of Buddhist scholarship, featuring a towering, majestic brick stupa.":
    "வானுயர்ந்த செங்கல் தூபியுடன் கூடிய பண்டைய பௌத்த கல்வி மற்றும் ஆன்மீக மையம்.",

    "Once the tallest stupa in the ancient world, representing an unparalleled masterpiece of ancient Sri Lankan architecture.":
    "பண்டைய உலகின் மிக உயரமான தூபியும், பண்டைய இலங்கை கட்டிடக்கலையின் தலைசிறந்த படைப்புமாகும்.",

    "Built by King Dutugemunu after leaving his scepter containing Buddha relics, a symbol of profound devotion.":
    "புத்தரின் திருப்பண்டங்கள் அடங்கிய செங்கோலை மையமாகக் கொண்டு துட்டகைமுனு மன்னரால் கட்டப்பட்ட பக்திச் சின்னம்.",

    "The Brazen Palace, an ancient multistoried building with hundreds of stone pillars, once a grand monastery.":
    "நூற்றுக்கணக்கான கல் தூண்களைக் கொண்ட பழங்கால ஒன்பது அடுக்கு மாளிகை.",

    "The magnificent ruins of the Brazen Palace, standing as a testament to the grand monastic life of ancient times.":
    "பண்டைய துறவற வாழ்வின் பெருமையை உணர்த்தும் பிரேசன் மாளிகையின் பிரம்மாண்ட இடிபாடுகள்.",

    "A beautiful rock temple famous for its exquisite ancient stone carvings, including the renowned Isurumuniya Lovers.":
    "இசுறுமுனிய காதலர்கள் உள்ளிட்ட புகழ்பெற்ற கல் சிற்பங்களைக் கொண்ட அழகிய குடைவரைக் கோவில்.",

    "An ancient forest monastery complex where pious monks meditated amidst scenic, rugged rock caves and serene surroundings.":
    "இயற்கைக் குகைகள் மற்றும் அமைதியான சூழலில் துறவிகள் தியானம் செய்த பழங்காலக் காட்டு மடாலயம்.",

    "A serene temple complex surrounding the sacred Bodhi tree, offering a profoundly peaceful environment for reflection.":
    "புனித போதி மரத்தைச் சுற்றியுள்ள அமைதியான வழிபாட்டுத் தலம்.",

    "The sacred mountain peak where Buddhism was introduced to Sri Lanka, featuring ancient steps and panoramic views.":
    "இலங்கைக்கு பௌத்தம் அறிமுகப்படுத்தப்பட்ட புனித மலையுச்சியும் பழங்காலப் படிகளும்.",

    "A welcoming meditation center close to the sacred city, providing comfortable facilities and expert guidance for beginners exploring mindfulness and breath meditation.":
    "சுவாசத் தியானம் மற்றும் விழிப்புணர்வு பயிற்சிக்கான வழிகாட்டுதலை வழங்கும் தியான மையம்.",

    "A serene monastery offering guided meditation and Dhamma teachings in English and Sinhala, ideal for seekers looking to learn traditional Theravada practices.":
    "பாரம்பரிய தேரவாத பௌத்த தர்ம போதனைகளையும் தியானப் பயிற்சியையும் வழங்கும் அமைதியான மையம்.",

    "Authentic Ayurvedic treatments and wellness therapies offered in a serene, traditional setting, focusing on holistic healing and rejuvenation.":
    "பாரம்பரிய ஆயுர்வேத சிகிச்சைகள் மற்றும் ஆரோக்கிய சிகிச்சைகளை வழங்கும் ஆயுர்வேத மருத்துவமனை.",

    "A serene and historic meditation hermitage perched on a rocky outcrop, offering panoramic views and spiritual tranquility.":
    "பாறை மலையுச்சியில் அமைந்திருக்கும் வரலாற்றுச் சிறப்புமிக்க தியான ஆசிரமம்.",

    "A remarkably serene and sacred retreat established within the holy land of Anuradhapura to preserve the traditional forest-dwelling monastic discipline.":
    "பாரம்பரிய வன துறவற ஒழுக்கத்தைப் பாதுகாக்கும் அமைதியான தவோவனம்.",

    "A living sanctuary of ancient Sri Lankan forest-monastic discipline and remarkable engineering craftsmanship.":
    "பண்டைய இலங்கையின் வன துறவற ஒழுக்கத்தையும் சிறந்த பொறியியல் திறனையும் பிரதிபலிக்கும் களுதிய பொகுண.",

    "Nuwara Wewa Lakeside Yoga & Wellness Experience": "நுவர வௌ ஏரிக்கரை யோகா மற்றும் ஆரோக்கிய அனுபவம்",
    "Ranmasu Uyana Mindfulness Walk": "ரன்மசு உயன விழிப்புணர்வு நடைப்பயணம்",
    "Mihintale Sunrise Meditation": "மிஹிந்தலை சூரிய உதய தியானம்",
    "Ritigala Ancient Forest Bathing": "ரிதிகல பழங்கால வன குளியல்",
    "Sacred Bodhi Contemplation": "புனித போதி தியானம்"
}

# Chapter exact titles
chapter_si = {
    "Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa": "1 වන පරිච්ඡේදය: දඹදිව ධර්මාශෝක අධිරාජ්‍යයාගේ මහා සත්‍යක්‍රියාව",
    "Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm": "2 වන පරිච්ඡේදය: මහා සාගරය තරණය කිරීම සහ නාග ලෝකය දමනය කිරීම",
    "Chapter 3: The Royal Reception at the Port of Jambukola Pattana": "3 වන පරිච්ඡේදය: දඹකොළපටුන වරායේදී රාජකීය පිළිගැනීම",
    "Chapter 4: The Miraculous Planting at Mahamevnawa": "4 වන පරිච්ඡේදය: මහමෙවුනා උයනේ ආශ්චර්යවත් රෝපණය",
    "Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle": "5 වන පරිච්ඡේදය: අෂ්ට ඵල බෝධීන් සහ සදාතනික ආරක්ෂාව",
    "Chapter 1: The Historic Prophecy by the Malwathu Oya": "1 වන පරිච්ඡේදය: මල්වතු ඔය අසබඩ ඓතිහාසික අනාවැකිය",
    "Chapter 2: The Sacred Inscription upon the Golden Plate": "2 වන පරිච්ඡේදය: රන් පතෙහි ලියැවුණු පූජනීය සටහන",
    "Chapter 3: The King's Solemn Vow and the Miracle of the Bricks": "3 වන පරිච්ඡේදය: රජුගේ අධිෂ්ඨානය සහ ගඩොල් ප්‍රාතිහාර්යය",
    "Chapter 4: The Construction of the Great Foundation": "4 වන පරිච්ඡේදය: මහා පාදම ඉදිකිරීම",
    "Chapter 5: The Enshrinement of the Drona of Bodily Relics": "5 වන පරිච්ඡේදය: ද්‍රෝණයක් සර්වඥ ධාතූන් වහන්සේලා තැන්පත් කිරීම",
    "Chapter 1: The Darkness of Heresy and the Great Crisis of the Maha Vihara": "1 වන පරිච්ඡේදය: මිථ්‍යාදෘෂ්ටියේ අඳුර සහ මහා විහාරයේ අර්බුදය",
    "Chapter 2: The Remorse of King Mahasena and the Spiritual Awakening": "2 වන පරිච්ඡේදය: මහසෙන් රජුගේ පසුතැවිල්ල සහ ආධ්‍යාත්මික පිබිදීම",
    "Chapter 3: The Enshrinement of the Buddha's Sacred Belt (Pati Dhatu)": "3 වන පරිච්ඡේදය: බුදුරජාණන් වහන්සේගේ ශ්‍රී පටී ධාතුව තැන්පත් කිරීම",
    "Chapter 4: The Grand Architectural Scale of the Colossal Stupa": "4 වන පරිච්ඡේදය: මහා සෑයේ දැවැන්ත වාස්තු විද්‍යාත්මක විශිෂ්ටත්වය",
    "Chapter 5: A Monastic Capital of Intellect and Engineering": "5 වන පරිච්ඡේදය: ශාස්ත්‍රීය හා ඉංජිනේරු ශිල්පයේ අගනගරය",
    "Chapter 1: The Auspicious Arrival of the Dhamma Mission at Ambasthala Peak": "1 වන පරිච්ඡේදය: අඹස්ථල මුදුනට ධර්ම දූත මෙහෙවරේ මංගල සම්ප්‍රාප්තිය",
    "Chapter 2: The Historic Intelligence Test (The Mango Riddle)": "2 වන පරිච්ඡේදය: ඓතිහාසික බුද්ධි පරීක්ෂණය (අඹ ප්‍රහේලිකාව)",
    "Chapter 3: The First Sermon and the Spiritual Awakening of Lanka": "3 වන පරිච්ඡේදය: ප්‍රථම ධර්ම දේශනය සහ ලක්දිව ආධ්‍යාත්මික පිබිදීම",
    "Chapter 4: The 1,840 Granite Steps and the Architecture of Chetiyagiri": "4 වන පරිච්ඡේදය: කළුගල් පියගැට 1,840 සහ චේතියගිරියේ වාස්තු විද්‍යාව",
}

chapter_ta = {
    "Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa": "அத்தியாயம் 1: அசோக பேரரசரின் மாபெரும் உண்மைச் சத்தியம்",
    "Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm": "அத்தியாயம் 2: பெருங்கடலைக் கடந்து நாகர் உலகை அடக்குதல்",
    "Chapter 3: The Royal Reception at the Port of Jambukola Pattana": "அத்தியாயம் 3: ஜம்புகோல பட்டினத்தில் அரச வரவேற்பு",
    "Chapter 4: The Miraculous Planting at Mahamevnawa": "அத்தியாயம் 4: மகாமேவ்னாவில் நிகழ்ந்த அற்புத நடவு",
    "Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle": "அத்தியாயம் 5: அஷ்ட பல போதியும் அதன் வரலாற்றுப் பாதுகாப்பும்",
    "Chapter 1: The Historic Prophecy by the Malwathu Oya": "அத்தியாயம் 1: மல்வத்து ஓயா நதிக்கரையில் வரலாற்று தீர்க்கதரிசனம்",
    "Chapter 2: The Sacred Inscription upon the Golden Plate": "அத்தியாயம் 2: தங்கத் தட்டில் பொறிக்கப்பட்ட புனிதக் குறிப்பு",
    "Chapter 3: The King's Solemn Vow and the Miracle of the Bricks": "அத்தியாயம் 3: மன்னரின் சபதமும் செங்கற்களின் அற்புதமும்",
    "Chapter 4: The Construction of the Great Foundation": "அத்தியாயம் 4: பிரம்மாண்ட அடித்தளத்தின் கட்டுமானம்",
    "Chapter 5: The Enshrinement of the Drona of Bodily Relics": "அத்தியாயம் 5: புனித உடற்பொருட்கள் வைப்பு",
    "Chapter 1: The Darkness of Heresy and the Great Crisis of the Maha Vihara": "அத்தியாயம் 1: மகா விகாரையின் பெரும் நெருக்கடி",
    "Chapter 2: The Remorse of King Mahasena and the Spiritual Awakening": "அத்தியாயம் 2: மகாசேன மன்னரின் மனமாற்றம்",
    "Chapter 3: The Enshrinement of the Buddha's Sacred Belt (Pati Dhatu)": "அத்தியாயம் 3: புத்தரின் புனித இடுப்புப் பட்டி திருப்பண்டம்",
    "Chapter 4: The Grand Architectural Scale of the Colossal Stupa": "அத்தியாயம் 4: மாபெரும் தூபியின் கட்டிடக்கலை",
    "Chapter 5: A Monastic Capital of Intellect and Engineering": "அத்தியாயம் 5: கல்வி மற்றும் பொறியியலின் தலைநகரம்",
    "Chapter 1: The Auspicious Arrival of the Dhamma Mission at Ambasthala Peak": "அத்தியாயம் 1: அம்பஸ்தல சிகரத்தில் தம்ம தூதுக்குழுவின் வருகை",
    "Chapter 2: The Historic Intelligence Test (The Mango Riddle)": "அத்தியாயம் 2: வரலாற்று நுண்ணறிவுப் பரீட்சை (மாம்பழ புதிர்)",
    "Chapter 3: The First Sermon and the Spiritual Awakening of Lanka": "அத்தியாயம் 3: முதல் தம்ம போதனையும் ஆன்மீக எழுச்சியும்",
    "Chapter 4: The 1,840 Granite Steps and the Architecture of Chetiyagiri": "அத்தியாயம் 4: 1,840 கருங்கல் படிகளும் சேதியகிரியின் கட்டிடக்கலையும்",
}

# Merge all
all_si = {**topics_si, **chapter_si}
all_ta = {**topics_ta, **chapter_ta}

# Read translations.js and inject at the very top of SI and TA blocks
with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in all_si.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in all_ta.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Injected {len(all_si)} topic and chapter translations successfully!")
