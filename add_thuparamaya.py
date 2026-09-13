# encoding: utf-8
import json
import re

thuparamaya_si = {
    # Blueprint
    "Thuparamaya is Sri Lanka's first Buddhist stupa, designed in the Dhanyakara, or heap-of-paddy, form to enshrine the Buddha's sacred right collarbone relic. Its rounded white dome stands on a raised circular terrace and is enclosed by a graceful vatadage, with slender carved granite pillars arranged around the relic shrine. Stone steps, guardstones, paved courts, and the surrounding monastic remains create a carefully ordered processional layout for worship. The compact design brings together relic veneration, a protective circular enclosure, and finely worked stone architecture, making Thuparamaya one of Anuradhapura's most important early sacred monuments.":
    "ථූපාරාමය යනු බුදුරජාණන් වහන්සේගේ ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ තැන්පත් කිරීම සඳහා ධාන්‍යාකාර හැඩයෙන් නිර්මාණය කරන ලද ශ්‍රී ලංකාවේ ප්‍රථම බෞද්ධ ස්තූපයයි. උස් වෘත්තාකාර මළුවක් මත පිහිටි මෙහි සුදෝසුදු සෑ ගර්භය අලංකාර වටදාගෙයකින් ආවරණය වී තිබූ අතර, සෑය වටා කැටයම් කළ සිහින් ගල් කණු වළලු පිහිටා ඇත. ගල් පඩිපෙල්, මුරගල්, ගල් ඇතුරුම් මළු සහ අවට ආරාම නටබුන් මඟින් වන්දනාමානයට සුදුසු පරිසරයක් නිර්මාණය කරයි.",

    # Narrative lines
    "Chapter 1: The Royal Aspiration for the Sacred Bodily Relics":
    "1 වන පරිච්ඡේදය: ශාරීරික ධාතූන් වහන්සේලා උදෙසා වූ රාජකීය ප්‍රාර්ථනාව",

    "In the third century BCE, the sacred land of Lanka shone with a glorious light. Following the arrival of Arahat Mahinda Maha Thero and the establishment of the Buddha Sasana on the island, King Devanampiyatissa and the entire populace were enveloped in profound faith and devotion. Although the blessings of the Triple Gem had spread across the land, an unfulfilled longing—a pious yearning—remained in the King's heart.":
    "ක්‍රිස්තු පූර්ව තුන්වන සියවසේදී, ශුද්ධ වූ ලක්දිව තෙදවත් ආලෝකයකින් බැබළිණි. මිහිඳු මහ රහතන් වහන්සේගේ සම්ප්‍රාප්තිය සහ ලක්දිව බුද්ධ ශාසනය පිහිටුවීමෙන් පසු, දේවානම්පියතිස්ස රජතුමා ඇතුළු සමස්ත ජනතාවම අසීමිත ශ්‍රද්ධාවෙන් හා භක්තියෙන් වෙළී ගියහ. තෙරුවන් සරණ රට පුරා පැතිර ගියද, රජුගේ හදවතේ නොසන්සිඳුණු ප්‍රාර්ථනාවක්—පූජනීය බලාපොරොත්තුවක්—ඉතිරිව පැවතුණි.",

    "One day, amid the tranquil surroundings of the Mahamevnawa Park, King Devanampiyatissa approached Arahat Mahinda with hands clasped in deep reverence and expressed his inner yearning:":
    "දිනක් මහමෙවුනා උයනේ නිස්කලංක පරිසරය මැදදී, දේවානම්පියතිස්ස රජතුමා මහත් ගෞරවයෙන් දෑත් එක්කොට මිහිඳු මහ රහතන් වහන්සේ අභියස තම හදවතේ පැවති බලාපොරොත්තුව මෙසේ ප්‍රකාශ කළේය:",

    "\"Venerable Sir, the sublime Dhamma has taken root in our island, yet we do not have the supreme fortune of directly worshipping the living presence of the Lord Buddha through His Sacred Relics. If we were to obtain the sacred bodily relics ($Sharirika Dhatu$) of the Tathagata, we could construct a grand relic shrine and enshrine them for the eternal veneration of the people of Lanka...!\"":
    "\"ස්වාමීනී, උතුම් ධර්මය අප දිවයිනේ මුල් බැසගත් නමුත්, අප තථාගතයන් වහන්සේගේ සර්වඥ ධාතූන් වහන්සේලා තුළින් උන්වහන්සේගේ සජීවී බුද්ධ ශ්‍රී සම්පත්තිය දැක වන්දනාමාන කිරීමේ භාග්‍යය තවමත් ලබා නැත. තථාගතයන් වහන්සේගේ ශාරීරික ධාතූන් වහන්සේලා අපට ලබාගත හැකි නම්, අපට මහා සෑයක් ඉදිකර ලක්වැසි ජනතාවගේ නිත්‍ය වන්දනාව පිණිස තැන්පත් කළ හැකිය...!\"",

    "Arahat Mahinda, perceiving with His spiritual insight that the fertile soil of Lanka was fully ready for the enshrinement of the Buddha's corporeal relics, smiled serenely and replied:":
    "ලක්දිව පින්බිම බුදුරදුන්ගේ ශාරීරික ධාතූන් වහන්සේලා තැන්පත් කිරීමට පූර්ණ ලෙස සූදානම්ව ඇති බව තම ඥානයෙන් දුටු මිහිඳු මහ රහතන් වහන්සේ ප්‍රසන්නව සිනාසෙමින් මෙසේ වදාළ සේක:",

    "\"Great King, your aspiration is noble. We shall send our novice monk, Sumana Samanera, to Dambadiva (India) to request the sacred relics from your friend, the righteous Emperor Ashoka, and from Sakra, the King of the Gods.\"":
    "\"මහාරාජ, ඔබගේ ප්‍රාර්ථනාව අතිශයින් උතුම්ය. ඔබගේ මිත්‍ර ධර්මාශෝක අධිරාජ්‍යයාගෙන් සහ සක්දෙවිඳුන්ගෙන් පූජනීය ධාතූන් වහන්සේලා ලබාගැනීම පිණිස අපි අපගේ සුමන සාමණේරයන් වහන්සේ දඹදිවට පිටත් කර හරිමු.\"",

    "Chapter 2: The Celestial Mission of Sumana Samanera":
    "2 වන පරිච්ඡේදය: සුමන සාමණේරයන් වහන්සේගේ දිව්‍යමය මෙහෙවර",

    "Endowed with supreme psychic powers ($Iddhi$), Sumana Samanera instantly ascended into the sky and traveled to Pataliputra in India. Meeting Emperor Ashoka, he obtained a portion of the Buddha's bodily relics along with the sacred alms bowl ($Pathra Dhatu$). Next, ascending to the Tavatimsa heaven, the Samanera stood before Sakra, the King of the Devas, and declared:":
    "ඉර්ධි බලයෙන් යුත් සුමන සාමණේරයන් වහන්සේ ක්ෂණයකින් අහසට පැනනැඟී ඉන්දියාවේ පාටලීපුත්‍ර නගරයට වැඩම කළහ. එහිදී ධර්මාශෝක රජු හමුවී සර්වඥ ධාතූන් වහන්සේලා සහ පාත්‍ර ධාතුව ලබාගත්හ. අනතුරුව තව්තිසා දෙව්ලොවට වැඩම කළ සාමණේරයන් වහන්සේ සක්දෙවිඳුන් ඉදිරියේ පෙනී සිට මෙසේ වදාළහ:",

    "\"O King of the Devas, you possess the Sacred Right Collarbone Relic ($Dakshina Akkha Dhatu$) of the Supreme Buddha enshrined within the Chulamani Cetiya. The time has come to bestow this most precious relic upon the island of Lanka!\"":
    "\"දේවරාජය, චූළාමණී චෛත්‍යයේ තැන්පත් කර ඇති සම්බුදුරජාණන් වහන්සේගේ ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ ඔබ සතුව ඇත. එම උතුම් ධාතූන් වහන්සේ ලක්දිවට පූජා කිරීමට කාලය එළඹ තිබේ!\"",

    "Hearing this request, Sakra was filled with joyful devotion. Reaching into the Chulamani Cetiya, he reverently extracted the Sacred Right Collarbone Relic and offered it into the hands of Sumana Samanera. With the most priceless treasures of the universe secured, Sumana Samanera descended upon the summit of Mihintale (Chetiyagiri) in the island of Lanka.":
    "මෙම ඉල්ලීම ඇසූ සක්දෙවිඳුන් මහත් ප්‍රමෝදයට පත්ව, චූළාමණී චෛත්‍යයෙන් දකුණු අකු ධාතූන් වහන්සේ ගෙන සුමන සාමණේරයන් වහන්සේගේ සුරතට පූජා කළහ. විශ්වයේ අග්‍රගන්‍ය වස්තුව රැගත් සුමන සාමණේරයන් වහන්සේ ලක්දිව මිහින්තලා කඳු මුදුනට වැඩම කළහ.",

    "Chapter 3: The Grand Triumphal Procession and the State Elephant":
    "3 වන පරිච්ඡේදය: මහා ජයග්‍රාහී පෙරහැර සහ මංගල හස්තිරාජයා",

    "When the miraculous news reached King Devanampiyatissa that the Buddha's Right Collarbone had safely arrived at Mihintale, the entire kingdom erupted in jubilation. The King adorned himself with the supreme royal insignia and, accompanied by a magnificent army and thousands of devout citizens, journeyed in grand procession to Mihintale to receive the sacred relic.":
    "බුදුරජාණන් වහන්සේගේ දකුණු අකු ධාතූන් වහන්සේ මිහින්තලයට වැඩම කළ බව සැලවූ සැණින්, මුළු රාජධානියම ප්‍රීති ඝෝෂාවෙන් ඇළලී ගියේය. දේවානම්පියතිස්ස රජතුමා රාජාභරණයෙන් සැරසී, මහා සේනාව සහ දහස් සංඛ්‍යාත සැදැහැවතුන් සමඟ මිහින්තලය වෙත පෙරහැරින් ගමන් කළේය.",

    "The sacred relic was placed upon the frontal crown of the royal state elephant, which was adorned in glorious golden vestments. A white royal parasol was raised above the casket. As the procession marched from Mihintale toward the royal capital of Anuradhapura, celestial drums echoed from the heavens and clouds showered fragrant flowers upon the path.":
    "රන් වස්ත්‍රයෙන් සරසන ලද මංගල හස්තිරාජයාගේ කුම්භස්ථලය මත ධාතු කරඬුව තැන්පත් කරන ලදී. සුදු මුතු කුඩයක් ධාතු කරඬුව මත ඔසවන ලදී. මිහින්තලයේ සිට අනුරාධපුරය දෙසට පෙරහැර ගමන් කරද්දී අහසින් දෙව් බෙර හඬ නැඟුණු අතර මල් වැසි වැටෙන්නට විය.",

    "Upon reaching the northern entrance of the Mahamevnawa Park, the royal elephant entered the sacred precinct. It proceeded straight to a naturally elevated knoll and turned around, standing facing the south. The King attempted to lower the relic casket from the elephant's back, but the state elephant firmly refused to let anyone touch the casket.":
    "මහමෙවුනා උයනේ උතුරු දොරටුවෙන් ඇතුළු වූ මංගල ඇතු, උස් බිම් පෙදෙසක් වෙත ගොස් දකුණු දිශාවට මුහුණලා ස්ථිරව නැවතුණි. කරඬුව බිමට ගැනීමට රජු උත්සාහ කළද, ඇතු කිසිවෙකුටත් එය ස්පර්ශ කිරීමට ඉඩ නොදුන්නේය.",

    "Arahat Mahinda explained to the King:":
    "මිහිඳු මහ රහතන් වහන්සේ රජුට මෙසේ වදාළ සේක:",

    "\"Great King, the elephant will not allow the relic to be lowered until a foundational terrace of equal height to its back is prepared from the mud of the Abhaya Wewa (reservoir).\"":
    "\"මහාරාජ, අභය වැවේ මැටිවලින් ඇතුගේ පිට මට්ටමට සමාන වේදිකාවක් සකස් කරන තුරු හස්තියා කරඬුව පහත් කිරීමට ඉඩ නොදෙයි.\"",

    "Rejoicing at this sign, King Devanampiyatissa personally carried lumps of clay from the Abhaya reservoir to raise the platform, and within hours a splendid terrace was consecrated. When the relic casket was placed upon the platform, the state elephant trumpeted with joy and stood guard beside it.":
    "මෙම පෙරනිමිත්තෙන් සතුටට පත් දේවානම්පියතිස්ස රජතුමා පෞද්ගලිකවම අභය වැවෙන් මැටි රැගෙන විත් පැය කිහිපයකින් උස් වේදිකාව ගොඩනැඟීය. ධාතු කරඬුව එම වේදිකාව මත තැන්පත් කළ විට, මංගල ඇතු ප්‍රීති නාද පවත්වා ඒ අසල මුර සිටියේය.",

    "Chapter 4: The Twin Miracle of the Right Collarbone Relic":
    "4 වන පරිච්ඡේදය: දකුණු අකු ධාතූන් වහන්සේගේ යමක මහා ප්‍රාතිහාර්යය",

    "Before the construction of the stupa could begin, an astounding miracle—the pinnacle of spiritual wonder—unfolded before the eyes of King Devanampiyatissa and tens of thousands of assembled citizens.":
    "ස්තූපයේ ඉදිකිරීම් ආරම්භ කිරීමට පෙර, දේවානම්පියතිස්ස රජු සහ රැස්ව සිටි දස දහස් සංඛ්‍යාත ජනතාව ඉදිරියේ මහා විශ්මිත ආශ්චර්යයක් සිදු විය.",

    "Suddenly, without any human hand touching it, the Sacred Right Collarbone Relic ascended into the sky to a height of seven palmyra trees (about eighty feet). Suspended weightlessly in the celestial vault, the relic performed the legendary **Twin Miracle ($Yamakapatihara$)**, radiating blazing streams of fire from one side and cool torrents of crystalline water from the other. Brilliant six-colored Buddha rays ($Chabbanna Buddha Rashmi$) illuminated the entire island of Lanka from coast to coast.":
    "කිසිවෙකුගේත් ස්පර්ශයකින් තොරව, ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ අහසට පැනනැඟී තල් ගස් සතක උසකින් අහසේ වැඩසිටි සේක. අහස් කුසෙහි වැඩහිඳිමින් ධාතූන් වහන්සේ එක් පසෙකින් ගිනි ජාලාද, අනෙක් පසින් සිසිල් ජල ධාරාද විහිදුවමින් **යමක මහා ප්‍රාතිහාර්යය** පෑ සේක. බුදුරැස් මාලාවන්ගෙන් මුළු ලක්දිවම ඒකාලෝක විය.",

    "Witnessing this supreme miracle, the entire assembly knelt upon the earth, chanting \"Sadhu! Sadhu!\" until the very ground reverberated. Thousands of citizens instantly entered the Buddhist monastic order.":
    "මෙම අසිරිමත් ප්‍රාතිහාර්යය දුටු සැදැහැවත් ජනතාව මහත් බැතියෙන් පොළොව මත දණනමස්කාර කරමින් \"සාදු! සාදු!\" හඬ නැඟූහ. දහස් ගණන් ජනයා සසුන්ගත වූහ.",

    "Having completed the miracle, the Sacred Relic gently descended from the heavens and settled serenely upon the head of King Devanampiyatissa, before being reverently lowered into the golden relic chamber of the stupa.":
    "ප්‍රාතිහාර්යය නිමවීමෙන් පසු, පූජනීය ධාතූන් වහන්සේ අහසින් බැස දේවානම්පියතිස්ස රජුගේ හිස මත ස්පර්ශ වී, අනතුරුව සෑයේ රන් ධාතු ගර්භය තුළ තැන්පත් වූ සේක.",

    "Chapter 5: The Construction and Architecture of Thuparamaya":
    "5 වන පරිච්ඡේදය: ථූපාරාමයේ ඉදිකිරීම සහ වාස්තු විද්‍යාව",

    "The Thuparamaya holds the eternal distinction of being the **first historical Buddhist stupa constructed in the sacred island of Sri Lanka**. King Devanampiyatissa directed the nation's master builders to construct the stupa in the elegant **Dhanyakara (Heap of Paddy)** shape.":
    "ශ්‍රී ලංකාද්වීපයේ ඉදිකරන ලද **ප්‍රථම ඓතිහාසික බෞද්ධ ස්තූපය** වන්නේ ථූපාරාමයයි. දේවානම්පියතිස්ස රජතුමා දක්ෂ නිර්මාණකරුවන් ලවා මෙය අලංකාර **ධාන්‍යාකාර (ධාන්‍ය ගොඩක හැඩැති)** ආකාරයෙන් නිර්මාණය කරවීය.",

    "Key architectural marvels of the Thuparamaya include:":
    "ථූපාරාමයේ ප්‍රධාන වාස්තු විද්‍යාත්මක ලක්ෂණ අතර:",

    "The Sacred Enshrinement: The holy Right Collarbone Relic of the Buddha remains forever enshrined at its mystical center.":
    "පූජනීය ධාතු නිධානය: බුදුරජාණන් වහන්සේගේ ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ මෙහි මධ්‍යයේ සදාකාලිකව තැන්පත් කර ඇත.",

    "The Circular Vatadage: In later centuries, particularly under King Aggabodhi II, a magnificent circular pillared shrine (**Vatadage**) was erected over the stupa to protect it from the elements.":
    "වටදාගෙය: පසුකාලීනව, විශේෂයෙන් අග්ගබෝධි රජු දවස, ස්තූපය ආවරණය කරමින් අලංකාර වෘත්තාකාර ස්ථම්භ සහිත **වටදාගෙයක්** ඉදිකරන ලදී.",

    "Monolithic Granite Pillars: Four concentric rings of gracefully sculpted granite pillars—totaling 176 pillars adorned with lotus capitals—encircled the stupa, supporting a magnificent conical wooden roof.":
    "ඒකශෛලීය ගල් කණු: නෙළුම් මල් කැටයම් සහිත ඒකශෛලීය ගල් කණු 176 කින් යුත් වළලු හතරක් සෑය වටා පිහිටා තිබූ අතර, එමඟින් ලී වහලය දරා සිටියේය.",

    "Timeless Heritage: Surviving countless foreign invasions and renovated across the centuries by great kings, the gleaming white bell-shaped stupa stands today as the eternal symbol of the dawn of Buddhism in Sri Lanka.":
    "අමරණීය උරුමය: විදේශ ආක්‍රමණ රැසකට මුහුණ දෙමින් යුග ගණනාවක් පුරා රජවරුන් විසින් ප්‍රතිසංස්කරණය කරන ලද ථූපාරාමය, ලක්දිව බුද්ධ ශාසනයේ උදාව සනිටුහන් කරන සදාතනික සංකේතයයි."
}

thuparamaya_ta = {
    # Blueprint
    "Thuparamaya is Sri Lanka's first Buddhist stupa, designed in the Dhanyakara, or heap-of-paddy, form to enshrine the Buddha's sacred right collarbone relic. Its rounded white dome stands on a raised circular terrace and is enclosed by a graceful vatadage, with slender carved granite pillars arranged around the relic shrine. Stone steps, guardstones, paved courts, and the surrounding monastic remains create a carefully ordered processional layout for worship. The compact design brings together relic veneration, a protective circular enclosure, and finely worked stone architecture, making Thuparamaya one of Anuradhapura's most important early sacred monuments.":
    "தூபாராமய என்பது புத்தரின் புனித வலது கழுத்தெலும்பு திருப்பண்டத்தை வைப்பதற்காக தானியக் குவியல் (தானியாகார) வடிவில் கட்டப்பட்ட இலங்கையின் முதல் பௌத்த தூபியாகும். வட்டமான மேடையில் அமைந்துள்ள இதன் வெள்ளை நிற தூபி அழகிய வட்டதாகே அமைப்பால் சூழப்பட்டிருந்தது. தூண்களும், கல் படிகளும், முரற்கற்களும் வழிபாட்டுக்கான சூழலை உருவாக்குகின்றன.",

    # Narrative lines
    "Chapter 1: The Royal Aspiration for the Sacred Bodily Relics":
    "அத்தியாயம் 1: புனித உடற்பொருட்களுக்கான அரச பிராத்தனை",

    "In the third century BCE, the sacred land of Lanka shone with a glorious light. Following the arrival of Arahat Mahinda Maha Thero and the establishment of the Buddha Sasana on the island, King Devanampiyatissa and the entire populace were enveloped in profound faith and devotion. Although the blessings of the Triple Gem had spread across the land, an unfulfilled longing—a pious yearning—remained in the King's heart.":
    "கிமு மூன்றாம் நூற்றாண்டில், இலங்கையில் மகிந்த தேரரின் வருகைக்குப் பிறகு பௌத்தம் நிலைநாட்டப்பட்டது. தேவநம்பியதிஸ்ஸ மன்னரும் மக்களும் மிகுந்த பக்தியுடன் இருந்தனர். எனினும் மன்னரின் இதயத்தில் ஒரு புனிதமான ஏக்கம் இருந்தது.",

    "One day, amid the tranquil surroundings of the Mahamevnawa Park, King Devanampiyatissa approached Arahat Mahinda with hands clasped in deep reverence and expressed his inner yearning:":
    "ஒரு நாள் மகாமேவ்னா பூங்காவில், மன்னர் மகிந்த தேரரிடம் தனது மன விருப்பத்தைத் தெரிவித்தார்:",

    "\"Venerable Sir, the sublime Dhamma has taken root in our island, yet we do not have the supreme fortune of directly worshipping the living presence of the Lord Buddha through His Sacred Relics. If we were to obtain the sacred bodily relics ($Sharirika Dhatu$) of the Tathagata, we could construct a grand relic shrine and enshrine them for the eternal veneration of the people of Lanka...!\"":
    "\"குருவே, தம்மம் நம் நாட்டில் பரவியுள்ளது, ஆனால் புத்தரின் புனித உடற்பொருட்களை நேரடியாக வழிபடும் பாக்கியம் இன்னும் கிடைக்கவில்லை. அவற்றை நாம் பெற்றால், ஒரு பெரிய தூபியைக் கட்டி நிரந்தரமாக வழிபடலாம்...!\"",

    "Arahat Mahinda, perceiving with His spiritual insight that the fertile soil of Lanka was fully ready for the enshrinement of the Buddha's corporeal relics, smiled serenely and replied:":
    "இலங்கை மண் அதற்குத் தயாராக இருப்பதை உணர்ந்த மகிந்த தேரர் புன்னகையுடன் பதிலளித்தார்:",

    "\"Great King, your aspiration is noble. We shall send our novice monk, Sumana Samanera, to Dambadiva (India) to request the sacred relics from your friend, the righteous Emperor Ashoka, and from Sakra, the King of the Gods.\"":
    "\"மன்னரே, உமது நோக்கம் உன்னதமானது. நமது சுமன சாமனேரரை இந்தியாவுக்கு அனுப்பி அசோக பேரரசரிடமிருந்தும் இந்திரனிடமிருந்தும் புனித திருப்பண்டங்களைப் பெற்று வருவோம்.\"",

    "Chapter 2: The Celestial Mission of Sumana Samanera":
    "அத்தியாயம் 2: சுமன சாமனேரரின் தேவ தூது",

    "Endowed with supreme psychic powers ($Iddhi$), Sumana Samanera instantly ascended into the sky and traveled to Pataliputra in India. Meeting Emperor Ashoka, he obtained a portion of the Buddha's bodily relics along with the sacred alms bowl ($Pathra Dhatu$). Next, ascending to the Tavatimsa heaven, the Samanera stood before Sakra, the King of the Devas, and declared:":
    "சுமன சாமனேரர் வானில் பறந்து இந்தியா சென்று அசோகரிடம் திருப்பண்டங்களையும் திருவோட்டையும் பெற்றார். பின்னர் தேவலோகத்திற்குச் சென்று இந்திரனிடம் கூறினார்:",

    "\"O King of the Devas, you possess the Sacred Right Collarbone Relic ($Dakshina Akkha Dhatu$) of the Supreme Buddha enshrined within the Chulamani Cetiya. The time has come to bestow this most precious relic upon the island of Lanka!\"":
    "\"தேவேந்திரா, சூளாமணி சைத்தியத்தில் உள்ள புத்தரின் வலது கழுத்தெலும்பு திருப்பண்டத்தை இலங்கைக்கு வழங்கும் நேரம் வந்துவிட்டது!\"",

    "Hearing this request, Sakra was filled with joyful devotion. Reaching into the Chulamani Cetiya, he reverently extracted the Sacred Right Collarbone Relic and offered it into the hands of Sumana Samanera. With the most priceless treasures of the universe secured, Sumana Samanera descended upon the summit of Mihintale (Chetiyagiri) in the island of Lanka.":
    "இந்திரன் மகிழ்ச்சியுடன் சூளாமணி சைத்தியத்திலிருந்து வலது கழுத்தெலும்பு திருப்பண்டத்தை எடுத்து சுமன சாமனேரரிடம் கொடுத்தார். அவர் அதனை மிஹிந்தலைக்குக் கொண்டு வந்தார்.",

    "Chapter 3: The Grand Triumphal Procession and the State Elephant":
    "அத்தியாயம் 3: பிரம்மாண்ட ஊர்வலமும் பட்டத்து யானையும்",

    "When the miraculous news reached King Devanampiyatissa that the Buddha's Right Collarbone had safely arrived at Mihintale, the entire kingdom erupted in jubilation. The King adorned himself with the supreme royal insignia and, accompanied by a magnificent army and thousands of devout citizens, journeyed in grand procession to Mihintale to receive the sacred relic.":
    "திருப்பண்டம் மிஹிந்தலை வந்தடைந்த செய்தி கேட்டு மன்னரும் மக்களும் ஊர்வலமாக மிஹிந்தலைக்குச் சென்றனர்.",

    "The sacred relic was placed upon the frontal crown of the royal state elephant, which was adorned in glorious golden vestments. A white royal parasol was raised above the casket. As the procession marched from Mihintale toward the royal capital of Anuradhapura, celestial drums echoed from the heavens and clouds showered fragrant flowers upon the path.":
    "பொன் ஆடைகளால் அலங்கரிக்கப்பட்ட பட்டத்து யானையின் தலையில் பேழை வைக்கப்பட்டு அனுராதபுரத்திற்கு ஊர்வலமாக எடுத்துச் செல்லப்பட்டது.",

    "Upon reaching the northern entrance of the Mahamevnawa Park, the royal elephant entered the sacred precinct. It proceeded straight to a naturally elevated knoll and turned around, standing facing the south. The King attempted to lower the relic casket from the elephant's back, but the state elephant firmly refused to let anyone touch the casket.":
    "மகாமேவ்னா பூங்காவை அடைந்ததும், யானை ஒரு மேடான இடத்திற்குச் சென்று நின்றது. பேழையைக் கீழே இறக்க முயன்றபோது யானை யாரையும் தொட விடவில்லை.",

    "Arahat Mahinda explained to the King:":
    "மகிந்த தேரர் மன்னரிடம் விளக்கினார்:",

    "\"Great King, the elephant will not allow the relic to be lowered until a foundational terrace of equal height to its back is prepared from the mud of the Abhaya Wewa (reservoir).\"":
    "\"மன்னரே, அபய குளத்து மண்ணால் யானையின் உயரத்திற்கு சமமான மேடை அமைக்கும் வரை யானை பேழையை இறக்க விடாது.\"",

    "Rejoicing at this sign, King Devanampiyatissa personally carried lumps of clay from the Abhaya reservoir to raise the platform, and within hours a splendid terrace was consecrated. When the relic casket was placed upon the platform, the state elephant trumpeted with joy and stood guard beside it.":
    "மன்னர் தாமே மண்ணைச் சுமந்து சில மணிநேரங்களில் மேடையை அமைத்தார். பேழை அங்கு வைக்கப்பட்டதும் யானை பிளிறி மகிழ்ச்சியை வெளிப்படுத்தியது.",

    "Chapter 4: The Twin Miracle of the Right Collarbone Relic":
    "அத்தியாயம் 4: வலது கழுத்தெலும்பு திருப்பண்டத்தின் இரட்டை அற்புதம்",

    "Before the construction of the stupa could begin, an astounding miracle—the pinnacle of spiritual wonder—unfolded before the eyes of King Devanampiyatissa and tens of thousands of assembled citizens.":
    "தூபியின் கட்டுமானம் தொடங்குவதற்கு முன், மக்கள் முன்னிலையில் ஒரு மாபெரும் அற்புதம் நிகழ்ந்தது.",

    "Suddenly, without any human hand touching it, the Sacred Right Collarbone Relic ascended into the sky to a height of seven palmyra trees (about eighty feet). Suspended weightlessly in the celestial vault, the relic performed the legendary **Twin Miracle ($Yamakapatihara$)**, radiating blazing streams of fire from one side and cool torrents of crystalline water from the other. Brilliant six-colored Buddha rays ($Chabbanna Buddha Rashmi$) illuminated the entire island of Lanka from coast to coast.":
    "புனித திருப்பண்டம் தானாகவே வானில் ஏழு பனைமரம் உயரத்திற்கு எழுந்து, ஒருபுறம் நெருப்பையும் மறுபுறம் நீரையும் பொழிந்து **இரட்டை அற்புதத்தை** நிகழ்த்தியது. ஆறு வண்ண புத்த ஒளிகள் நாடெங்கும் பரவின.",

    "Witnessing this supreme miracle, the entire assembly knelt upon the earth, chanting \"Sadhu! Sadhu!\" until the very ground reverberated. Thousands of citizens instantly entered the Buddhist monastic order.":
    "இந்த அற்புதத்தைக் கண்ட ஆயிரக்கணக்கான மக்கள் நிலத்தில் விழுந்து வணங்கி துறவறம் பூண்டனர்.",

    "Having completed the miracle, the Sacred Relic gently descended from the heavens and settled serenely upon the head of King Devanampiyatissa, before being reverently lowered into the golden relic chamber of the stupa.":
    "அற்புதம் முடிந்ததும், திருப்பண்டம் மன்னரின் தலையைத் தொட்டு பின்னர் தங்க அறையில் வைக்கப்பட்டது.",

    "Chapter 5: The Construction and Architecture of Thuparamaya":
    "அத்தியாயம் 5: தூபாராமய கட்டுமானம் மற்றும் கட்டிடக்கலை",

    "The Thuparamaya holds the eternal distinction of being the **first historical Buddhist stupa constructed in the sacred island of Sri Lanka**. King Devanampiyatissa directed the nation's master builders to construct the stupa in the elegant **Dhanyakara (Heap of Paddy)** shape.":
    "தூபாராமய இலங்கையில் கட்டப்பட்ட **முதல் வரலாற்று பௌத்த தூபியாகும்**. இது தானியக் குவியல் வடிவில் கட்டப்பட்டது.",

    "Key architectural marvels of the Thuparamaya include:":
    "தூபாராமய முக்கிய கட்டிடக்கலை அம்சங்கள்:",

    "The Sacred Enshrinement: The holy Right Collarbone Relic of the Buddha remains forever enshrined at its mystical center.":
    "புனித வைப்பு: புத்தரின் புனித வலது கழுத்தெலும்பு திருப்பண்டம் இதன் மையத்தில் வைக்கப்பட்டுள்ளது.",

    "The Circular Vatadage: In later centuries, particularly under King Aggabodhi II, a magnificent circular pillared shrine (**Vatadage**) was erected over the stupa to protect it from the elements.":
    "வட்டதாகே: தூபியைப் பாதுகாக்க தூண்களுடன் கூடிய வட்ட வடிவ இல்லம் கட்டப்பட்டது.",

    "Monolithic Granite Pillars: Four concentric rings of gracefully sculpted granite pillars—totaling 176 pillars adorned with lotus capitals—encircled the stupa, supporting a magnificent conical wooden roof.":
    "கருங்கல் தூண்கள்: தாமரை மலர் செதுக்கப்பட்ட 176 கருங்கல் தூண்கள் கூரையைத் தாங்கி நின்றன.",

    "Timeless Heritage: Surviving countless foreign invasions and renovated across the centuries by great kings, the gleaming white bell-shaped stupa stands today as the eternal symbol of the dawn of Buddhism in Sri Lanka.":
    "காலத்தால் அழியாத பாரம்பரியம்: பல நூற்றாண்டுகளைக் கடந்து இன்றும் இலங்கையில் பௌத்தத்தின் விடியலாக தூபாராமய திகழ்கிறது."
}

# Read current translations.js
with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in thuparamaya_si.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in thuparamaya_ta.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected Thuparamaya translations successfully!")
