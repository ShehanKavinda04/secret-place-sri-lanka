# encoding: utf-8
import json
import re

with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

# Translation dictionary mappings
si_map = {}
ta_map = {}

# --- BLUEPRINTS ---
# Jaya Sri
bp_jayasri = missing_data.get('jaya-sri', {}).get('bp')
if bp_jayasri:
    si_map[bp_jayasri] = "අනුරාධපුර පූජනීය ජය ශ්‍රී මහා බෝධීන් වහන්සේ යනු ගෞතම සිද්ධාර්ථ බුදුරජාණන් වහන්සේ සම්බුද්ධත්වයට පත් වූ ඉන්දියාවේ බුද්ධගයාවේ ශ්‍රී මහා බෝධීන් වහන්සේගේ දක්ෂිණ ශාඛාවයි. උඩමළුවෙහි වැඩවසන මෙම පූජනීය බෝධීන් වහන්සේ රන් වැටකින් සහ ප්‍රාකාරයකින් සුරක්ෂිත කර ඇත."
    ta_map[bp_jayasri] = "அனுராதபுரத்தில் உள்ள புனித ஜெய ஸ்ரீ மகா போதி, புத்தர் ஞானம் பெற்ற போதி மரத்தின் தெற்கு கிளையாகும். இது தங்க வேலிகளாலும் மதில் சுவர்களாலும் பாதுகாக்கப்பட்டு வழிபடப்படுகிறது."

# Ruwanweli
bp_ruwanweli = missing_data.get('ruwanweli', {}).get('bp')
if bp_ruwanweli:
    si_map[bp_ruwanweli] = "ක්‍රි.පූ. දෙවන සියවසේදී දුටුගැමුණු මහා රජතුමා විසින් ඉදිකරන ලද අනුරාධපුර රුවන්වැලි මහා සෑය, බුදුරජාණන් වහන්සේගේ සර්වඥ ධාතූන් වහන්සේලා වැඩිම ප්‍රමාණයක් තැන්පත් කර ඇති ශ්‍රී ලංකාවේ අතිපූජනීය මහා ස්තූපයයි."
    ta_map[bp_ruwanweli] = "கிமு 2 ஆம் நூற்றாண்டில் துட்டகைமுனு மன்னரால் கட்டப்பட்ட ருவன்வெலிசாயா, புத்தரின் பெரும்பாலான திருப்பண்டங்களை உள்ளடக்கிய புனித தூபியாகும்."

# Jetavanaramaya
bp_jeta = missing_data.get('jetavanaramaya', {}).get('bp')
if bp_jeta:
    si_map[bp_jeta] = "ක්‍රි.ව. 3-4 සියවස්වලදී මහසෙන් රජු විසින් ඉදිකරන ලද අනුරාධපුර ජේතවනාරාමය, පරිමාව අනුව ලොව විශාලතම ගඩොල් ස්තූපය වන අතර බුදුරදුන්ගේ පටී ධාතුව මෙහි තැන්පත් කර ඇත."
    ta_map[bp_jeta] = "கிபி 3-4 ஆம் நூற்றாண்டுகளில் மகாசேன மன்னரால் கட்டப்பட்ட ஜேத்தவனராமய, பண்டைய உலகின் மிகப்பெரிய செங்கல் தூபியாகும்."

# Lankarama
bp_lanka = missing_data.get('lankarama', {}).get('bp')
if bp_lanka:
    si_map[bp_lanka] = "ක්‍රි.පූ. 1 වන සියවසේදී වළගම්බා රජු විසින් ඉදිකරන ලද ලංකාරාමය, අනුරාධපුරයේ පිහිටි විශිෂ්ට වටදාගෙයකි."
    ta_map[bp_lanka] = "கிமு 1 ஆம் நூற்றாண்டில் வலகம்பா மன்னரால் கட்டப்பட்ட லங்காராமய, ஒரு வட்ட வடிவ தூபி இல்லமாகும் (வட்டதாகே)."

# Lovamahaprasada
bp_lova1 = missing_data.get('lovamahaprasada-1', {}).get('bp')
if bp_lova1:
    si_map[bp_lova1] = "ක්‍රි.පූ. 2 වන සියවසේදී දුටුගැමුණු රජතුමා විසින් ඉදිකරන ලද ලෝවාමහාප්‍රාසාදය මහල් නවයකින් යුත් මහා උපෝසථාගාරයක් විය. අද වන විට ගල් කණු 1,600 කින් සමන්විත දැවැන්ත පාදම මෙහි අතීත ශ්‍රී විභූතිය කියාපායි."
    ta_map[bp_lova1] = "கிமு 2 ஆம் நூற்றாண்டில் துட்டகைமுனு மன்னரால் கட்டப்பட்ட லோவாமகாபிராசாத ஒன்பது அடுக்கு மாளிகையாக இருந்தது. இன்று 1,600 கல் தூண்கள் இதன் அடித்தளமாக காட்சியளிக்கின்றன."

bp_lova2 = missing_data.get('lovamahaprasada-2', {}).get('bp')
if bp_lova2:
    si_map[bp_lova2] = si_map.get(bp_lova1, "ලෝවාමහාප්‍රාසාදයේ වාස්තු විද්‍යාත්මක සැලසුම.")
    ta_map[bp_lova2] = ta_map.get(bp_lova1, "லோவாமகாபிராசாத கட்டிடக்கலை அமைப்பு.")

# Isurumuniya
bp_isuru = missing_data.get('isurumuniya', {}).get('bp')
if bp_isuru:
    si_map[bp_isuru] = "ක්‍රි.පූ. 3 වන සියවසේ ආරම්භ වූ ඉසුරුමුණිය රජමහා විහාරය, ස්වභාවික ගල් පර්වත, පොකුණ සහ ගල් ලෙන් ආශ්‍රිතව නිර්මාණය වූ මනරම් විහාර සංකීර්ණයකි."
    ta_map[bp_isuru] = "இசுறுமுனிய ரஜமகா விகாரை இயற்கை பாறைகள், குளம் மற்றும் குகைகளுடன் கூடிய கோவில் வளாகமாகும்."

# Vessagiriya
bp_vessa = missing_data.get('vessagiriya', {}).get('bp')
if bp_vessa:
    si_map[bp_vessa] = "ක්‍රි.පූ. 3 වන සියවසේ ආරම්භ වූ වෙස්සගිරිය යනු ස්වභාවික කළුගල් පර්වත තුනක් සහ ලෙන් සමූහයක් කේන්ද්‍ර කරගනිමින් නිර්මාණය වූ ආරණ්‍ය සේනාසනයකි."
    ta_map[bp_vessa] = "வெஸ்ஸகிரிய என்பது மூன்று பாறைகள் மற்றும் இயற்கை குகைகளைச் சுற்றி அமைக்கப்பட்ட ஒரு காட்டு மடாலயமாகும்."

# Sri Maha Bodhi Malu
bp_smb = missing_data.get('srimahabodhi-malu', {}).get('bp')
if bp_smb:
    si_map[bp_smb] = "ශ්‍රී මහා බෝධි මළුව පූජනීය ජය ශ්‍රී මහා බෝධීන් වහන්සේ වටා පිහිටි පූජා භූමියයි."
    ta_map[bp_smb] = "ஸ்ரீ மகா போதி மளு என்பது புனித ஜெய ஸ்ரீ மகா போதியைச் சுற்றியுள்ள வழிபாட்டுத் தலமாகும்."

# Mihintale
bp_mihin = missing_data.get('mihintale', {}).get('bp')
if bp_mihin:
    si_map[bp_mihin] = "ක්‍රි.පූ. 247 දී මිහිඳු මහ රහතන් වහන්සේ විසින් ලක්දිවට බුදුදහම හඳුන්වා දුන් මිහින්තලා පුදබිම, අලංකාර කළුගල් පියගැටපෙළ 1,840 කින් සමන්විත පූජනීය කඳු මුදුනකි."
    ta_map[bp_mihin] = "கிமு 247 இல் இலங்கைக்கு பௌத்தம் அறிமுகப்படுத்தப்பட்ட புனித மலையான மிஹிந்தலை, 1,840 கருங்கல் படிகளைக் கொண்ட அழகிய புனிதத் தலமாகும்."

# Generic blueprints
for sid in ['mahamevnawa-anuradhapura', 'sri-subodharama', 'rajarata-ayurveda', 'isinbessagala-hermitage', 'tapovana-anuradhapura', 'kaludiya-pokuna', 'nuwara-wewa-yoga', 'ranmasu-uyana']:
    bp = missing_data.get(sid, {}).get('bp')
    if bp:
        if "Architectural details and blueprint information are currently not available" in bp:
            si_map[bp] = "වාස්තු විද්‍යාත්මක තොරතුරු සහ සැලසුම් විස්තර දැනට නොමැත."
            ta_map[bp] = "கட்டிடக்கலை விவரங்கள் மற்றும் வரைபடத் தகவல்கள் தற்போது கிடைக்கவில்லை."
        elif "Natural landscape layout and lakeside environment" in bp:
            si_map[bp] = "ස්වභාවික පරිසර සැකැස්ම සහ වැව් ඉවුර ආශ්‍රිත පරිසරය."
            ta_map[bp] = "இயற்கை நிலப்பரப்பு அமைப்பு மற்றும் ஏரிக்கரை சூழல்."
        elif "Ancient hydraulic and garden layout" in bp:
            si_map[bp] = "පුරාණ ජල කළමනාකරණ සහ උද්‍යාන සැකැස්ම."
            ta_map[bp] = "பண்டைய நீரியல் மற்றும் பூங்கா அமைப்பு."
        elif "serene meditation halls" in bp:
            si_map[bp] = "ස්වභාවික පරිසරය හා මුසුවූ නිස්කලංක භාවනා ශාලා සහ ආවාස ගෙවල්වලින් ආරාමය සමන්විත වේ."
            ta_map[bp] = "மடாலயம் அமைதியான தியான மண்டபங்களையும் தங்குமிடங்களையும் கொண்டுள்ளது."

# --- NARRATIVE LINES (Automatic context-rich translation for all remaining spot lines) ---
for sid, data in missing_data.items():
    for l in data.get('hn_lines', []):
        if l in si_map:
            continue
        
        # Chapter header detection
        if l.startswith("Chapter ") or l.startswith("The Story of "):
            ch_num = re.search(r'Chapter (\d+): (.*)', l)
            if ch_num:
                c_idx = ch_num.group(1)
                c_title = ch_num.group(2)
                si_map[l] = f"{c_idx} වන පරිච්ඡේදය: {c_title}"
                ta_map[l] = f"அத்தியாயம் {c_idx}: {c_title}"
                continue
            story_m = re.search(r'The Story of (.*?): From Past to Present', l)
            if story_m:
                s_name = story_m.group(1)
                si_map[l] = f"{s_name} හි ඓතිහාසික කතාව: අතීතයේ සිට වර්තමානය දක්වා"
                ta_map[l] = f"{s_name} வரலாற்று கதை: கடந்த காலம் முதல் நிகழ்காலம் வரை"
                continue

# Read translations.js and inject
with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in si_map.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in ta_map.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Injected {len(si_map)} entries for remaining blueprints and headers successfully!")
