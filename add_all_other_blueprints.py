# encoding: utf-8
import json
import re

# We will create translations for the blueprints and narratives of remaining spots

all_other_si = {
    # === JAYA SRI MAHA BODHI ===
    "The Sacred Jaya Sri Maha Bodhi in Anuradhapura is the southern branch of the historical Bodhi tree (Sri Maha Bodhi at Bodh Gaya) under which Siddhartha Gautama attained Enlightenment. Brought to Sri Lanka in the 3rd century BCE by Sanghamitta Theri, it is recognized as the oldest surviving human-planted tree with a recorded history. The sacred tree is situated on a high terrace (Udamaluwa), surrounded by a series of protective retaining walls and a gilded fence (Ran Weta) installed to safeguard its ancient branches. Devotees access the site through a structured sequence of paved pathways, sand courts, and outer stone gateways that maintain the solemnity of continuous worship across more than two millennia.":
    "අනුරාධපුර පූජනීය ජය ශ්‍රී මහා බෝධීන් වහන්සේ යනු ගෞතම සිද්ධාර්ථ බුදුරජාණන් වහන්සේ සම්බුද්ධත්වයට පත් වූ ඉන්දියාවේ බුද්ධගයාවේ ශ්‍රී මහා බෝධීන් වහන්සේගේ දක්ෂිණ ශාඛාවයි. ක්‍රි.පූ. 3 වන සියවසේදී සංඝමිත්තා තෙරණිය විසින් ලක්දිවට වැඩම කරවන ලද මෙය, ලොව පැරණිතම ලිඛිත ඉතිහාසයක් සහිත මානව රෝපිත වෘක්ෂය ලෙස පිළිගැනේ. උඩමළුවෙහි වැඩවසන මෙම පූජනීය බෝධීන් වහන්සේ රන් වැටකින් සහ ප්‍රාකාරයකින් සුරක්ෂිත කර ඇති අතර, වසර දෙදහසකට අධික කාලයක් පුරා අඛණ්ඩව වන්දනාමාන කරන බැතිමතුන් සඳහා පිළිවෙළින් සකස් කළ මංමාවත් සහ වැලි මළුවලින් සමන්විත වේ.",

    # === RUWANWELISAYA ===
    "Ruwanwelisaya (Mahathupa) in Anuradhapura, built by King Dutugemunu in the 2nd century BCE, is one of the most revered stupas in Sri Lanka, enshrining a significant portion of the Buddha's relics. Its iconic hemispherical dome rests on three concentric stepped terraces (basal rings) and rises to a refined harmika and spire capped with a crystal-pointed pinnacle. The stupa is enclosed by a broad paved courtyard and the famous Elephant Wall (Ath Pavura), a retaining terrace sculpted with hundreds of elephant figures that appear to support the sacred platform. The architectural layout emphasizes expansive circumambulatory paths, carved stone entrance pavilions, and dedicated offering altars at the cardinal directions.":
    "ක්‍රි.පූ. දෙවන සියවසේදී දුටුගැමුණු මහා රජතුමා විසින් ඉදිකරන ලද අනුරාධපුර රුවන්වැලි මහා සෑය, බුදුරජාණන් වහන්සේගේ සර්වඥ ධාතූන් වහන්සේලා වැඩිම ප්‍රමාණයක් තැන්පත් කර ඇති ශ්‍රී ලංකාවේ අතිපූජනීය මහා ස්තූපයයි. තුන් මහල් පේසාවලින් ඉහළට විහිදෙන අර්ධ ගෝලාකාර ස්වර්ණමය සෑ ගර්භය, හතරැස් කොටුව, දේවතා කොටුව, කොත් කැරැල්ල සහ චූඩාමාණික්‍යයෙන් සමන්විත වේ. සෑ මළුව වටා ඇති ප්‍රකට ඇත් පවුර සහ සතර දිශාවේ පිහිටි වාහල්කඩ මෙහි වාස්තු විද්‍යාත්මක විශිෂ්ටත්වය විදහා දක්වයි.",

    # === THUPARAMAYA ===
    "Thuparamaya, built by King Devanampiyatissa in the 3rd century BCE, is the first historical stupa built in Sri Lanka following the introduction of Buddhism by Arahat Mahinda. It enshrines the Right Collarbone Relic of the Buddha. The stupa features a distinctive bell-shaped (Ghantakara) dome set upon a circular elevated platform and was historically enclosed by a Vatadage (circular relic house). Concentric rings of slender, decorated stone pillars with carved capitals still surround the monument, preserving the footprint of the timber superstructure that once sheltered the shrine.":
    "ක්‍රි.පූ. 3 වන සියවසේදී දේවානම්පියතිස්ස රජු විසින් ඉදිකරන ලද ථූපාරාමය, මිහිඳු මහ රහතන් වහන්සේගේ ලංකාගමනයෙන් පසු මෙරට ඉදිකළ ප්‍රථම ඓතිහාසික ස්තූපයයි. බුදුරජාණන් වහන්සේගේ දකුණු අකු ධාතූන් වහන්සේ මෙහි තැන්පත් කර ඇත. වෘත්තාකාර උස් වේදිකාවක් මත පිහිටි ඝණ්ඨාකාර ස්තූපය වටා වටදාගෙයක නටබුන් සහ කැටයම් සහිත අලංකාර ගල් කණු වළලු අදටත් දැකගත හැක.",

    # === JETAVANARAMAYA ===
    "Jetavanaramaya in Anuradhapura, constructed by King Mahasena in the 3rd to 4th century CE, is the largest stupa in the ancient world by volume and one of the tallest brick monuments ever erected, enshrining a part of the Buddha's belt or sash. The monument features a massive hemispherical brick dome rising above an extensive square terrace, crowned by a robust harmika and conical spire. The surrounding complex includes extensive monastic colleges, residential cells, meditation platforms, and elaborate stone gateways (Torana) that reflect the scale and engineering sophistication of the Jetavana monastic fraternity at its zenith.":
    "ක්‍රි.ව. 3-4 සියවස්වලදී මහසෙන් රජු විසින් ඉදිකරන ලද අනුරාධපුර ජේතවනාරාමය, පරිමාව අනුව ලොව විශාලතම ගඩොල් ස්තූපය වන අතර බුදුරදුන්ගේ පටී ධාතුව මෙහි තැන්පත් කර ඇත. දැවැන්ත ගඩොල් ගර්භය, හතරැස් කොටුව සහ කොත් කැරැල්ලෙන් සමන්විත මෙම මහා සෑය වටා සක්මන් මළු, ආරාම ශාලා සහ ගල් කැටයම් දොරටු රාශියක් පවතී.",

    # === LANKARAMA ===
    "Lankarama, traditionally attributed to King Valagamba in the 1st century BCE, is a circular relic house (Vatadage) built around a central stupa in Anuradhapura. The shrine occupies a raised circular platform approached by flighted stone steps with guardstones and balustrades. Around the central dome stand concentric circles of monolithic granite pillars with intricately carved lotus-shaped capitals, which once supported a conical timber roof protecting the relic monument. The quiet, compact layout exemplifies the refined domestic scale of ancient Sri Lankan Vatadage architecture.":
    "ක්‍රි.පූ. 1 වන සියවසේදී වළගම්බා රජු විසින් ඉදිකරන ලද ලංකාරාමය, අනුරාධපුරයේ පිහිටි විශිෂ්ට වටදාගෙයකි. උස් වෘත්තාකාර වේදිකාවක් මත ඉදිකර ඇති මෙම ස්තූපය වටා සියුම් නෙළුම් මල් කැටයම් සහිත ඒකශෛලීය ගල් කණු වළලු පිහිටා ඇති අතර, එමඟින් අතීතයේ පැවති ලී සෙවිලි වහලය දරා සිටියේය.",

    # === LOVAMAHAPRASADA ===
    "Lovamahaprasada (the Brazen Palace) in Anuradhapura was a monumental multi-tiered chapter house built by King Dutugemunu in the 2nd century BCE for the Mahavihara fraternity. According to ancient chronicles, the structure originally stood nine storeys high with a roof covered in copper-bronze tiles that gave it its name. Today, the monument is defined by an expansive grid of approximately 1,600 dressed granite pillars arranged in forty parallel rows, which formed the foundational ground tier supporting the lost upper timber stories.":
    "ක්‍රි.පූ. 2 වන සියවසේදී දුටුගැමුණු රජතුමා විසින් මහා විහාරික භික්ෂූන් වහන්සේලා උදෙසා ඉදිකරන ලද ලෝවාමහාප්‍රාසාදය මහල් නවයකින් යුත් මහා උපෝසථාගාරයක් විය. එහි වහලය ලෝකඩ උළු සෙවිලි කර තිබූ බැවින් මෙම නම ලැබුණි. අද වන විට පේළි 40 කට පිහිටි ගල් කණු 1,600 කින් සමන්විත දැවැන්ත පාදම මෙහි අතීත ශ්‍රී විභූතිය කියාපායි.",

    # === ISURUMUNIYA ===
    "Isurumuniya Rajamaha Viharaya is a rock temple complex shaped around natural granite outcrops, a tranquil pond, and the cliffside shrine that overlooks the surrounding water gardens. Originating in the 3rd century BCE under King Devanampiyatissa and later enriched under King Kasyapa I, the site features cave dwellings, cliff-cut reliefs, and the iconic cliffside elephant carvings splashing beside the water basin. The museum and terrace house world-renowned stone sculptures including the 'Isurumuniya Lovers' and the 'Royal Family' relief panel.":
    "ක්‍රි.පූ. 3 වන සියවසේ දේවානම්පියතිස්ස රජ දවස ආරම්භ වූ ඉසුරුමුණිය රජමහා විහාරය, ස්වභාවික ගල් පර්වත, පොකුණ සහ ගල් ලෙන් ආශ්‍රිතව නිර්මාණය වූ මනරම් විහාර සංකීර්ණයකි. ප්‍රකට ඉසුරුමුණි පෙම්යුවල, රජ පවුල කැටයම සහ දිය කෙළින ඇතුන්ගේ ගල් කැටයම් මෙහි කලාත්මක අගය ලොව පුරා පතළ කර ඇත.",

    # === VESSAGIRIYA ===
    "Vessagiriya is a forest monastery arranged around three granite rock outcrops and a network of natural caves rather than monumental brick stupas. Dating from the 3rd century BCE, it provided shelter for hermit monks and includes numerous rock shelters fitted with drip ledges (Katarama) and Brahmi rock inscriptions recording donations by early royals and lay benefactors. Stone stairways carved directly into the living granite connect the hillside cells with meditation platforms, pond basins, and shaded walking terraces.":
    "ක්‍රි.පූ. 3 වන සියවසේ ආරම්භ වූ වෙස්සගිරිය යනු ස්වභාවික කළුගල් පර්වත තුනක් සහ ලෙන් සමූහයක් කේන්ද්‍ර කරගනිමින් නිර්මාණය වූ ආරණ්‍ය සේනාසනයකි. කටාරම් කෙටූ ගල් ලෙන්, බ්‍රාහ්මී සෙල්ලිපි, ගල් පඩිපෙල් සහ භාවනා කුටි මෙහි පැරණි භාවනායෝගී භික්ෂු ජීවිතයේ සාක්ෂි දරයි.",

    # === MIHINTALE ===
    "Mihintale is a sacred mountain complex shaped by its dramatic granite landscape, monumental stairway, and network of ancient monastic terraces where Buddhism was officially introduced to Sri Lanka in 247 BCE. A grand flight of 1,840 wide granite steps rises through four distinct terraces shaded by Frangipani trees, leading to the Ambasthala Dagaba, the towering Mahaseya on the summit, and the Aradhana Gala (Rock of Inspiration). The mountain layout integrates monastic hospitals, refectory halls, lion-shaped water spouts, and rock-hewn caves.":
    "ක්‍රි.පූ. 247 දී මිහිඳු මහ රහතන් වහන්සේ විසින් ලක්දිවට බුදුදහම හඳුන්වා දුන් මිහින්තලා පුදබිම, අලංකාර කළුගල් පියගැටපෙළ 1,840 කින් සමන්විත පූජනීය කඳු මුදුනකි. අඹස්ථල දාගැබ, මහා සෑය, ආරාධනා ගල, පැරණි රෝහල, දාන ශාලාව සහ සිංහ පොකුණ මෙහි වාස්තු විද්‍යාත්මක විශිෂ්ටත්වය පෙන්නුම් කරයි."
}

all_other_ta = {
    # === JAYA SRI MAHA BODHI ===
    "The Sacred Jaya Sri Maha Bodhi in Anuradhapura is the southern branch of the historical Bodhi tree (Sri Maha Bodhi at Bodh Gaya) under which Siddhartha Gautama attained Enlightenment. Brought to Sri Lanka in the 3rd century BCE by Sanghamitta Theri, it is recognized as the oldest surviving human-planted tree with a recorded history. The sacred tree is situated on a high terrace (Udamaluwa), surrounded by a series of protective retaining walls and a gilded fence (Ran Weta) installed to safeguard its ancient branches. Devotees access the site through a structured sequence of paved pathways, sand courts, and outer stone gateways that maintain the solemnity of continuous worship across more than two millennia.":
    "அனுராதபுரத்தில் உள்ள புனித ஜெய ஸ்ரீ மகா போதி, கௌதம புத்தர் ஞானம் பெற்ற புத்த கயாவின் ஸ்ரீ மகா போதியின் தெற்கு கிளையாகும். கிமு 3 ஆம் நூற்றாண்டில் சங்கமித்தை தேரியினால் இலங்கைக்கு கொண்டு வரப்பட்ட இது, பதிவுசெய்யப்பட்ட வரலாற்றைக் கொண்ட உலகின் மிக பழமையான மனிதனால் நடப்பட்ட மரமாகும். இந்த மரம் தங்க வேலிகளாலும் (ரன் வெட்ட) மதில் சுவர்களாலும் பாதுகாக்கப்பட்டு இரண்டு மில்லினியங்களுக்கும் மேலாக வழிபடப்படுகிறது.",

    # === RUWANWELISAYA ===
    "Ruwanwelisaya (Mahathupa) in Anuradhapura, built by King Dutugemunu in the 2nd century BCE, is one of the most revered stupas in Sri Lanka, enshrining a significant portion of the Buddha's relics. Its iconic hemispherical dome rests on three concentric stepped terraces (basal rings) and rises to a refined harmika and spire capped with a crystal-pointed pinnacle. The stupa is enclosed by a broad paved courtyard and the famous Elephant Wall (Ath Pavura), a retaining terrace sculpted with hundreds of elephant figures that appear to support the sacred platform. The architectural layout emphasizes expansive circumambulatory paths, carved stone entrance pavilions, and dedicated offering altars at the cardinal directions.":
    "கிமு 2 ஆம் நூற்றாண்டில் துட்டகைமுனு மன்னரால் கட்டப்பட்ட ருவன்வெலிசாயா, புத்தரின் பெரும்பாலான திருப்பண்டங்களை உள்ளடக்கிய புனித தூபியாகும். இதன் அரைக்கோள குவிமாடம், யானை சுவர் (அத் பவுர) மற்றும் நான்கு திசைகளிலும் உள்ள வாகனங்கள் இதன் சிறப்பம்சங்களாகும்.",

    # === THUPARAMAYA ===
    "Thuparamaya, built by King Devanampiyatissa in the 3rd century BCE, is the first historical stupa built in Sri Lanka following the introduction of Buddhism by Arahat Mahinda. It enshrines the Right Collarbone Relic of the Buddha. The stupa features a distinctive bell-shaped (Ghantakara) dome set upon a circular elevated platform and was historically enclosed by a Vatadage (circular relic house). Concentric rings of slender, decorated stone pillars with carved capitals still surround the monument, preserving the footprint of the timber superstructure that once sheltered the shrine.":
    "கிமு 3 ஆம் நூற்றாண்டில் தேவநம்பியதிஸ்ஸ மன்னரால் கட்டப்பட்ட தூபாராமய, இலங்கையில் கட்டப்பட்ட முதல் வரலாற்றுத் தூபியாகும். இதில் புத்தரின் வலது கழுத்தெலும்பு திருப்பண்டம் வைக்கப்பட்டுள்ளது. வட்டதாகே அமைப்பும் செதுக்கப்பட்ட தூண்களும் இதன் கட்டிடக்கலையை விளக்குகின்றன.",

    # === JETAVANARAMAYA ===
    "Jetavanaramaya in Anuradhapura, constructed by King Mahasena in the 3rd to 4th century CE, is the largest stupa in the ancient world by volume and one of the tallest brick monuments ever erected, enshrining a part of the Buddha's belt or sash. The monument features a massive hemispherical brick dome rising above an extensive square terrace, crowned by a robust harmika and conical spire. The surrounding complex includes extensive monastic colleges, residential cells, meditation platforms, and elaborate stone gateways (Torana) that reflect the scale and engineering sophistication of the Jetavana monastic fraternity at its zenith.":
    "கிபி 3-4 ஆம் நூற்றாண்டுகளில் மகாசேன மன்னரால் கட்டப்பட்ட ஜேத்தவனராமய, பண்டைய உலகின் மிகப்பெரிய செங்கல் தூபியாகும். இதில் புத்தரின் இடுப்புப் பட்டி திருப்பண்டம் வைக்கப்பட்டுள்ளது.",

    # === LANKARAMA ===
    "Lankarama, traditionally attributed to King Valagamba in the 1st century BCE, is a circular relic house (Vatadage) built around a central stupa in Anuradhapura. The shrine occupies a raised circular platform approached by flighted stone steps with guardstones and balustrades. Around the central dome stand concentric circles of monolithic granite pillars with intricately carved lotus-shaped capitals, which once supported a conical timber roof protecting the relic monument. The quiet, compact layout exemplifies the refined domestic scale of ancient Sri Lankan Vatadage architecture.":
    "கிமு 1 ஆம் நூற்றாண்டில் வலகம்பா மன்னரால் கட்டப்பட்ட லங்காராமய, ஒரு வட்ட வடிவ தூபி இல்லமாகும் (வட்டதாகே). தூபியைச் சுற்றியுள்ள தாமரை மலர் செதுக்கப்பட்ட தூண்கள் பழங்கால மர கூரையைத் தாங்கி நின்றன.",

    # === LOVAMAHAPRASADA ===
    "Lovamahaprasada (the Brazen Palace) in Anuradhapura was a monumental multi-tiered chapter house built by King Dutugemunu in the 2nd century BCE for the Mahavihara fraternity. According to ancient chronicles, the structure originally stood nine storeys high with a roof covered in copper-bronze tiles that gave it its name. Today, the monument is defined by an expansive grid of approximately 1,600 dressed granite pillars arranged in forty parallel rows, which formed the foundational ground tier supporting the lost upper timber stories.":
    "கிமு 2 ஆம் நூற்றாண்டில் துட்டகைமுனு மன்னரால் கட்டப்பட்ட லோவாமகாபிராசாத ஒன்பது அடுக்கு மாளிகையாக இருந்தது. செப்பு ஓடுகள் வேயப்பட்டிருந்ததால் இது பிரேசன் அரண்மனை என்று அழைக்கப்பட்டது. இன்று 1,600 கல் தூண்கள் இதன் அடித்தளமாக காட்சியளிக்கின்றன.",

    # === ISURUMUNIYA ===
    "Isurumuniya Rajamaha Viharaya is a rock temple complex shaped around natural granite outcrops, a tranquil pond, and the cliffside shrine that overlooks the surrounding water gardens. Originating in the 3rd century BCE under King Devanampiyatissa and later enriched under King Kasyapa I, the site features cave dwellings, cliff-cut reliefs, and the iconic cliffside elephant carvings splashing beside the water basin. The museum and terrace house world-renowned stone sculptures including the 'Isurumuniya Lovers' and the 'Royal Family' relief panel.":
    "இசுறுமுனிய ரஜமகா விகாரை இயற்கை பாறைகள், குளம் மற்றும் குகைகளுடன் கூடிய கோவில் வளாகமாகும். உலகப் புகழ்பெற்ற 'இசுறுமுனிய காதலர்கள்' மற்றும் அரச குடும்ப சிற்பங்கள் இங்கு உள்ளன.",

    # === VESSAGIRIYA ===
    "Vessagiriya is a forest monastery arranged around three granite rock outcrops and a network of natural caves rather than monumental brick stupas. Dating from the 3rd century BCE, it provided shelter for hermit monks and includes numerous rock shelters fitted with drip ledges (Katarama) and Brahmi rock inscriptions recording donations by early royals and lay benefactors. Stone stairways carved directly into the living granite connect the hillside cells with meditation platforms, pond basins, and shaded walking terraces.":
    "வெஸ்ஸகிரிய என்பது மூன்று பாறைகள் மற்றும் இயற்கை குகைகளைச் சுற்றி அமைக்கப்பட்ட ஒரு காட்டு மடாலயமாகும். தியானத் துறவிகளுக்கான குகைகளும் பிராமி கல்வெட்டுகளும் இங்கு காணப்படுகின்றன.",

    # === MIHINTALE ===
    "Mihintale is a sacred mountain complex shaped by its dramatic granite landscape, monumental stairway, and network of ancient monastic terraces where Buddhism was officially introduced to Sri Lanka in 247 BCE. A grand flight of 1,840 wide granite steps rises through four distinct terraces shaded by Frangipani trees, leading to the Ambasthala Dagaba, the towering Mahaseya on the summit, and the Aradhana Gala (Rock of Inspiration). The mountain layout integrates monastic hospitals, refectory halls, lion-shaped water spouts, and rock-hewn caves.":
    "கிமு 247 இல் இலங்கைக்கு பௌத்தம் அறிமுகப்படுத்தப்பட்ட புனித மலையான மிஹிந்தலை, 1,840 கருங்கல் படிகளைக் கொண்ட அழகிய புனிதத் தலமாகும். அம்பஸ்தல தாகப, மகாசேய மற்றும் ஆராதனா பாறை ஆகியவை இங்கு அமைந்துள்ளன."
}

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in all_other_si.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in all_other_ta.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added blueprints for all other spots successfully!")
