# encoding: utf-8
import json
import re

# Load translations dictionary generator
# We will define SI and TA translations for all spots

si_translations = {
    # === ABHAYAGIRIYA ===
    "Abhayagiriya, the Abhayagiri Vihara in Anuradhapura, was founded during the reign of King Valagamba in the 2nd century BCE and grew into one of the most important monastic complexes of ancient Sri Lanka. Its most famous feature is the Abhayagiri Dagaba, a massive brick stupa with a rounded dome and a tall conical pinnacle, standing around 75 metres (246 ft) high. The site is also celebrated for its carved guard stones, moonstones, monastic courtyards, and the Kuttam Pokuna (Twin Ponds), which reflect the advanced engineering and artistry of the period. As a major centre of learning, Abhayagiriya became known for scholarship, ritual practice, and cross-cultural exchange, making it one of the defining religious and intellectual landmarks of early Anuradhapura.": 
    "අනුරාධපුර අභයගිරි විහාරය ක්‍රි.පූ. 2 වන සියවසේ වළගම්බා රජු දවස ආරම්භ කරන ලද අතර එය පුරාණ ශ්‍රී ලංකාවේ ප්‍රමුඛතම ආරණ්‍ය සේනාසනයක් බවට පත් විය. එහි ප්‍රධාන ලක්ෂණය වන්නේ මීටර් 75 ක් (අඩි 246) පමණ උසැති අර්ධ ගෝලාකාර ගර්භයකින් සහ උස් කොතකින් යුත් දැවැන්ත අභයගිරි දාගැබයි. කැටයම් කරන ලද මුරගල්, සඳකඩපහණ, ආරාම මළුවලින් සහ විශිෂ්ට ජල තාක්ෂණය විදහා දක්වන කුට්ටම් පොකුණෙන් මෙම පූජා භූමිය සමන්විත වේ. ජාත්‍යන්තර බෞද්ධ ශාස්ත්‍රාලෝකයේ කේන්ද්‍රස්ථානයක් ලෙස අභයගිරිය ශ්‍රී ලංකා ඉතිහාසයේ අද්විතීය සලකුණකි.",

    'Chapter 1: "The Great Black Sinhalese is Fleeing!" (The Royal Retreat)':
    '1 වන පරිච්ඡේදය: "මහා කළු සිංහලයා පලායයි!" (රාජකීය පසුබැසීම)',

    "The first century BCE had dawned. The throne of Anuradhapura in the island of Sri Lanka was occupied by a majestic young monarch named Vattagamani Abhaya, known to history by the name King Walagamba. While the first five months of his successful reign passed peacefully, dark storm clouds began to gather over the skies of Lanka. Seven ruthless South Indian Dravidian (Tamil) invaders, leading a massive army, simultaneously invaded the country. Due to the devastating Baminitiya Famine gripping the island at the time and internal rebellions splitting the nation, the King's royal army was severely weakened. Faced with the overwhelming might of the enemy, King Walagamba was forced to retreat from battle and temporarily abandon the city of Anuradhapura.":
    "ක්‍රිස්තු පූර්ව පළමු සියවස උදා විය. ශ්‍රී ලංකාවේ අනුරාධපුර රාජධානියේ සිංහාසනය වළගම්බා නමින් ඉතිහාසගත වූ වට්ටගාමිණී අභය නම් තරුණ රජතුමා විසින් හොබවන ලදී. සාමකාමී පාලන සමයකින් මාස පහකට පසු, දකුණු ඉන්දීය ද්‍රවිඩ ආක්‍රමණිකයන් සත් දෙනෙකු දැවැන්ත හමුදාවක් සමඟ රට ආක්‍රමණය කළහ. එකල පැවති බැමිණිතියා සාය සහ අභ්‍යන්තර කැරලි හේතුවෙන් රජුගේ හමුදාව දුර්වල වූ අතර, සතුරාගේ දැවැන්ත බලය හමුවේ වළගම්බා රජුට සටනින් පසුබැස අනුරාධපුර නගරය තාවකාලිකව අත්හැරීමට සිදු විය.",

    "The King, along with his chief queen Anula Devi, Queen Soma Devi, his two beloved infant sons (Prince Mahanaga and Prince Choolabhaya), and a handful of loyal royal ministers, boarded the royal chariot and sped away from Anuradhapura in the dark of night.":
    "රජතුමා තම ප්‍රධාන අගබිසව වූ අනුලා දේවිය, සෝමා දේවිය, කුඩා කුමාරවරුන් දෙදෙනා (මහානාග සහ චූලාභය) සහ විශ්වාසවන්ත මැති ඇමතිවරුන් සමඟ රාජකීය රථයට නැගී රාත්‍රී අඳුරේ අනුරාධපුරයෙන් නික්ම ගියේය.",

    "Seeing King Walagamba fleeing helplessly in his chariot past the Tittharama monastery (a Jain hermitage situated just outside the northern gate of Anuradhapura), a Jain ascetic named Giri Nigantha shouted loudly with malicious joy and contempt:":
    "අනුරාධපුර උතුරු දොරටුව අසල පිහිටි තිත්ථාරාම ජෛන ආරාමය පසුකර රථයෙන් පලායන වළගම්බා රජු දුටු ගිරි නිගණ්ඨ නම් ජෛන තවුසා මහත් සතුටින් සහ නින්දා සහගත ලෙස මෙසේ කෑගැසුවේය:",

    '"Look...! There goes the Great Black Sinhalese fleeing in terror...!"':
    '"බලව්...! අර මහා කළු සිංහලයා බියෙන් පලායයි...!"',

    "As the chariot sped past, these humiliating words struck the heart of King Walagamba like a poisoned arrow. Yet, maintaining royal composure, the King made a silent, unshakeable vow in his heart:":
    "රථය වේගයෙන් ඇදී යද්දී මෙම නින්දා සහගත වදන් වළගම්බා රජුගේ හදවතට විෂ පෙවූ ඊතලයක් මෙන් වැදුණි. එහෙත් රජතුමා ඉවසිලිවන්තව තම සිත තුළ නොසැලෙන අදිටනක් ඇති කර ගත්තේය:",

    '"When I someday reorganize my Sinhalese forces, destroy the enemy invaders, and reclaim my rightful throne... I shall tear down this insolent Nigantha\'s hermitage to the ground and build a grand Buddhist monastery in its place...!"':
    '"යම් දිනක මා සිංහල සේනාව සංවිධානය කර, ආක්‍රමණිකයන් පරදා නැවත සිංහාසනය ලබාගත් පසු... මා මේ නිගණ්ඨයාගේ ආරාමය බිමට සමතලා කර ඒ භූමියේ මහා බෞද්ධ විහාරයක් ඉදිකරන්නෙමි...!"',

    "Chapter 2: Fourteen Arduous Years in the Wilderness":
    "2 වන පරිච්ඡේදය: වනයේ ගත කළ දුෂ්කර දාහතර වසර",

    "The King’s journey into exile was exceptionally perilous and agonizing. As the enemy forces hotly pursued the royal chariot, the heavy load slowed the horses down. Seeing the enemy close in, Queen Soma Devi, who harbored a profound love for the King and the country, made a heroic and selfless decision. To save the King and the princes, she voluntarily stepped down from the chariot, allowing herself to be captured by the enemy. Due to her monumental sacrifice, the weight of the chariot was reduced, allowing the horses to gallop swiftly away. King Walagamba and the princes escaped safely into the dense wilderness, while the enemy captured Queen Soma Devi and carried her away to India as a prize of war.":
    "රජුගේ වනගත ගමන අතිශය භයානක විය. සතුරු හමුදා රථය හඹා එද්දී රථයේ බර නිසා අශ්වයන්ගේ වේගය අඩු විය. සතුරන් ළඟා වන බව දුටු සෝමා දේවිය රජු සහ කුමාරවරුන් බේරාගැනීම සඳහා ස්වේච්ඡාවෙන්ම රථයෙන් බැස සතුරන්ට යටත් වූවාය. ඇයගේ අසමසම පරිත්‍යාගය නිසා රථයේ බර අඩුවී අශ්වයන් වේගයෙන් දිව ගිය අතර රජු සහ කුමාරවරු ඝන වනාන්තරයට පිවිස දිවි ගලවා ගත්හ. සතුරන් සෝමා දේවිය අල්ලාගෙන ඉන්දියාවට රැගෙන ගියහ.",

    "The King's journey into exile was exceptionally perilous and agonizing. As the enemy forces hotly pursued the royal chariot, the heavy load slowed the horses down. Seeing the enemy close in, Queen Soma Devi, who harbored a profound love for the King and the country, made a heroic and selfless decision. To save the King and the princes, she voluntarily stepped down from the chariot, allowing herself to be captured by the enemy. Due to her monumental sacrifice, the weight of the chariot was reduced, allowing the horses to gallop swiftly away. King Walagamba and the princes escaped safely into the dense wilderness, while the enemy captured Queen Soma Devi and carried her away to India as a prize of war.":
    "රජුගේ වනගත ගමන අතිශය භයානක විය. සතුරු හමුදා රථය හඹා එද්දී රථයේ බර නිසා අශ්වයන්ගේ වේගය අඩු විය. සතුරන් ළඟා වන බව දුටු සෝමා දේවිය රජු සහ කුමාරවරුන් බේරාගැනීම සඳහා ස්වේච්ඡාවෙන්ම රථයෙන් බැස සතුරන්ට යටත් වූවාය. ඇයගේ අසමසම පරිත්‍යාගය නිසා රථයේ බර අඩුවී අශ්වයන් වේගයෙන් දිව ගිය අතර රජු සහ කුමාරවරු ඝන වනාන්තරයට පිවිස දිවි ගලවා ගත්හ. සතුරන් සෝමා දේවිය අල්ලාගෙන ඉන්දියාවට රැගෙන ගියහ.",

    "For the next fourteen (14) years, King Walagamba lived in hiding within remote, dark jungle caves across the central highlands and the Malaya region of Lanka, including sites like Sewagala, Vessagiriya, and the Matula Aluvihara (the Aluvihara Temple in Matale). Throughout this prolonged period, the Maha Sangha, led by the enlightened monk Arahat Kupikkala Maha Tissa, supported and protected the King like a shadow. The King endured immense hardships, hunting and foraging for wild roots to survive.":
    "ඉන්පසු වසර දාහතරක් පුරා වළගම්බා රජු සේවාගල, වෙස්සගිරිය සහ මාතලේ අලුවිහාරය වැනි මධ්‍යම කඳුකරයේ සහ මලය රටේ දුෂ්කර ගල් ලෙන් තුළ සැඟවී ජීවත් විය. කුපික්කල මහාතිස්ස මහ රහතන් වහන්සේ ප්‍රමුඛ මහා සංඝරත්නය සෙවණැල්ලක් සේ රජුට රැකවරණය සැලසූහ. රජතුමා අල මුල් ආහාරයට ගනිමින් මහත් දුක් ගැහැට වින්දේය.",

    "Yet, despite these brutal adversities, the King never abandoned his resolve. He traversed the country in secret, systematically organizing his forces. Thousands of heroic Sinhalese youths, prepared to sacrifice their lives for their country and religion, rallied around the King's banner. After 14 years of rigorous preparation and military training, the grand Sinhalese army marched toward Anuradhapura, their battle cries echoing like roaring lions. A fierce, bloody war ensued. Under King Walagamba’s brilliant military strategies, the Dravidian rulers were defeated one by one. Ultimately, King Walagamba recaptured Anuradhapura and was consecrated as the supreme emperor of Lanka for the second time. He subsequently sent an emissary to India and brought Queen Soma Devi back to Lanka with grand royal honors.":
    "එසේ වුවද රජතුමා තම අදිටන අත්නොහළේය. රහසිගතව රට පුරා ගමන් කරමින් සේනාවන් සංවිධානය කළේය. රට දැය සමය වෙනුවෙන් දිවි පිදීමට සැරසුණු දහස් ගණන් සිංහල තරුණයෝ රජු වටා රොක් වූහ. වසර 14 ක පුහුණුවෙන් පසු අනුරාධපුරය දෙසට ගමන් කළ හමුදාව ආක්‍රමණිකයන් එකිනෙකා පරාජය කළහ. අවසානයේ වළගම්බා රජු අනුරාධපුරය මුදාගෙන දෙවන වරටත් ලක්දිව කිරුළ පැළඳීය. පසුව ඉන්දියාවට දූතයන් යවා සෝමා දේවිය මහත් රාජකීය ගෞරවයෙන් නැවත ලක්දිවට වැඩමවා ගත්තේය.",

    "Yet, despite these brutal adversities, the King never abandoned his resolve. He traversed the country in secret, systematically organizing his forces. Thousands of heroic Sinhalese youths, prepared to sacrifice their lives for their country and religion, rallied around the King's banner. After 14 years of rigorous preparation and military training, the grand Sinhalese army marched toward Anuradhapura, their battle cries echoing like roaring lions. A fierce, bloody war ensued. Under King Walagamba's brilliant military strategies, the Dravidian rulers were defeated one by one. Ultimately, King Walagamba recaptured Anuradhapura and was consecrated as the supreme emperor of Lanka for the second time. He subsequently sent an emissary to India and brought Queen Soma Devi back to Lanka with grand royal honors.":
    "එසේ වුවද රජතුමා තම අදිටන අත්නොහළේය. රහසිගතව රට පුරා ගමන් කරමින් සේනාවන් සංවිධානය කළේය. රට දැය සමය වෙනුවෙන් දිවි පිදීමට සැරසුණු දහස් ගණන් සිංහල තරුණයෝ රජු වටා රොක් වූහ. වසර 14 ක පුහුණුවෙන් පසු අනුරාධපුරය දෙසට ගමන් කළ හමුදාව ආක්‍රමණිකයන් එකිනෙකා පරාජය කළහ. අවසානයේ වළගම්බා රජු අනුරාධපුරය මුදාගෙන දෙවන වරටත් ලක්දිව කිරුළ පැළඳීය. පසුව ඉන්දියාවට දූතයන් යවා සෝමා දේවිය මහත් රාජකීය ගෞරවයෙන් නැවත ලක්දිවට වැඩමවා ගත්තේය.",

    "Chapter 3: A Sacred Name Arising from the Grounds of Humiliation":
    "3 වන පරිච්ඡේදය: නින්දාවේ භූමියෙන් උපන් පූජනීය නාමය",

    "Upon reclaiming the sovereignty of the island, King Walagamba had not forgotten for a single moment the humiliating insult cast by Giri Nigantha during his retreat. The King immediately summoned his royal army and ordered them to completely demolish the monastery of Giri Nigantha, leveling its buildings to the ground. Seeing the approach of the King, Giri Nigantha fled the country in terror.":
    "රටේ ස්වෛරීභාවය දිනාගත් පසු, වළගම්බා රජුට පසුබැසීමේදී ගිරි නිගණ්ඨයා කළ නින්දාව මොහොතකටවත් අමතක නොවීය. රජතුමා වහාම තම හමුදාව කැඳවා ගිරි නිගණ්ඨයාගේ ආරාමය සම්පූර්ණයෙන්ම බිඳ දමා බිමට සමතලා කරන ලෙස අණ කළේය. රජු පැමිණෙනු දුටු ගිරි නිගණ්ඨයා බියෙන් රට හැර පලා ගියේය.",

    "The King purified the land and integrated it with adjacent sacred sites previously designated by Arahat Mahinda, initiating the construction of a massive Buddhist monastic complex and a colossal stupa.":
    "රජතුමා එම භූමිය පවිත්‍ර කර, මිහිඳු මහ රහතන් වහන්සේ විසින් නම් කරන ලද පූජනීය ස්ථාන සමඟ එක්කර මහා බෞද්ධ ආරාම සංකීර්ණයක් සහ දැවැන්ත ස්තූපයක් ඉදිකිරීම ආරම්භ කළේය.",

    'When naming this grand new monastery, the King made a highly intelligent and timeless historical decision. Blending his own name, "Abhaya", with the name of the Nigantha who previously owned the monastery, "Giri", he named this sacred sanctuary the "Abhayagiri Vihara". Through this, the King demonstrated to the world how the insults and defeats directed at a man can, through unwavering resolve, be transformed into monumental triumphs and magnificent shrines of pristine white.':
    'මෙම නව විහාරය නම් කිරීමේදී රජතුමා ඥානාන්විත ඓතිහාසික තීරණයක් ගත්තේය. තම නම වූ "අභය" සහ ආරාමය හිමිව තිබූ නිගණ්ඨයාගේ නම වූ "ගිරි" එක්කර මෙම පූජනීය සිද්ධස්ථානය "අභයගිරි විහාරය" ලෙස නම් කළේය. මිනිසෙකුට එල්ල වන නින්දා සහ පරාජයන් නොසැලෙන අධිෂ්ඨානයෙන් මහා ජයග්‍රහණ සහ සුදෝසුදු පූජනීය සිද්ධස්ථාන බවට පත්කළ හැකි අයුරු රජු ලොවට පෙන්වා දුන්නේය.',

    "Out of his boundless gratitude toward Arahat Kupikkala Maha Tissa, who had protected his life during his grueling exile in the forest, the King offered the Abhayagiri Vihara to him personally. (This personal offering later led to the first ecclesiastical schism in Sri Lanka, creating an independent school of thought distinct from the traditional Maha Vihara).":
    "වනයේ දුෂ්කර කාලයේ තම දිවි රැකදුන් කුපික්කල මහාතිස්ස මහ රහතන් වහන්සේ කෙරෙහි වූ අප්‍රමාණ කෘතගුණ සැලකීමක් ලෙස රජතුමා අභයගිරි විහාරය උන්වහන්සේට පෞද්ගලිකව පූජා කළේය. (මෙම පූජාව පසුකාලීනව මහා විහාරයෙන් බැහැර වූ ස්වාධීන සම්ප්‍රදායක් බිහිවීමට මුල් විය).",

    "Chapter 4: The Architecture of the Monumental Stupa that Awed the World":
    "4 වන පරිච්ඡේදය: ලොව මවිත කළ මහා සෑයේ වාස්තු විද්‍යාව",

    "The central and most majestic feature of the Abhayagiri Vihara was the sky-high Abhayagiri Maha Stupa. Initially constructed by King Walagamba, the stupa was subsequently expanded on a colossal scale and beautifully renovated by later great monarchs, most notably King Gajabahu I and King Parakramabahu the Great.":
    "අභයගිරි විහාරයේ ප්‍රධානතම අංගය වූයේ අහස උසට නැඟුණු අභයගිරි මහා ස්තූපයයි. වළගම්බා රජු විසින් ආරම්භ කළ මෙම සෑය පසුකාලීනව පළමුවන ගජබාහු රජු සහ මහා පරාක්‍රමබාහු රජු විසින් විශාල ලෙස ප්‍රතිසංස්කරණය කර පුළුල් කරන ලදී.",

    "The Abhayagiri Stupa was designed in the Bubbulakara (bubble) shape (though some sources indicate its original shape was Dhanyakara, a heap of paddy, before being modified to a bubble shape). Its scale and architectural engineering struck the ancient world with absolute wonder:":
    "අභයගිරි ස්තූපය බුබ්බුලාකාර (දිය බුබුලක හැඩැති) ආකාරයෙන් නිමවා ඇත. එහි විශාලත්වය සහ වාස්තු විද්‍යාත්මක ශිල්පක්‍රම පුරාණ ලෝකය මවිතයට පත් කළේය:",

    "Engineering Marvel: It soared to a height of over 370 feet (more than 110 meters), making it the second-largest brick structure in the ancient world, surpassed only by the Great Pyramid of Giza in Egypt.":
    "ඉංජිනේරු විස්මිතය: අඩි 370 කට වඩා (මීටර් 110 කට අධික) උසකට විහිදුණු මෙය, ඊජිප්තුවේ ගීසා පිරමිඩයට පමණක් දෙවැනි වූ පුරාණ ලෝකයේ දෙවන විශාලතම ගඩොල් නිර්මාණය විය.",

    "Massive Scale: Hundreds of millions of burnt clay bricks were utilized to build this giant monument, incorporating remarkably advanced ancient structural engineering techniques.":
    "දැවැන්ත ප්‍රමාණය: උසස් වාස්තු විද්‍යා තාක්ෂණය යොදාගනිමින් මෙම දැවැන්ත ස්මාරකය ඉදිකිරීම සඳහා පිළිස්සූ මැටි ගඩොල් කෝටි ගණනක් භාවිතා කරන ලදී.",

    "Intricate Artistry: The Wahalkada (frontispieces) constructed at the four cardinal points were adorned with exquisite carvings of swans, lions, and dwarfs (Vamana figures), and embellished with precious gemstones.":
    "විචිත්‍රවත් කැටයම්: සතර දිශාවේ ඉදිකරන ලද වාහල්කඩ හංස, සිංහ සහ වාමන රූප කැටයම්වලින්ද, මැණික් වර්ගවලින්ද අලංකාරවත් ලෙස සරසා තිබුණි.",

    "Sacred Enshrinement: Enshrined deep within the massive dome (Garbha) of the stupa were sacred bodily relics of the Buddha, invaluable Dhamma discourses etched onto golden plates, and a vast repository of offerings crafted from gold, silver, pearls, and gems.":
    "ධාතු නිධානය: සෑ ගර්භය තුළ බුදුරජාණන් වහන්සේගේ ශ්‍රී සර්වඥ ධාතූන් වහන්සේලා, රන් පත්තිරුවල ලියන ලද අගනා ධර්ම ග්‍රන්ථ සහ රන්, රිදී, මුතු මැණික් පූජාවන් තැන්පත් කර තිබුණි.",

    "Chapter 5: The International University and the Grand Glory of Abhayagiri":
    "5 වන පරිච්ඡේදය: ජාත්‍යන්තර විශ්වවිද්‍යාලය සහ අභයගිරියේ මහා තේජස",

    "Over time, Abhayagiri evolved beyond a mere religious site to become the largest International Buddhist University in the Asian region.":
    "කාලයත් සමඟ අභයගිරිය ආගමික ස්ථානයකට පමණක් සීමා නොවී ආසියානු කලාපයේ විශාලතම ජාත්‍යන්තර බෞද්ධ විශ්වවිද්‍යාලය බවට පත් විය.",

    "While the traditional Maha Vihara preserved Orthodox Theravada Buddhism in its pristine form, Abhayagiri opened its doors to Mahayana concepts, foreign Buddhist ideologies, and various secular sciences from around the world. As a result:":
    "මහා විහාරය ථේරවාද බුදුදහම ආරක්ෂා කරද්දී, අභයගිරිය මහායාන අදහස්, විදේශීය බෞද්ධ මතවාද සහ විවිධ ලෞකික විද්‍යාවන් සඳහා දොරටු විවර කළේය. එහි ප්‍රතිඵලයක් ලෙස:",

    "Global Academic Hub: During its golden era, the Abhayagiri monastic complex housed over 5,000 monks from various corners of the globe, all residing together to study the Dhamma and diverse academic disciplines.":
    "ගෝලීය ශාස්ත්‍රීය කේන්ද්‍රය: ස්වර්ණමය යුගයේදී ලොව නන් දෙසින් පැමිණි භික්ෂූන් වහන්සේලා 5,000 කට අධික පිරිසක් ධර්මය හා විවිධ විෂයයන් හැදෑරීමට මෙහි වැඩවාසය කළහ.",

    "The Chronicle of Fa-Hien: In the 5th century CE, the famous Chinese traveling monk, Faxian (Fa-Hien), arrived in Lanka via India. He resided at Abhayagiri for two full years, meticulously copying rare Dhamma texts and palm-leaf manuscripts to take back to China. In his travelogues, he highly extolled the grand prosperity, jewel-encrusted shrines, and magnificent rituals of Abhayagiri.":
    "පාහියන් හිමියන්ගේ වාර්තාව: ක්‍රි.ව. 5 වන සියවසේදී මෙරටට වැඩම කළ සුප්‍රකට චීන ජාතික පාහියන් හිමියෝ වසර දෙකක් අභයගිරියේ වැඩවාසය කරමින් දුර්ලභ ධර්ම ග්‍රන්ථ පිටපත් කර චීනයට රැගෙන ගියහ. උන්වහන්සේගේ දේශාටන වාර්තාවල අභයගිරියේ සෞභාග්‍යය සහ පූජා චාරිත්‍ර ඉමහත් ලෙස වර්ණනා කර ඇත.",

    "Guardianship of the Tooth Relic: When the Sacred Tooth Relic (Dantha Dhatu)—the crest-jewel of Sri Lanka currently housed in Kandy—was first brought to the island during the reign of King Kithsirimevan, the King safely deposited it at the Abhayagiri Vihara, establishing an annual grand procession (Perahera) and state festivals in its honor.":
    "දළදා වහන්සේගේ භාරකාරත්වය: කිත්සිරිමෙවන් රජ දවස ශ්‍රී දන්ත ධාතූන් වහන්සේ ලක්දිවට වැඩම කළ විට රජතුමා එය සුරක්ෂිතව තැන්පත් කළේ අභයගිරි විහාරයේ වන අතර, වාර්ෂික මහා පෙරහැර සහ රාජ්‍ය උත්සව පැවැත්වීම ආරම්භ කළේය.",

    "Guardianship of the Tooth Relic: When the Sacred Tooth Relic (Dantha Dhatu)the crest-jewel of Sri Lanka currently housed in Kandywas first brought to the island during the reign of King Kithsirimevan, the King safely deposited it at the Abhayagiri Vihara, establishing an annual grand procession (Perahera) and state festivals in its honor.":
    "දළදා වහන්සේගේ භාරකාරත්වය: කිත්සිරිමෙවන් රජ දවස ශ්‍රී දන්ත ධාතූන් වහන්සේ ලක්දිවට වැඩම කළ විට රජතුමා එය සුරක්ෂිතව තැන්පත් කළේ අභයගිරි විහාරයේ වන අතර, වාර්ෂික මහා පෙරහැර සහ රාජ්‍ය උත්සව පැවැත්වීම ආරම්භ කළේය.",

    "Timeless Artistic Masterpieces: The Kuttam Pokuna (Twin Ponds)—a miraculous feat of ancient hydraulic engineering—and the world-renowned Samadhi Buddha Statue, which imparts a sense of profound serenity to all who gaze upon it, still stand intact within the Abhayagiri grounds as living testimonies to its peerless artistic heritage.":
    "අමරණීය කලා නිර්මාණ: පුරාණ ජල තාක්ෂණයේ ආශ්චර්යයක් වන කුට්ටම් පොකුණ සහ නරඹන්නාට අප්‍රමාණ ශාන්තියක් ලබාදෙන ලෝකප්‍රකට සමාධි බුදු පිළිමය අභයගිරියේ අසමසම කලා උරුමය විදහා දක්වමින් අදටත් නොනැසී පවතී.",

    "Timeless Artistic Masterpieces: The Kuttam Pokuna (Twin Ponds)a miraculous feat of ancient hydraulic engineeringand the world-renowned Samadhi Buddha Statue, which imparts a sense of profound serenity to all who gaze upon it, still stand intact within the Abhayagiri grounds as living testimonies to its peerless artistic heritage.":
    "අමරණීය කලා නිර්මාණ: පුරාණ ජල තාක්ෂණයේ ආශ්චර්යයක් වන කුට්ටම් පොකුණ සහ නරඹන්නාට අප්‍රමාණ ශාන්තියක් ලබාදෙන ලෝකප්‍රකට සමාධි බුදු පිළිමය අභයගිරියේ අසමසම කලා උරුමය විදහා දක්වමින් අදටත් නොනැසී පවතී."
}

ta_translations = {
    # === ABHAYAGIRIYA ===
    "Abhayagiriya, the Abhayagiri Vihara in Anuradhapura, was founded during the reign of King Valagamba in the 2nd century BCE and grew into one of the most important monastic complexes of ancient Sri Lanka. Its most famous feature is the Abhayagiri Dagaba, a massive brick stupa with a rounded dome and a tall conical pinnacle, standing around 75 metres (246 ft) high. The site is also celebrated for its carved guard stones, moonstones, monastic courtyards, and the Kuttam Pokuna (Twin Ponds), which reflect the advanced engineering and artistry of the period. As a major centre of learning, Abhayagiriya became known for scholarship, ritual practice, and cross-cultural exchange, making it one of the defining religious and intellectual landmarks of early Anuradhapura.":
    "அனுராதபுர அபயகிரி விகாரை கிமு 2 ஆம் நூற்றாண்டில் வலகம்பா மன்னரின் ஆட்சியில் நிறுவப்பட்டது மற்றும் பண்டைய இலங்கையின் மிக முக்கியமான துறவற வளாகங்களில் ஒன்றாக வளர்ந்தது. இதன் மிகவும் பிரபலமான அம்சம் சுமார் 75 மீட்டர் (246 அடி) உயரமுள்ள பிரம்மாண்டமான செங்கல் தூபியான அபயகிரி தாகபமாகும். செதுக்கப்பட்ட காவல் கற்கள், சந்திரவட்டக்கல், மற்றும் குட்டம் பொகுண (இரட்டை குளங்கள்) ஆகியவை இப்பகுதியின் சிறப்புகளாகும். சர்வதேச பௌத்த கல்வி மற்றும் ஆன்மீக பரிமாற்ற மையமாக அபயகிரி விளங்கியது.",

    'Chapter 1: "The Great Black Sinhalese is Fleeing!" (The Royal Retreat)':
    'அத்தியாயம் 1: "பெரும் கருப்பு சிங்களவன் தப்பி ஓடுகிறான்!" (அரச பின்வாங்கல்)',

    "The first century BCE had dawned. The throne of Anuradhapura in the island of Sri Lanka was occupied by a majestic young monarch named Vattagamani Abhaya, known to history by the name King Walagamba. While the first five months of his successful reign passed peacefully, dark storm clouds began to gather over the skies of Lanka. Seven ruthless South Indian Dravidian (Tamil) invaders, leading a massive army, simultaneously invaded the country. Due to the devastating Baminitiya Famine gripping the island at the time and internal rebellions splitting the nation, the King's royal army was severely weakened. Faced with the overwhelming might of the enemy, King Walagamba was forced to retreat from battle and temporarily abandon the city of Anuradhapura.":
    "கிமு முதல் நூற்றாண்டு விடிந்தது. இலங்கைத் தீவின் அனுராதபுர அரியணையில் வலகம்பா என்று வரலாற்றில் அறியப்படும் வட்டகாமினி அபய என்ற இளம் மன்னர் ஆட்சி செய்தார். அமைதியான ஐந்து மாத ஆட்சிக்குப் பிறகு, தென்னிந்தியாவிலிருந்து ஏழு படையெடுப்பாளர்கள் பெரும் படையுடன் நாட்டை ஆக்கிரமித்தனர். நாட்டில் நிலவிய பஞ்சம் மற்றும் உள்நாட்டுக் குழப்பங்கள் காரணமாக மன்னரின் படை பலவீனமடைந்தது. இதனால் மன்னர் போர்க்களத்திலிருந்து பின்வாங்கி தற்காலிகமாக நகரத்தை விட்டு வெளியேற வேண்டியதாயிற்று.",

    "The King, along with his chief queen Anula Devi, Queen Soma Devi, his two beloved infant sons (Prince Mahanaga and Prince Choolabhaya), and a handful of loyal royal ministers, boarded the royal chariot and sped away from Anuradhapura in the dark of night.":
    "மன்னர் தனது பிரதான ராணி அனுலா தேவி, சோமா தேவி, இரண்டு இளவரசர்கள் மற்றும் விசுவாசமான அமைச்சர்களுடன் அரச ரதத்தில் ஏறி இரவோடிரவாக அனுராதபுரத்திலிருந்து தப்பிச் சென்றார்.",

    "Seeing King Walagamba fleeing helplessly in his chariot past the Tittharama monastery (a Jain hermitage situated just outside the northern gate of Anuradhapura), a Jain ascetic named Giri Nigantha shouted loudly with malicious joy and contempt:":
    "அனுராதபுரத்தின் வடக்கு வாயிலுக்கு வெளியே இருந்த தித்தாராம சமண ஆசிரமத்தைக் கடந்து மன்னர் ரதத்தில் செல்வதைக் கண்ட கிரி நிகண்டன் என்ற துறவி கேலியாகக் கத்தினான்:",

    '"Look...! There goes the Great Black Sinhalese fleeing in terror...!"':
    '"பாருங்கள்...! அங்கே பெரும் கருப்பு சிங்களவன் பயந்து ஓடுகிறான்...!"',

    "As the chariot sped past, these humiliating words struck the heart of King Walagamba like a poisoned arrow. Yet, maintaining royal composure, the King made a silent, unshakeable vow in his heart:":
    "ரதம் விரைந்து செல்கையில் இந்த அவமானகரமான வார்த்தைகள் மன்னரின் இதயத்தில் நச்சு அம்பாகப் பாய்ந்தன. எனினும் மன்னர் தனது மனதில் ஒரு உறுதியான சபதம் செய்தார்:",

    '"When I someday reorganize my Sinhalese forces, destroy the enemy invaders, and reclaim my rightful throne... I shall tear down this insolent Nigantha\'s hermitage to the ground and build a grand Buddhist monastery in its place...!"':
    '"நான் ஒரு நாள் எனது படைகளை மீண்டும் ஒன்றுதிரட்டி, ஆக்கிரமிப்பாளர்களை அழித்து அரியணையை மீட்டெடுக்கும் போது... இந்த கர்வம்கொண்ட நிகண்டனின் ஆசிரமத்தை தரைமட்டமாக்கி அவ்விடத்தில் ஒரு பிரம்மாண்ட பௌத்த விகாரையைக் கட்டுவேன்...!"',

    "Chapter 2: Fourteen Arduous Years in the Wilderness":
    "அத்தியாயம் 2: காட்டில் கழித்த பதினான்கு கடினமான ஆண்டுகள்",

    "The King’s journey into exile was exceptionally perilous and agonizing. As the enemy forces hotly pursued the royal chariot, the heavy load slowed the horses down. Seeing the enemy close in, Queen Soma Devi, who harbored a profound love for the King and the country, made a heroic and selfless decision. To save the King and the princes, she voluntarily stepped down from the chariot, allowing herself to be captured by the enemy. Due to her monumental sacrifice, the weight of the chariot was reduced, allowing the horses to gallop swiftly away. King Walagamba and the princes escaped safely into the dense wilderness, while the enemy captured Queen Soma Devi and carried her away to India as a prize of war.":
    "மன்னரின் வன வாழ்க்கை பயணம் மிகவும் ஆபத்தானதாக இருந்தது. எதிரிகள் ரதத்தைத் துரத்தி வந்தபோது, அதிக எடை காரணமாக குதிரைகள் மெதுவாக ஓடின. மன்னரையும் இளவரசர்களையும் காப்பாற்ற சோமா தேவி தானாகவே ரதத்திலிருந்து இறங்கி எதிரிகளிடம் பிடிபட்டார். அவரது தியாகத்தால் ரதம் வேகமாக ஓடி மன்னர் தப்பினார். எதிரிகள் சோமா தேவியை இந்தியாவுக்குக் கொண்டு சென்றனர்.",

    "The King's journey into exile was exceptionally perilous and agonizing. As the enemy forces hotly pursued the royal chariot, the heavy load slowed the horses down. Seeing the enemy close in, Queen Soma Devi, who harbored a profound love for the King and the country, made a heroic and selfless decision. To save the King and the princes, she voluntarily stepped down from the chariot, allowing herself to be captured by the enemy. Due to her monumental sacrifice, the weight of the chariot was reduced, allowing the horses to gallop swiftly away. King Walagamba and the princes escaped safely into the dense wilderness, while the enemy captured Queen Soma Devi and carried her away to India as a prize of war.":
    "மன்னரின் வன வாழ்க்கை பயணம் மிகவும் ஆபத்தானதாக இருந்தது. எதிரிகள் ரதத்தைத் துரத்தி வந்தபோது, அதிக எடை காரணமாக குதிரைகள் மெதுவாக ஓடின. மன்னரையும் இளவரசர்களையும் காப்பாற்ற சோமா தேவி தானாகவே ரதத்திலிருந்து இறங்கி எதிரிகளிடம் பிடிபட்டார். அவரது தியாகத்தால் ரதம் வேகமாக ஓடி மன்னர் தப்பினார். எதிரிகள் சோமா தேவியை இந்தியாவுக்குக் கொண்டு சென்றனர்.",

    "For the next fourteen (14) years, King Walagamba lived in hiding within remote, dark jungle caves across the central highlands and the Malaya region of Lanka, including sites like Sewagala, Vessagiriya, and the Matula Aluvihara (the Aluvihara Temple in Matale). Throughout this prolonged period, the Maha Sangha, led by the enlightened monk Arahat Kupikkala Maha Tissa, supported and protected the King like a shadow. The King endured immense hardships, hunting and foraging for wild roots to survive.":
    "அடுத்த 14 ஆண்டுகள் வலகம்பா மன்னர் சேவாகல, வெஸ்ஸகிரிய மற்றும் மாத்தளை அலுவிஹாரை போன்ற அடர்ந்த காட்டு குகைகளில் ஒளிந்து வாழ்ந்தார். குபிக்கல மகா திஸ்ஸ தேரர் தலைமையிலான மகா சங்கத்தினர் மன்னரைப் பாதுகாத்தனர்.",

    "Yet, despite these brutal adversities, the King never abandoned his resolve. He traversed the country in secret, systematically organizing his forces. Thousands of heroic Sinhalese youths, prepared to sacrifice their lives for their country and religion, rallied around the King's banner. After 14 years of rigorous preparation and military training, the grand Sinhalese army marched toward Anuradhapura, their battle cries echoing like roaring lions. A fierce, bloody war ensued. Under King Walagamba’s brilliant military strategies, the Dravidian rulers were defeated one by one. Ultimately, King Walagamba recaptured Anuradhapura and was consecrated as the supreme emperor of Lanka for the second time. He subsequently sent an emissary to India and brought Queen Soma Devi back to Lanka with grand royal honors.":
    "மன்னர் தனது உறுதியை ஒருபோதும் கைவிடவில்லை. 14 ஆண்டுகால தயாரிப்புக்குப் பிறகு தனது படையுடன் அனுராதபுரத்தை நோக்கி முன்னேறி எதிரிகளைத் தோற்கடித்தார். வலகம்பா மன்னர் மீண்டும் இலங்கையின் பேரரசராக முடிசூடினார். சோமா தேவியை மீண்டும் நாட்டிற்கு அழைத்து வந்தார்.",

    "Yet, despite these brutal adversities, the King never abandoned his resolve. He traversed the country in secret, systematically organizing his forces. Thousands of heroic Sinhalese youths, prepared to sacrifice their lives for their country and religion, rallied around the King's banner. After 14 years of rigorous preparation and military training, the grand Sinhalese army marched toward Anuradhapura, their battle cries echoing like roaring lions. A fierce, bloody war ensued. Under King Walagamba's brilliant military strategies, the Dravidian rulers were defeated one by one. Ultimately, King Walagamba recaptured Anuradhapura and was consecrated as the supreme emperor of Lanka for the second time. He subsequently sent an emissary to India and brought Queen Soma Devi back to Lanka with grand royal honors.":
    "மன்னர் தனது உறுதியை ஒருபோதும் கைவிடவில்லை. 14 ஆண்டுகால தயாரிப்புக்குப் பிறகு தனது படையுடன் அனுராதபுரத்தை நோக்கி முன்னேறி எதிரிகளைத் தோற்கடித்தார். வலகம்பா மன்னர் மீண்டும் இலங்கையின் பேரரசராக முடிசூடினார். சோமா தேவியை மீண்டும் நாட்டிற்கு அழைத்து வந்தார்.",

    "Chapter 3: A Sacred Name Arising from the Grounds of Humiliation":
    "அத்தியாயம் 3: அவமானத்தின் நிலத்திலிருந்து தோன்றிய புனிதப் பெயர்",

    "Upon reclaiming the sovereignty of the island, King Walagamba had not forgotten for a single moment the humiliating insult cast by Giri Nigantha during his retreat. The King immediately summoned his royal army and ordered them to completely demolish the monastery of Giri Nigantha, leveling its buildings to the ground. Seeing the approach of the King, Giri Nigantha fled the country in terror.":
    "அரியணையை மீட்ட பிறகு, கிரி நிகண்டன் செய்த அவமானத்தை மன்னர் மறக்கவில்லை. அவனது ஆசிரமத்தை முழுமையாக இடித்து தரைமட்டமாக்க உத்தரவிட்டார். மன்னர் வருவதைக் கண்டு கிரி நாட்டை விட்டு தப்பியோடினான்.",

    "The King purified the land and integrated it with adjacent sacred sites previously designated by Arahat Mahinda, initiating the construction of a massive Buddhist monastic complex and a colossal stupa.":
    "மன்னர் அந்த நிலத்தை தூய்மைப்படுத்தி, அங்கு ஒரு பிரம்மாண்டமான பௌத்த விகாரையையும் பெரிய தூபியையும் கட்டத் தொடங்கினார்.",

    'When naming this grand new monastery, the King made a highly intelligent and timeless historical decision. Blending his own name, "Abhaya", with the name of the Nigantha who previously owned the monastery, "Giri", he named this sacred sanctuary the "Abhayagiri Vihara". Through this, the King demonstrated to the world how the insults and defeats directed at a man can, through unwavering resolve, be transformed into monumental triumphs and magnificent shrines of pristine white.':
    'இந்த புதிய விகாரைக்கு பெயரிடும் போது, தனது பெயரான "அபய" மற்றும் நிகண்டனின் பெயரான "கிரி" ஆகியவற்றை இணைத்து "அபயகிரி விகாரை" என்று பெயரிட்டார். அவமானங்களை பெரும் வெற்றிகளாக மாற்ற முடியும் என்பதை இதன் மூலம் உணர்த்தினார்.',

    "Out of his boundless gratitude toward Arahat Kupikkala Maha Tissa, who had protected his life during his grueling exile in the forest, the King offered the Abhayagiri Vihara to him personally. (This personal offering later led to the first ecclesiastical schism in Sri Lanka, creating an independent school of thought distinct from the traditional Maha Vihara).":
    "காட்டில் தனது உயிரைப் பாதுகாத்த குபிக்கல மகா திஸ்ஸ தேரருக்கு அபயகிரி விகாரையை மன்னர் தனிப்பட்ட முறையில் அர்ப்பணித்தார்.",

    "Chapter 4: The Architecture of the Monumental Stupa that Awed the World":
    "அத்தியாயம் 4: உலகை வியக்க வைத்த பிரம்மாண்ட தூபியின் கட்டிடக்கலை",

    "The central and most majestic feature of the Abhayagiri Vihara was the sky-high Abhayagiri Maha Stupa. Initially constructed by King Walagamba, the stupa was subsequently expanded on a colossal scale and beautifully renovated by later great monarchs, most notably King Gajabahu I and King Parakramabahu the Great.":
    "அபயகிரி விகாரையின் மைய அம்சம் வானுயர்ந்த அபயகிரி மகா தூபியாகும். வலகம்பா மன்னரால் கட்டப்பட்டு பின்னர் கஜபாகு மற்றும் மகா பராக்கிரமபாகு மன்னர்களால் புனரமைக்கப்பட்டது.",

    "The Abhayagiri Stupa was designed in the Bubbulakara (bubble) shape (though some sources indicate its original shape was Dhanyakara, a heap of paddy, before being modified to a bubble shape). Its scale and architectural engineering struck the ancient world with absolute wonder:":
    "அபயகிரி தூபி குமிழி வடிவில் வடிவமைக்கப்பட்டது. இதன் பிரம்மாண்டமும் கட்டிடக்கலையும் பண்டைய உலகை வியப்பில் ஆழ்த்தியது:",

    "Engineering Marvel: It soared to a height of over 370 feet (more than 110 meters), making it the second-largest brick structure in the ancient world, surpassed only by the Great Pyramid of Giza in Egypt.":
    "பொறியியல் அற்புதம்: 370 அடிக்கும் மேல் (110 மீட்டருக்கும் மேல்) உயர்ந்து, எகிப்தின் கீஸா பிரமிடுக்கு அடுத்தபடியாக பண்டைய உலகின் இரண்டாவது பெரிய செங்கல் அமைப்பாக திகழ்ந்தது.",

    "Massive Scale: Hundreds of millions of burnt clay bricks were utilized to build this giant monument, incorporating remarkably advanced ancient structural engineering techniques.":
    "பிரம்மாண்ட அளவு: கோடிக்கணக்கான சுட்ட செங்கற்கள் பயன்படுத்தப்பட்டு மிக நவீன தொழில்நுட்பத்துடன் கட்டப்பட்டது.",

    "Intricate Artistry: The Wahalkada (frontispieces) constructed at the four cardinal points were adorned with exquisite carvings of swans, lions, and dwarfs (Vamana figures), and embellished with precious gemstones.":
    "நுட்பமான கலைப்படைப்பு: நான்கு திசைகளிலும் கட்டப்பட்ட வாகல்கட அன்னங்கள், சிங்கங்கள் மற்றும் வாமன சிற்பங்களால் அலங்கரிக்கப்பட்டது.",

    "Sacred Enshrinement: Enshrined deep within the massive dome (Garbha) of the stupa were sacred bodily relics of the Buddha, invaluable Dhamma discourses etched onto golden plates, and a vast repository of offerings crafted from gold, silver, pearls, and gems.":
    "புனித திருப்பண்டங்கள்: தூபியின் கர்ப்பக்கிருகத்தில் புத்தரின் புனித உடற்பொருட்கள், தங்கத் தட்டுகளில் எழுதப்பட்ட தம்ம போதனைகள் மற்றும் விலைமதிப்பற்ற நவரத்தினங்கள் வைக்கப்பட்டன.",

    "Chapter 5: The International University and the Grand Glory of Abhayagiri":
    "அத்தியாயம் 5: சர்வதேச பல்கலைக்கழகமும் அபயகிரியின் மாபெரும் புகழும்",

    "Over time, Abhayagiri evolved beyond a mere religious site to become the largest International Buddhist University in the Asian region.":
    "காலப்போக்கில் அபயகிரி ஆசிய பிராந்தியத்தின் மிகப்பெரிய சர்வதேச பௌத்த பல்கலைக்கழகமாக உருவெடுத்தது.",

    "While the traditional Maha Vihara preserved Orthodox Theravada Buddhism in its pristine form, Abhayagiri opened its doors to Mahayana concepts, foreign Buddhist ideologies, and various secular sciences from around the world. As a result:":
    "மகா விகாரை தேரவாத பௌத்தத்தைப் பாதுகாத்த அதே வேளையில், அபயகிரி மகாயான கருத்துக்கள் மற்றும் பிற உலக அறிவியல் துறைகளுக்கும் கதவுகளைத் திறந்தது:",

    "Global Academic Hub: During its golden era, the Abhayagiri monastic complex housed over 5,000 monks from various corners of the globe, all residing together to study the Dhamma and diverse academic disciplines.":
    "சர்வதேச கல்வி மையம்: இதன் பொற்காலத்தில் உலகின் பல்வேறு பகுதிகளிலிருந்து வந்த 5,000 க்கும் மேற்பட்ட துறவிகள் இங்கு தங்கி கல்வி பயின்றனர்.",

    "The Chronicle of Fa-Hien: In the 5th century CE, the famous Chinese traveling monk, Faxian (Fa-Hien), arrived in Lanka via India. He resided at Abhayagiri for two full years, meticulously copying rare Dhamma texts and palm-leaf manuscripts to take back to China. In his travelogues, he highly extolled the grand prosperity, jewel-encrusted shrines, and magnificent rituals of Abhayagiri.":
    "பாஹியான் குறிப்புகள்: கிபி 5 ஆம் நூற்றாண்டில் வருகை தந்த சீன துறவி பாஹியான் இரண்டு ஆண்டுகள் அபயகிரியில் தங்கி நூல்களை நகலெடுத்துச் சென்றார். அவர் அபயகிரியின் சிறப்பை மிகவும் புகழ்ந்துள்ளார்.",

    "Guardianship of the Tooth Relic: When the Sacred Tooth Relic (Dantha Dhatu)—the crest-jewel of Sri Lanka currently housed in Kandy—was first brought to the island during the reign of King Kithsirimevan, the King safely deposited it at the Abhayagiri Vihara, establishing an annual grand procession (Perahera) and state festivals in its honor.":
    "புனித தந்த தாதுவின் பாதுகாப்பு: இலங்கைக்கு புனித தந்த தாது கொண்டு வரப்பட்ட போது அது அபயகிரி விகாரையில் வைக்கப்பட்டு ஆண்டுதோறும் பெரஹெரா நடத்தப்பட்டது.",

    "Guardianship of the Tooth Relic: When the Sacred Tooth Relic (Dantha Dhatu)the crest-jewel of Sri Lanka currently housed in Kandywas first brought to the island during the reign of King Kithsirimevan, the King safely deposited it at the Abhayagiri Vihara, establishing an annual grand procession (Perahera) and state festivals in its honor.":
    "புனித தந்த தாதுவின் பாதுகாப்பு: இலங்கைக்கு புனித தந்த தாது கொண்டு வரப்பட்ட போது அது அபயகிரி விகாரையில் வைக்கப்பட்டு ஆண்டுதோறும் பெரஹெரா நடத்தப்பட்டது.",

    "Timeless Artistic Masterpieces: The Kuttam Pokuna (Twin Ponds)—a miraculous feat of ancient hydraulic engineering—and the world-renowned Samadhi Buddha Statue, which imparts a sense of profound serenity to all who gaze upon it, still stand intact within the Abhayagiri grounds as living testimonies to its peerless artistic heritage.":
    "காலத்தால் அழியாத கலைப் பொக்கிஷங்கள்: குட்டம் பொகுண மற்றும் உலகப் புகழ்பெற்ற சமாதி புத்தர் சிலை ஆகியவை அபயகிரியின் கலைப் பாரம்பரியத்தின் சான்றுகளாக இன்றும் திகழ்கின்றன.",

    "Timeless Artistic Masterpieces: The Kuttam Pokuna (Twin Ponds)a miraculous feat of ancient hydraulic engineeringand the world-renowned Samadhi Buddha Statue, which imparts a sense of profound serenity to all who gaze upon it, still stand intact within the Abhayagiri grounds as living testimonies to its peerless artistic heritage.":
    "காலத்தால் அழியாத கலைப் பொக்கிஷங்கள்: குட்டம் பொகுண மற்றும் உலகப் புகழ்பெற்ற சமாதி புத்தர் சிலை ஆகியவை அபயகிரியின் கலைப் பாரம்பரியத்தின் சான்றுகளாக இன்றும் திகழ்கின்றன."
}

# Now let's write a python function to inject these keys into translations.js
with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect SI block and TA block
# We will insert new keys into SI and TA dictionaries in translations.js
si_start = content.find('SI: {')
ta_start = content.find('TA: {', si_start)

# Extract SI lines
si_content = content[si_start+5:ta_start]
# We can find where the closing bracket of SI is
si_end = content.rfind('},', si_start, ta_start)

# Add new keys to SI
si_additions = []
for k, v in si_translations.items():
    # check if key already in translations
    key_escaped = json.dumps(k, ensure_ascii=False)
    val_escaped = json.dumps(v, ensure_ascii=False)
    si_additions.append(f"        {key_escaped}: {val_escaped},")

ta_additions = []
for k, v in ta_translations.items():
    key_escaped = json.dumps(k, ensure_ascii=False)
    val_escaped = json.dumps(v, ensure_ascii=False)
    ta_additions.append(f"        {key_escaped}: {val_escaped},")

print(f"Generated {len(si_additions)} SI entries and {len(ta_additions)} TA entries for Abhayagiriya.")
