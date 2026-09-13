# encoding: utf-8
import json
import re

with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

# Load existing translations
with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We will create a rich translation dictionary for every spot
master_si = {}
master_ta = {}

# 1. JAYA SRI MAHA BODHI
jayasri_si = {
    "Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa": "1 වන පරිච්ඡේදය: දඹදිව ධර්මාශෝක අධිරාජ්‍යයාගේ මහා සත්‍යක්‍රියාව",
    "Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm": "2 වන පරිච්ඡේදය: මහා සාගරය තරණය කිරීම සහ නාග ලෝකය දමනය කිරීම",
    "Chapter 3: The Royal Reception at the Port of Jambukola Pattana": "3 වන පරිච්ඡේදය: දඹකොළපටුන වරායේදී රාජකීය පිළිගැනීම",
    "Chapter 4: The Miraculous Planting at Mahamevnawa": "4 වන පරිච්ඡේදය: මහමෙවුනා උයනේ ආශ්චර්යවත් රෝපණය",
    "Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle": "5 වන පරිච්ඡේදය: අෂ්ට ඵල බෝධීන් සහ සදාතනික ආරක්ෂාව",
}
jayasri_ta = {
    "Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa": "அத்தியாயம் 1: அசோக பேரரசரின் மாபெரும் உண்மைச் சத்தியம்",
    "Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm": "அத்தியாயம் 2: பெருங்கடலைக் கடந்து நாகர் உலகை அடக்குதல்",
    "Chapter 3: The Royal Reception at the Port of Jambukola Pattana": "அத்தியாயம் 3: ஜம்புகோல பட்டினத்தில் அரச வரவேற்பு",
    "Chapter 4: The Miraculous Planting at Mahamevnawa": "அத்தியாயம் 4: மகாமேவ்னாவில் நிகழ்ந்த அற்புத நடவு",
    "Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle": "அத்தியாயம் 5: அஷ்ட பல போதியும் அதன் வரலாற்றுப் பாதுகாப்பும்",
}
master_si.update(jayasri_si)
master_ta.update(jayasri_ta)

# 2. RUWANWELISAYA
ruwan_si = {
    "Chapter 1: The Historic Prophecy by the Malwathu Oya": "1 වන පරිච්ඡේදය: මල්වතු ඔය අසබඩ ඓතිහාසික අනාවැකිය",
    "Chapter 2: The Sacred Inscription upon the Golden Plate": "2 වන පරිච්ඡේදය: රන් පතෙහි ලියැවුණු පූජනීය සටහන",
    "Chapter 3: The King's Solemn Vow and the Miracle of the Bricks": "3 වන පරිච්ඡේදය: රජුගේ අධිෂ්ඨානය සහ ගඩොල් ප්‍රාතිහාර්යය",
    "Chapter 4: The Construction of the Great Foundation": "4 වන පරිච්ඡේදය: මහා පාදම ඉදිකිරීම",
    "Chapter 5: The Enshrinement of the Drona of Bodily Relics": "5 වන පරිච්ඡේදය: ද්‍රෝණයක් සර්වඥ ධාතූන් වහන්සේලා තැන්පත් කිරීම",
}
ruwan_ta = {
    "Chapter 1: The Historic Prophecy by the Malwathu Oya": "அத்தியாயம் 1: மல்வத்து ஓயா நதிக்கரையில் வரலாற்று தீர்க்கதரிசனம்",
    "Chapter 2: The Sacred Inscription upon the Golden Plate": "அத்தியாயம் 2: தங்கத் தட்டில் பொறிக்கப்பட்ட புனிதக் குறிப்பு",
    "Chapter 3: The King's Solemn Vow and the Miracle of the Bricks": "அத்தியாயம் 3: மன்னரின் சபதமும் செங்கற்களின் அற்புதமும்",
    "Chapter 4: The Construction of the Great Foundation": "அத்தியாயம் 4: பிரம்மாண்ட அடித்தளத்தின் கட்டுமானம்",
    "Chapter 5: The Enshrinement of the Drona of Bodily Relics": "அத்தியாயம் 5: புனித உடற்பொருட்கள் வைப்பு",
}
master_si.update(ruwan_si)
master_ta.update(ruwan_ta)

# 3. JETAVANARAMAYA
jeta_si = {
    "Chapter 1: The Darkness of Heresy and the Great Crisis of the Maha Vihara": "1 වන පරිච්ඡේදය: මිථ්‍යාදෘෂ්ටියේ අඳුර සහ මහා විහාරයේ අර්බුදය",
    "Chapter 2: The Remorse of King Mahasena and the Spiritual Awakening": "2 වන පරිච්ඡේදය: මහසෙන් රජුගේ පසුතැවිල්ල සහ ආධ්‍යාත්මික පිබිදීම",
    "Chapter 3: The Enshrinement of the Buddha's Sacred Belt (Pati Dhatu)": "3 වන පරිච්ඡේදය: බුදුරජාණන් වහන්සේගේ ශ්‍රී පටී ධාතුව තැන්පත් කිරීම",
    "Chapter 4: The Grand Architectural Scale of the Colossal Stupa": "4 වන පරිච්ඡේදය: මහා සෑයේ දැවැන්ත වාස්තු විද්‍යාත්මක විශිෂ්ටත්වය",
    "Chapter 5: A Monastic Capital of Intellect and Engineering": "5 වන පරිච්ඡේදය: ශාස්ත්‍රීය හා ඉංජිනේරු ශිල්පයේ අගනගරය",
}
jeta_ta = {
    "Chapter 1: The Darkness of Heresy and the Great Crisis of the Maha Vihara": "அத்தியாயம் 1: மகா விகாரையின் பெரும் நெருக்கடி",
    "Chapter 2: The Remorse of King Mahasena and the Spiritual Awakening": "அத்தியாயம் 2: மகாசேன மன்னரின் மனமாற்றம்",
    "Chapter 3: The Enshrinement of the Buddha's Sacred Belt (Pati Dhatu)": "அத்தியாயம் 3: புத்தரின் புனித இடுப்புப் பட்டி திருப்பண்டம்",
    "Chapter 4: The Grand Architectural Scale of the Colossal Stupa": "அத்தியாயம் 4: மாபெரும் தூபியின் கட்டிடக்கலை",
    "Chapter 5: A Monastic Capital of Intellect and Engineering": "அத்தியாயம் 5: கல்வி மற்றும் பொறியியலின் தலைநகரம்",
}
master_si.update(jeta_si)
master_ta.update(jeta_ta)

# 4. LANKARAMA
lanka_si = {
    "Chapter 1: The Retreat of the Great Black Sinhalese and the Weight of the Chariot": "1 වන පරිච්ඡේදය: මහා කළු සිංහලයාගේ පසුබැසීම සහ රථයේ බර",
    "Chapter 2: Queen Soma Devi's Supreme Sacrifice": "2 වන පරිච්ඡේදය: සෝමා දේවියගේ අසමසම පරිත්‍යාගය",
    "Chapter 3: The Construction of the Somarama (Lankarama) Vatadage": "3 වන පරිච්ඡේදය: සෝමාරාම (ලංකාරාම) වටදාගෙය ඉදිකිරීම",
}
lanka_ta = {
    "Chapter 1: The Retreat of the Great Black Sinhalese and the Weight of the Chariot": "அத்தியாயம் 1: மன்னரின் பின்வாங்கலும் ரதத்தின் எடையும்",
    "Chapter 2: Queen Soma Devi's Supreme Sacrifice": "அத்தியாயம் 2: சோமா தேவியின் உன்னத தியாகம்",
    "Chapter 3: The Construction of the Somarama (Lankarama) Vatadage": "அத்தியாயம் 3: சோமாராமய (லங்காராமய) வட்டதாகே கட்டுமானம்",
}
master_si.update(lanka_si)
master_ta.update(lanka_ta)

# 5. LOVAMAHAPRASADA
lova_si = {
    "Chapter 1: The Model of a Celestial Mansion and the Inscription on the Stone Pillar": "1 වන පරිච්ඡේදය: දිව්‍ය විමානයේ සැලැස්ම සහ සෙල්ටැඹ",
    "Chapter 2: The Grand Architecture of the Nine-Storeyed Brazen Palace": "2 වන පරිච්ඡේදය: නව මහල් ලෝවාමහාප්‍රාසාදයේ වාස්තු විද්‍යාව",
    "Chapter 3: The Jewel-Studded Central Throne and the Coral Lotus": "3 වන පරිච්ඡේදය: මැණික් ඔබ්බවන ලද මධ්‍යම සිංහාසනය සහ පබළු නෙළුම",
}
lova_ta = {
    "Chapter 1: The Model of a Celestial Mansion and the Inscription on the Stone Pillar": "அத்தியாயம் 1: தேவ மாளிகையின் மாதிரியும் கல் தூண் குறிப்பும்",
    "Chapter 2: The Grand Architecture of the Nine-Storeyed Brazen Palace": "அத்தியாயம் 2: ஒன்பது அடுக்கு பிரேசன் மாளிகையின் கட்டிடக்கலை",
    "Chapter 3: The Jewel-Studded Central Throne and the Coral Lotus": "அத்தியாயம் 3: நவரத்தின சிம்மாசனமும் பவளத் தாமரையும்",
}
master_si.update(lova_si)
master_ta.update(lova_ta)

# 6. ISURUMUNIYA
isuru_si = {
    'Chapter 1: The Sanctuary of Nobles and the Birth of "Issarasamana"': '1 වන පරිච්ඡේදය: ප්‍රභූවරුන්ගේ අභයභූමිය සහ "ඉස්සරසමණ" ආරම්භය',
    "Chapter 2: The Romantic Saga of Saliya and Asokamala": "2 වන පරිච්ඡේදය: සාලිය අසෝකමාලා ප්‍රේම වෘත්තාන්තය",
    "Chapter 3: The Splendor of Rock Art and the Gupta Architectural Influence": "3 වන පරිච්ඡේදය: ගල් කැටයම් කලාව සහ ගුප්ත වාස්තු විද්‍යාත්මක ආභාෂය",
}
isuru_ta = {
    'Chapter 1: The Sanctuary of Nobles and the Birth of "Issarasamana"': 'அத்தியாயம் 1: பிரபுக்களின் புகலிடமும் "இஸ்ஸரசமண" தோற்றமும்',
    "Chapter 2: The Romantic Saga of Saliya and Asokamala": "அத்தியாயம் 2: சாலிய மற்றும் அசோகமாலாவின் காதல் காவியம்",
    "Chapter 3: The Splendor of Rock Art and the Gupta Architectural Influence": "அத்தியாயம் 3: பாறை சிற்பக் கலையின் சிறப்பும் குப்த கட்டிடக்கலை தாக்கமும்",
}
master_si.update(isuru_si)
master_ta.update(isuru_ta)

# 7. VESSAGIRIYA
vessa_si = {
    "Chapter 1: The Ordination of Five Hundred Vaishya Princes": "1 වන පරිච්ඡේදය: වෛශ්‍ය කුමාරවරුන් පන්සියයකගේ පැවිදි වීම",
    "Chapter 2: The Drip-Ledge Caves and the Silent Meditation of the Arahats": "2 වන පරිච්ඡේදය: කටාරම් කෙටූ ගල් ලෙන් සහ රහතන් වහන්සේලාගේ නිහඬ භාවනාව",
    "Chapter 3: The Invaluable Brahmi Rock Inscriptions": "3 වන පරිච්ඡේදය: මිල කළ නොහැකි බ්‍රාහ්මී සෙල්ලිපි",
}
vessa_ta = {
    "Chapter 1: The Ordination of Five Hundred Vaishya Princes": "அத்தியாயம் 1: ஐந்நூறு இளவரசர்களின் துறவறம்",
    "Chapter 2: The Drip-Ledge Caves and the Silent Meditation of the Arahats": "அத்தியாயம் 2: குகைகளும் ரஹத்துக்களின் அமைதியான தியானமும்",
    "Chapter 3: The Invaluable Brahmi Rock Inscriptions": "அத்தியாயம் 3: விலைமதிப்பற்ற பிராமி கல்வெட்டுகள்",
}
master_si.update(vessa_si)
master_ta.update(vessa_ta)

# 8. MIHINTALE
mihin_si = {
    "Chapter 1: The Auspicious Arrival of the Dhamma Mission at Ambasthala Peak": "1 වන පරිච්ඡේදය: අඹස්ථල මුදුනට ධර්ම දූත මෙහෙවරේ මංගල සම්ප්‍රාප්තිය",
    "Chapter 2: The Historic Intelligence Test (The Mango Riddle)": "2 වන පරිච්ඡේදය: ඓතිහාසික බුද්ධි පරීක්ෂණය (අඹ ප්‍රහේලිකාව)",
    "Chapter 3: The First Sermon and the Spiritual Awakening of Lanka": "3 වන පරිච්ඡේදය: ප්‍රථම ධර්ම දේශනය සහ ලක්දිව ආධ්‍යාත්මික පිබිදීම",
    "Chapter 4: The 1,840 Granite Steps and the Architecture of Chetiyagiri": "4 වන පරිච්ඡේදය: කළුගල් පියගැට 1,840 සහ චේතියගිරියේ වාස්තු විද්‍යාව",
}
mihin_ta = {
    "Chapter 1: The Auspicious Arrival of the Dhamma Mission at Ambasthala Peak": "அத்தியாயம் 1: அம்பஸ்தல சிகரத்தில் தம்ம தூதுக்குழுவின் வருகை",
    "Chapter 2: The Historic Intelligence Test (The Mango Riddle)": "அத்தியாயம் 2: வரலாற்று நுண்ணறிவுப் பரீட்சை (மாம்பழ புதிர்)",
    "Chapter 3: The First Sermon and the Spiritual Awakening of Lanka": "அத்தியாயம் 3: முதல் தம்ம போதனையும் ஆன்மீக எழுச்சியும்",
    "Chapter 4: The 1,840 Granite Steps and the Architecture of Chetiyagiri": "அத்தியாயம் 4: 1,840 கருங்கல் படிகளும் சேதியகிரியின் கட்டிடக்கலையும்",
}
master_si.update(mihin_si)
master_ta.update(mihin_ta)

# Inject all master translations
si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in master_si.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in master_ta.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Master translations injected successfully! Total added: {len(master_si)}")
