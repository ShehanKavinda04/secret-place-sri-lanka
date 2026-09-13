# encoding: utf-8
import json
import re

# Load missing data
with open('scratch_all_missing.json', 'r', encoding='utf-8') as f:
    missing_data = json.load(f)

# Translation dictionary mappings
si_map = {}
ta_map = {}

# 1. THUPARAMAYA
thupa_lines = missing_data['thuparamaya']['hn_lines']
thupa_bp = missing_data['thuparamaya']['bp']

if thupa_bp:
    si_map[thupa_bp] = "ථූපාරාමය යනු බුදුරජාණන් වහන්සේගේ ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ තැන්පත් කිරීම සඳහා ධාන්‍යාකාර හැඩයෙන් නිර්මාණය කරන ලද ශ්‍රී ලංකාවේ ප්‍රථම බෞද්ධ ස්තූපයයි. උස් වෘත්තාකාර මළුවක් මත පිහිටි මෙහි සුදෝසුදු සෑ ගර්භය අලංකාර වටදාගෙයකින් ආවරණය වී තිබූ අතර, සෑය වටා කැටයම් කළ සිහින් ගල් කණු වළලු පිහිටා ඇත. ගල් පඩිපෙල්, මුරගල්, ගල් ඇතුරුම් මළු සහ අවට ආරාම නටබුන් මඟින් වන්දනාමානයට සුදුසු පරිසරයක් නිර්මාණය කරයි."
    ta_map[thupa_bp] = "தூபாராமய என்பது புத்தரின் புனித வலது கழுத்தெலும்பு திருப்பண்டத்தை வைப்பதற்காக தானியக் குவியல் (தானியாகார) வடிவில் கட்டப்பட்ட இலங்கையின் முதல் பௌத்த தூபியாகும். வட்டமான மேடையில் அமைந்துள்ள இதன் வெள்ளை நிற தூபி அழகிய வட்டதாகே அமைப்பால் சூழப்பட்டிருந்தது. தூண்களும், கல் படிகளும், முரற்கற்களும் வழிபாட்டுக்கான சூழலை உருவாக்குகின்றன."

thupa_si_dict = {
    'For this noble emissary mission, Arahat Mahinda chose Sumana Samanera, a sixteen-year-old novice monk who had traveled with him to Lanka and possessed immense supernatural powers ($Iddhi$). Addressing the young novice, Arahat Mahinda instructed:':
    'මෙම උතුම් දූත මෙහෙවර සඳහා මිහිඳු මහ රහතන් වහන්සේ තෝරාගත්තේ තමන් වහන්සේ සමඟ ලක්දිවට වැඩම කළ, මහත් ඉර්ධි බලයෙන් යුත් දහසය හැවිරිදි සුමන සාමණේරයන් වහන්සේය. තරුණ සාමණේරයන් වහන්සේ අමතා මිහිඳු හිමියෝ මෙසේ වදාළහ:',

    '"Virtuous Sumana, depart immediately using your spiritual powers to Emperor Ashoka in Jambudvipa. Meet the Emperor and request the sacred Alms Bowl Relic (Patra Dhatu) used by the Buddha, along with a collection of sacred bodily relics for the island of Lanka. Without stopping there, ascend directly to the Tavatimsa Heaven, meet Sakra, the King of Gods, and request the deeply venerated Right Collarbone Relic (Dakkhina Akkhu Dhatu) of the Buddha, which is safely enshrined within the Silumini Seya, for the land of Lanka."':
    '"පින්වත් සුමන, වහාම ඉර්ධි බලයෙන් දඹදිව ධර්මාශෝක රජු වෙත වඩින්න. රජු හමුවී ලක්දිව පිණිස බුදුරදුන් පරිභෝග කළ පාත්‍ර ධාතුව සහ සර්වඥ ධාතූන් වහන්සේලා ලබාගන්න. එතැනින් නොනැවතී තව්තිසා දෙව්ලොවට වැඩම කර, සක්දෙවිඳුන් හමුවී සිළුමිණි සෑයේ තැන්පත් කර ඇති බුදුරදුන්ගේ ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ ලක්දිව පිණිස ඉල්ලා ගන්න."',

    'Chapter 2: The Miraculous Spiritual Journey of Sumana Samanera':
    '2 වන පරිච්ඡේදය: සුමන සාමණේරයන් වහන්සේගේ ආශ්චර්යවත් ඉර්ධි ගමන',

    'Accepting the guidance of Arahat Mahinda with the utmost reverence, Sumana Samanera instantly ascended into the skies from Mahamevnawa, vanishing among the clouds. Such was the speed of his supernatural power that he crossed the great ocean in the blink of an eye and appeared before Emperor Dharmashoka in the city of Pataliputra in Jambudvipa.':
    'මිහිඳු හිමියන්ගේ අනුශාසනාව මහත් බැතියෙන් පිළිගත් සුමන සාමණේරයෝ, මහමෙවුනාවෙන් අහසට පැනනැඟී වලාකුළු අතරින් නොපෙනී ගියහ. ඇසිපිය හෙළන සැණින් මහ මුහුද තරණය කර දඹදිව පාටලීපුත්‍ර නුවර ධර්මාශෝක අධිරාජ්‍යයා ඉදිරියේ පෙනී සිටියහ.',

    'Overjoyed to hear about the flourishing of the Sasana in Lanka, Emperor Ashoka immediately took the sacred Alms Bowl used by the Buddhawhich was filled with fragrant flowersplaced a vast collection of sacred bodily relics inside it, and offered it to the novice monk with deep devotion.':
    'ලක්දිව ශාසනය බැබළෙන පුවත අසා මහත් ප්‍රමෝදයට පත් අශෝක රජතුමා, සුවඳ මලින් පිරුණු බුදුරදුන්ගේ පාත්‍ර ධාතුව තුළ සර්වඥ ධාතූන් වහන්සේලා තැන්පත් කර මහත් ශ්‍රද්ධාවෙන් සාමණේරයන් වහන්සේට පූජා කළේය.',

    'Bearing the sacred Alms Bowl Relic safely in his right hand, Sumana Samanera flew directly from that very spot toward the celestial realm. As he arrived at the magnificent Sudharma Divine Council in the Tavatimsa Heaven, Sakra, the King of Gods, stepped forward to receive him. The novice monk addressed Sakra, requesting the Right Collarbone Relic of the Buddha to establish the Buddha Sasana eternally in Sri Lanka.':
    'පාත්‍ර ධාතුව සුරතින් ගත් සුමන සාමණේරයෝ එතැනින්ම තව්තිසා දෙව්ලොව සුධර්මා දිව්‍ය සභාවට වැඩම කළහ. සක්දෙවිඳුන් පෙරමඟට පැමිණ උන්වහන්සේ පිළිගත් අතර, ශ්‍රී ලංකාවේ ශාසනය පිහිටුවීම සඳහා බුදුරදුන්ගේ දකුණු අකු ධාතූන් වහන්සේ ලබාදෙන ලෙස සාමණේරයෝ ඉල්ලා සිටියහ.',

    "With immense joy, Sakra reverently retrieved the highly sacred Right Collarbone Relic from the 'Silumini Seya', the monument worshiped by the deities of Tavatimsa. He placed it inside an exceptionally precious, gleaming crystal casket and laid it upon the palm of Sumana Samanera.":
    "සක්දෙවිඳුන් මහත් ප්‍රීතියෙන් යුතුව, දෙවියන් වන්දනා කරන සිළුමිණි සෑයෙන් ශ්‍රී දකුණු අකු ධාතූන් වහන්සේ ගෙන, අතිශය වටිනා පළිඟු කරඬුවක තැන්පත් කර සුමන සාමණේරයන් වහන්සේගේ සුරත මත තැබීය.",

    'Holding the worlds most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.':
    'ලොව උතුම්ම වස්තුව දෝතින් ගත් සුමන සාමණේරයෝ අහසින් වැඩම කර අනුරාධපුර මිහින්තලා සෑගිරි පව්ව මතට පහත් වූහ. මිහිඳු මහ රහතන් වහන්සේ ඇතුළු මහා සංඝරත්නය මහත් සාදුකාර මධ්‍යයේ සර්වඥ ධාතූන් වහන්සේලා පිළිගත්හ.',

    'Holding the world\'s most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.':
    'ලොව උතුම්ම වස්තුව දෝතින් ගත් සුමන සාමණේරයෝ අහසින් වැඩම කර අනුරාධපුර මිහින්තලා සෑගිරි පව්ව මතට පහත් වූහ. මිහිඳු මහ රහතන් වහන්සේ ඇතුළු මහා සංඝරත්නය මහත් සාදුකාර මධ්‍යයේ සර්වඥ ධාතූන් වහන්සේලා පිළිගත්හ.',

    'Chapter 3: The Majestic Decision of the State Elephant and the Clay Platform':
    '3 වන පරිච්ඡේදය: මංගල හස්තිරාජයාගේ තීරණය සහ මැටි වේදිකාව',

    'Upon hearing that the Right Collarbone Relic of the Buddha had been brought to Lanka, King Devanampiyatissa, accompanied by his grand army, the chief queen, and the royal court, rushed to Mihintale. Gazing at the crystal casket, the King was struck by overwhelming devotion; tears of joy streamed from his eyes as he worshiped the sacred relics.':
    'දකුණු අකු ධාතූන් වහන්සේ වැඩම කළ පුවත ඇසූ සැණින්, දේවානම්පියතිස්ස රජතුමා තම සේනාව සහ රාජකීය පිරිවර සමඟ මිහින්තලයට දිව ගියේය. පළිඟු කරඬුව දෙස බලා මහත් ශ්‍රද්ධාවෙන් නෙතඟ කඳුළු පුරවාගෙන වැඳ වැටුණේය.',

    'To escort the relics to the city of Anuradhapura, the royal state elephant (Mangala Attha) was adorned in pure white garments, and a golden pavilion (Sivige) was secured upon its back. The moment the crystal casket was placed within the golden pavilion, the state elephant let out a majestic, thunderous trumpet (Kunchanada) that shook the earth. It was a highly auspicious omen, blessed by the deities themselves.':
    'ධාතූන් වහන්සේලා අනුරාධපුරයට වැඩම කරවීම සඳහා මංගල හස්තිරාජයා සුදු වස්ත්‍රයෙන් සරසා පිට මත රන් සිවිගෙයක් තබන ලදී. ධාතු කරඬුව එහි තැන්පත් කළ මොහොතේම හස්තිරාජයා පොළොව දෙදරවන කුංචනාදයක් පැවැත්වීය. එය දෙවියන්ගේ පවා ආශිර්වාදය ලත් මංගල පෙරනිමිත්තක් විය.',

    'Bearing the relic casket upon its head, the elephant began its journey toward the Mahamevnawa Park in Anuradhapura, flanked by the grand army and a procession of flowers. Entering through the eastern gate of the city, the majestic elephant paced slowly into the Maha Vihara grounds and walked toward the specific elevated ground destined for the construction of Thuparamaa site sanctified by the presence of the Bodhi trees and relics of past Buddhas.':
    'ධාතු කරඬුව හිස මත දරාගත් මංගල ඇතු, පෙරහැර පෙරටු කරගනිමින් මහමෙවුනා උයන දෙසට ගමන් කළේය. නැගෙනහිර දොරටුවෙන් ඇතුළු වී, පුරාණ බුදුවරුන්ගේ පාදස්පර්ශයෙන් පවිත්‍ර වූ ථූපාරාමය ඉදිකිරීමට නියමිත උස් භූමිය වෙත සෙමින් ගමන් කළේය.',

    'Bearing the relic casket upon its head, the elephant began its journey toward the Mahamevnawa Park in Anuradhapura, flanked by the grand army and a procession of flowers. Entering through the eastern gate of the city, the majestic elephant paced slowly into the Maha Vihara grounds and walked toward the specific elevated ground destined for the construction of Thuparama—a site sanctified by the presence of the Bodhi trees and relics of past Buddhas.':
    'ධාතු කරඬුව හිස මත දරාගත් මංගල ඇතු, පෙරහැර පෙරටු කරගනිමින් මහමෙවුනා උයන දෙසට ගමන් කළේය. නැගෙනහිර දොරටුවෙන් ඇතුළු වී, පුරාණ බුදුවරුන්ගේ පාදස්පර්ශයෙන් පවිත්‍ර වූ ථූපාරාමය ඉදිකිරීමට නියමිත උස් භූමිය වෙත සෙමින් ගමන් කළේය.',

    'Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephants back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.':
    'එම ස්ථානයට පැමිණි ඇතු, බටහිර දෙසට හැරී කළුගල් පර්වතයක් මෙන් නිශ්චලව සිටියේය. රජු ධාතු කරඬුව බිමට ගැනීමට උත්සාහ කළද ඇතු ඊට ඉඩ නොදුන්නේය.',

    'Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephant\'s back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.':
    'එම ස්ථානයට පැමිණි ඇතු, බටහිර දෙසට හැරී කළුගල් පර්වතයක් මෙන් නිශ්චලව සිටියේය. රජු ධාතු කරඬුව බිමට ගැනීමට උත්සාහ කළද ඇතු ඊට ඉඩ නොදුන්නේය.',

    'Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephants mind, Arahat Mahinda explained:':
    'විමතියට පත් රජතුමා මේ පිළිබඳව මිහිඳු මහ රහතන් වහන්සේගෙන් විමසීය. ඇතුගේ සිත දත් මිහිඳු හිමියෝ මෙසේ පැහැදිලි කළහ:',

    'Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephant\'s mind, Arahat Mahinda explained:':
    'විමතියට පත් රජතුමා මේ පිළිබඳව මිහිඳු මහ රහතන් වහන්සේගෙන් විමසීය. ඇතුගේ සිත දත් මිහිඳු හිමියෝ මෙසේ පැහැදිලි කළහ:',

    '"Great King, this elephant is exceptionally wise. The ground of the Thuparama site is lower than the elephant\'s head. The elephant does not wish for the sacred relics of the Buddha to be placed at a level lower than itself. It is waiting until the relics can be deposited upon a exalted platform that rises higher than its own head."':
    '"මහාරාජ, මෙම හස්තිරාජයා ඉතා බුද්ධිමත්ය. ථූපාරාම භූමිය ඇතුගේ හිසට වඩා පහත් මට්ටමක පවතී. බුදුරදුන්ගේ ධාතූන් වහන්සේලා තමාගේ මට්ටමට වඩා පහතින් තැබීමට ඇතු අකමැතිය. තම හිසට වඩා උස් වූ වේදිකාවක් සකස් කරන තුරු හස්තියා බලා සිටී."',

    "The King took immediate action. He deployed hundreds of laborers to bring pure, dry clay from the nearby Abhaya Wewa (Basawakkulama Reservoir). He constructed a massive platform (mound) equivalent to the height of a man's neck, rising well above the level where the elephant stood. The moment the platform surpassed the height of the elephant's head, the animal trumpeted softly with great satisfaction, permitted the enshrinement of the relic casket, and devoutly stepped aside.":
    "රජතුමා වහාම ක්‍රියාත්මක විය. අභය වැවෙන් (බසවක්කුලම) වියළි මැටි ගෙන්වා මිනිසෙකුගේ කරවටක් උසැති දැවැන්ත වේදිකාවක් ඉදිකළේය. වේදිකාව ඇතුගේ හිසට වඩා උස් වූ සැණින්, හස්තිරාජයා ප්‍රීතියෙන් නාද කර ධාතු කරඬුව තැන්පත් කිරීමට ඉඩදී බැතියෙන් පසෙකට විය.",

    'Chapter 4: The First Relic Miracle in Lanka and the Auspicious Shape of the Stupa':
    '4 වන පරිච්ඡේදය: ලක්දිව ප්‍රථම ධාතු ප්‍රාතිහාර්යය සහ සෑයේ හැඩය',

    'Once the relics were placed upon the platform, the first great relic miracle in the history of Sri Lankaone that would be etched in golden letterstook place. Before the astonished eyes of King Devanampiyatissa, the chief queen, the ministers, and thousands of ordinary citizens, the crystal casket opened automatically! The Right Collarbone Relic emerged from the casket and instantly soared high into the sky.':
    'වේදිකාව මත ධාතු කරඬුව තැබූ සැණින් ලක්දිව ප්‍රථම මහා ධාතු ප්‍රාතිහාර්යය සිදුවිය. රජු සහ රැස්ව සිටි දහස් සංඛ්‍යාත ජනතාව බලා සිටියදීම පළිඟු කරඬුව ස්වයංක්‍රීයව විවර වී, දකුණු අකු ධාතූන් වහන්සේ අහසට පැනනැඟී වැඩසිටි සේක.',

    'Once the relics were placed upon the platform, the first great relic miracle in the history of Sri Lanka—one that would be etched in golden letters—took place. Before the astonished eyes of King Devanampiyatissa, the chief queen, the ministers, and thousands of ordinary citizens, the crystal casket opened automatically! The Right Collarbone Relic emerged from the casket and instantly soared high into the sky.':
    'වේදිකාව මත ධාතු කරඬුව තැබූ සැණින් ලක්දිව ප්‍රථම මහා ධාතු ප්‍රාතිහාර්යය සිදුවිය. රජු සහ රැස්ව සිටි දහස් සංඛ්‍යාත ජනතාව බලා සිටියදීම පළිඟු කරඬුව ස්වයංක්‍රීයව විවර වී, දකුණු අකු ධාතූන් වහන්සේ අහසට පැනනැඟී වැඩසිටි සේක.',

    'Floating in the heavens, the sacred relic of the Buddha began to emit a brilliant six-colored aura of Buddha rays (the Shadwarna Buddha Rashmiblue, yellow, red, white, orange, and a radiant mixture of them all) across the entire city, as if the Buddha Himself were hovering alive in the sky. Furthermore, to the absolute amazement of the gathered crowd, the relic simultaneously unleashed streams of cool water from one side and columns of unquenchable fire from the other. This was identical to the Twin Miracle (Yamaka Maha Pratihariya) performed by the Buddha during His lifetime to dispel the doubts of skeptics. The entire sky of Anuradhapura transformed into a celestial vision as a rain of heavenly flowers cascaded from above.':
    'අහස් කුසෙහි වැඩහිඳිමින් ධාතූන් වහන්සේ ෂඩ්වර්ණ බුද්ධ රශ්මි මාලාවන් විහිදුවමින්, එක් පසෙකින් ජල ධාරාද අනෙක් පසින් ගිනි ජාලාද විහිදුවමින් යමක මහා ප්‍රාතිහාර්යය පෑ සේක. මුළු අනුරාධපුර අහසම දිව්‍යමය දසුනක් බවට පත් විය.',

    'Floating in the heavens, the sacred relic of the Buddha began to emit a brilliant six-colored aura of Buddha rays (the Shadwarna Buddha Rashmi—blue, yellow, red, white, orange, and a radiant mixture of them all) across the entire city, as if the Buddha Himself were hovering alive in the sky. Furthermore, to the absolute amazement of the gathered crowd, the relic simultaneously unleashed streams of cool water from one side and columns of unquenchable fire from the other. This was identical to the Twin Miracle (Yamaka Maha Pratihariya) performed by the Buddha during His lifetime to dispel the doubts of skeptics. The entire sky of Anuradhapura transformed into a celestial vision as a rain of heavenly flowers cascaded from above.':
    'අහස් කුසෙහි වැඩහිඳිමින් ධාතූන් වහන්සේ ෂඩ්වර්ණ බුද්ධ රශ්මි මාලාවන් විහිදුවමින්, එක් පසෙකින් ජල ධාරාද අනෙක් පසින් ගිනි ජාලාද විහිදුවමින් යමක මහා ප්‍රාතිහාර්යය පෑ සේක. මුළු අනුරාධපුර අහසම දිව්‍යමය දසුනක් බවට පත් විය.',

    'At the conclusion of this grand miracle, the sacred relic gently descended from the heavens and rested lightly upon the crown of King Devanampiyatissa\'s head. Weeping tears of ultimate devotion, the King proclaimed, "My life is blessed!" and enshrined the sacred relic within the great platform at the Thuparama site.':
    'ප්‍රාතිහාර්යය අවසානයේ ධාතූන් වහන්සේ අහසින් බැස දේවානම්පියතිස්ස රජුගේ හිස මත ස්පර්ශ විය. "මගේ ජීවිතය ධන්‍ය විය!" යනුවෙන් පවසමින් රජතුමා මහත් භක්තියෙන් ධාතූන් වහන්සේ ථූපාරාම භූමියේ තැන්පත් කළේය.',

    "The Thuparama Stupa was designed in the Dhanyakara shape (the shape of a heap of paddy). This was the very first great stupa constructed in the historical chronicles of Sri Lanka. Later, to protect the monument from wind and rain, an elegant circular relic house (Vatadage) was built around it. Artisans set up slender, beautifully carved granite pillars (Stone Pillars) encircling the stupa. To this day, they remain as an eternal hallmark of Thuparama's wondrous architecture.":
    "ථූපාරාම ස්තූපය ධාන්‍යාකාර හැඩයෙන් නිමවන ලදී. මෙය ලංකා ඉතිහාසයේ ඉදිකළ ප්‍රථම මහා ස්තූපයයි. පසුව ස්තූපය ආවරණය කරමින් අලංකාර වටදාගෙයක් සහ කැටයම් කළ ගල් කණු වළලු පිහිටුවන ලදී. ඒවා අදටත් ථූපාරාමයේ විශිෂ්ට වාස්තු විද්‍යාත්මක ලක්ෂණයකි.",

    'Chapter 5: An Eternal Sacred Legacy':
    '5 වන පරිච්ඡේදය: සදාතනික පූජනීය උරුමය',

    "Following the completion of the Thuparama Stupa, a massive religious renaissance swept across the land of Lanka. Thousands of royals and citizens, including the King's younger brother, Prince Mattabhaya, entered the Buddhist monastic order. Centered around this first stupa of Lanka, a sprawling monastic complex capable of housing thousands of monks developed around Thuparama.":
    "ථූපාරාම සෑය නිමවීමෙන් පසු ලක්දිව පුරා මහා ආගමික පුනර්ජීවනයක් ඇති විය. මත්තාභය කුමරු ඇතුළු දහස් ගණනක් සසුන්ගත වූහ. ථූපාරාමය කේන්ද්‍ර කරගනිමින් භික්ෂූන් වහන්සේලා දහස් ගණනකට වැඩවාසය කළ හැකි මහා ආරාම සංකීර්ණයක් බිහි විය.",

    'Over the centuries, monarchs such as Vasabha, Gothabhaya, and Aggabodhi continuously renovated and preserved Thuparama. During the brutal foreign invasions of later eras, the monks and rulers of Lanka protected this Right Collarbone Relic at the risk of their own lives, concealing it in secret wilderness hideouts. Once peace returned to the country, they brought it back in grand processions to re-enshrine it within Thuparama.':
    'වසභ, ගෝඨාභය, අග්ගබෝධි වැනි රජවරු ථූපාරාමය අඛණ්ඩව ප්‍රතිසංස්කරණය කළහ. පසුකාලීන ආක්‍රමණ හමුවේ සංඝරත්නය තම දිවි පරදුවට තබා මෙම දකුණු අකු ධාතූන් වහන්සේ ආරක්ෂා කර, සාමය උදාවූ පසු නැවත ථූපාරාමයේ තැන්පත් කළහ.'
}

# Tamil mappings for Thuparamaya
thupa_ta_dict = {
    'For this noble emissary mission, Arahat Mahinda chose Sumana Samanera, a sixteen-year-old novice monk who had traveled with him to Lanka and possessed immense supernatural powers ($Iddhi$). Addressing the young novice, Arahat Mahinda instructed:':
    'இந்த புனிதமான பணிக்காக மகிந்த தேரர் சுமன சாமனேரரைத் தேர்ந்தெடுத்தார். அவரிடம் மகிந்த தேரர் கூறியதாவது:',

    '"Virtuous Sumana, depart immediately using your spiritual powers to Emperor Ashoka in Jambudvipa. Meet the Emperor and request the sacred Alms Bowl Relic (Patra Dhatu) used by the Buddha, along with a collection of sacred bodily relics for the island of Lanka. Without stopping there, ascend directly to the Tavatimsa Heaven, meet Sakra, the King of Gods, and request the deeply venerated Right Collarbone Relic (Dakkhina Akkhu Dhatu) of the Buddha, which is safely enshrined within the Silumini Seya, for the land of Lanka."':
    '"சுமனா, உடனே இந்தியா சென்று அசோகரிடம் பாத்திர தாதுவையும் பிற திருப்பண்டங்களையும் பெற்று, பின் தேவலோகம் சென்று இந்திரனிடம் வலது கழுத்தெலும்பு திருப்பண்டத்தைக் கேட்டுப் பெற்று வாருங்கள்."',

    'Chapter 2: The Miraculous Spiritual Journey of Sumana Samanera':
    'அத்தியாயம் 2: சுமன சாமனேரரின் அற்புத ஆன்மீகப் பயணம்',

    'Accepting the guidance of Arahat Mahinda with the utmost reverence, Sumana Samanera instantly ascended into the skies from Mahamevnawa, vanishing among the clouds. Such was the speed of his supernatural power that he crossed the great ocean in the blink of an eye and appeared before Emperor Dharmashoka in the city of Pataliputra in Jambudvipa.':
    'சுமன சாமனேரர் கண்ணிமைக்கும் நேரத்தில் கடலைக் கடந்து பாடலிபுத்திரத்தில் அசோக மன்னர் முன் தோன்றினார்.',

    'Overjoyed to hear about the flourishing of the Sasana in Lanka, Emperor Ashoka immediately took the sacred Alms Bowl used by the Buddhawhich was filled with fragrant flowersplaced a vast collection of sacred bodily relics inside it, and offered it to the novice monk with deep devotion.':
    'அசோக மன்னர் புத்தரின் பாத்திர தாதுவில் பல திருப்பண்டங்களை வைத்து பக்தியுடன் கொடுத்தார்.',

    'Bearing the sacred Alms Bowl Relic safely in his right hand, Sumana Samanera flew directly from that very spot toward the celestial realm. As he arrived at the magnificent Sudharma Divine Council in the Tavatimsa Heaven, Sakra, the King of Gods, stepped forward to receive him. The novice monk addressed Sakra, requesting the Right Collarbone Relic of the Buddha to establish the Buddha Sasana eternally in Sri Lanka.':
    'சுமன சாமனேரர் தேவலோகம் சென்று இந்திரனிடம் புத்தரின் வலது கழுத்தெலும்பு திருப்பண்டத்தைக் கோரினார்.',

    "With immense joy, Sakra reverently retrieved the highly sacred Right Collarbone Relic from the 'Silumini Seya', the monument worshiped by the deities of Tavatimsa. He placed it inside an exceptionally precious, gleaming crystal casket and laid it upon the palm of Sumana Samanera.":
    "இந்திரன் சிலுமினி சையாவிலிருந்து புனித திருப்பண்டத்தை எடுத்து படிகப் பேழையில் வைத்து சுமனரிடம் கொடுத்தார்.",

    'Holding the worlds most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.':
    'சுமன சாமனேரர் திருப்பண்டங்களுடன் மிஹிந்தலைக்குத் திரும்பினார். துறவிகள் வரவேற்றனர்.',

    'Holding the world\'s most sublime treasures in his hands, Sumana Samanera traveled back through the heavens using his spiritual powers, gently descending onto the peak of Mihintale Rock (Sagiriya) in Anuradhapura. Arahat Mahinda and the community of monks received the sacred relics with grand honor and thunderous chants of Sadhu.':
    'சுமன சாமனேரர் திருப்பண்டங்களுடன் மிஹிந்தலைக்குத் திரும்பினார். துறவிகள் வரவேற்றனர்.',

    'Chapter 3: The Majestic Decision of the State Elephant and the Clay Platform':
    'அத்தியாயம் 3: பட்டத்து யானையின் முடிவும் களிமண் மேடையும்',

    'Upon hearing that the Right Collarbone Relic of the Buddha had been brought to Lanka, King Devanampiyatissa, accompanied by his grand army, the chief queen, and the royal court, rushed to Mihintale. Gazing at the crystal casket, the King was struck by overwhelming devotion; tears of joy streamed from his eyes as he worshiped the sacred relics.':
    'திருப்பண்டம் வந்தடைந்ததை அறிந்த மன்னர் மிஹிந்தலைக்கு விரைந்து சென்று வழிபட்டார்.',

    'To escort the relics to the city of Anuradhapura, the royal state elephant (Mangala Attha) was adorned in pure white garments, and a golden pavilion (Sivige) was secured upon its back. The moment the crystal casket was placed within the golden pavilion, the state elephant let out a majestic, thunderous trumpet (Kunchanada) that shook the earth. It was a highly auspicious omen, blessed by the deities themselves.':
    'பட்டத்து யானையின் மீது தங்கப் பல்லக்கு வைக்கப்பட்டு திருப்பண்டங்கள் ஊர்வலமாக எடுத்துச் செல்லப்பட்டன.',

    'Bearing the relic casket upon its head, the elephant began its journey toward the Mahamevnawa Park in Anuradhapura, flanked by the grand army and a procession of flowers. Entering through the eastern gate of the city, the majestic elephant paced slowly into the Maha Vihara grounds and walked toward the specific elevated ground destined for the construction of Thuparamaa site sanctified by the presence of the Bodhi trees and relics of past Buddhas.':
    'யானை அனுராதபுரத்தின் மகாமேவ்னா பூங்காவில் உள்ள தூபாராமய அமையவிருந்த இடத்திற்குச் சென்றது.',

    'Bearing the relic casket upon its head, the elephant began its journey toward the Mahamevnawa Park in Anuradhapura, flanked by the grand army and a procession of flowers. Entering through the eastern gate of the city, the majestic elephant paced slowly into the Maha Vihara grounds and walked toward the specific elevated ground destined for the construction of Thuparama—a site sanctified by the presence of the Bodhi trees and relics of past Buddhas.':
    'யானை அனுராதபுரத்தின் மகாமேவ்னா பூங்காவில் உள்ள தூபாராமய அமையவிருந்த இடத்திற்குச் சென்றது.',

    'Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephants back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.':
    'அங்கு சென்ற யானை மேற்கு நோக்கி அசையாமல் நின்றது. பேழையைக் கீழே இறக்க விடவில்லை.',

    'Upon reaching the spot, the elephant turned around, faced the west, and stood completely still like a massive boulder. Though the King attempted to lower the relic casket from the elephant\'s back, the animal refused to allow it. Shaking its frontal lobes (Kumbhasthala), the elephant fiercely protested the removal of the casket.':
    'அங்கு சென்ற யானை மேற்கு நோக்கி அசையாமல் நின்றது. பேழையைக் கீழே இறக்க விடவில்லை.',

    'Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephants mind, Arahat Mahinda explained:':
    'இதன் காரணத்தை மகிந்த தேரர் மன்னரிடம் விளக்கினார்:',

    'Puzzled, the King inquired about the secret behind this behavior from Arahat Mahinda. Understanding the elephant\'s mind, Arahat Mahinda explained:':
    'இதன் காரணத்தை மகிந்த தேரர் மன்னரிடம் விளக்கினார்:',

    '"Great King, this elephant is exceptionally wise. The ground of the Thuparama site is lower than the elephant\'s head. The elephant does not wish for the sacred relics of the Buddha to be placed at a level lower than itself. It is waiting until the relics can be deposited upon a exalted platform that rises higher than its own head."':
    '"மன்னரே, யானை தனது உயரத்திற்கு அதிகமான மேடையில் பேழையை வைக்க விரும்புகிறது."',

    "The King took immediate action. He deployed hundreds of laborers to bring pure, dry clay from the nearby Abhaya Wewa (Basawakkulama Reservoir). He constructed a massive platform (mound) equivalent to the height of a man's neck, rising well above the level where the elephant stood. The moment the platform surpassed the height of the elephant's head, the animal trumpeted softly with great satisfaction, permitted the enshrinement of the relic casket, and devoutly stepped aside.":
    "மன்னர் உடனே களிமண்ணால் உயர்ந்த மேடையை அமைத்ததும், யானை திருப்தியுடன் பேழையை வைக்க அனுமதித்தது.",

    'Chapter 4: The First Relic Miracle in Lanka and the Auspicious Shape of the Stupa':
    'அத்தியாயம் 4: இலங்கையின் முதல் திருப்பண்ட அற்புதமும் தூபியின் அமைப்பும்',

    'Once the relics were placed upon the platform, the first great relic miracle in the history of Sri Lankaone that would be etched in golden letterstook place. Before the astonished eyes of King Devanampiyatissa, the chief queen, the ministers, and thousands of ordinary citizens, the crystal casket opened automatically! The Right Collarbone Relic emerged from the casket and instantly soared high into the sky.':
    'பேழை வைக்கப்பட்டதும் தானாகத் திறந்து வானில் உயர்ந்து நின்றது.',

    'Once the relics were placed upon the platform, the first great relic miracle in the history of Sri Lanka—one that would be etched in golden letters—took place. Before the astonished eyes of King Devanampiyatissa, the chief queen, the ministers, and thousands of ordinary citizens, the crystal casket opened automatically! The Right Collarbone Relic emerged from the casket and instantly soared high into the sky.':
    'பேழை வைக்கப்பட்டதும் தானாகத் திறந்து வானில் உயர்ந்து நின்றது.',

    'Floating in the heavens, the sacred relic of the Buddha began to emit a brilliant six-colored aura of Buddha rays (the Shadwarna Buddha Rashmiblue, yellow, red, white, orange, and a radiant mixture of them all) across the entire city, as if the Buddha Himself were hovering alive in the sky. Furthermore, to the absolute amazement of the gathered crowd, the relic simultaneously unleashed streams of cool water from one side and columns of unquenchable fire from the other. This was identical to the Twin Miracle (Yamaka Maha Pratihariya) performed by the Buddha during His lifetime to dispel the doubts of skeptics. The entire sky of Anuradhapura transformed into a celestial vision as a rain of heavenly flowers cascaded from above.':
    'வானில் ஒளிக்கதிர்களை வீசி இரட்டை அற்புதத்தை நிகழ்த்தியது. மலர் மழை பொழிந்தது.',

    'Floating in the heavens, the sacred relic of the Buddha began to emit a brilliant six-colored aura of Buddha rays (the Shadwarna Buddha Rashmi—blue, yellow, red, white, orange, and a radiant mixture of them all) across the entire city, as if the Buddha Himself were hovering alive in the sky. Furthermore, to the absolute amazement of the gathered crowd, the relic simultaneously unleashed streams of cool water from one side and columns of unquenchable fire from the other. This was identical to the Twin Miracle (Yamaka Maha Pratihariya) performed by the Buddha during His lifetime to dispel the doubts of skeptics. The entire sky of Anuradhapura transformed into a celestial vision as a rain of heavenly flowers cascaded from above.':
    'வானில் ஒளிக்கதிர்களை வீசி இரட்டை அற்புதத்தை நிகழ்த்தியது. மலர் மழை பொழிந்தது.',

    'At the conclusion of this grand miracle, the sacred relic gently descended from the heavens and rested lightly upon the crown of King Devanampiyatissa\'s head. Weeping tears of ultimate devotion, the King proclaimed, "My life is blessed!" and enshrined the sacred relic within the great platform at the Thuparama site.':
    'அற்புதம் முடிந்ததும் மன்னர் பக்தியுடன் தூபாராமயவில் திருப்பண்டத்தை வைத்தார்.',

    "The Thuparama Stupa was designed in the Dhanyakara shape (the shape of a heap of paddy). This was the very first great stupa constructed in the historical chronicles of Sri Lanka. Later, to protect the monument from wind and rain, an elegant circular relic house (Vatadage) was built around it. Artisans set up slender, beautifully carved granite pillars (Stone Pillars) encircling the stupa. To this day, they remain as an eternal hallmark of Thuparama's wondrous architecture.":
    "தூபாராமய தானியக் குவியல் வடிவில் கட்டப்பட்டது. பின்னர் அதைச் சுற்றி வட்டதாகே மற்றும் அழகான கருங்கல் தூண்கள் அமைக்கப்பட்டன.",

    'Chapter 5: An Eternal Sacred Legacy':
    'அத்தியாயம் 5: அழியாத புனித பாரம்பரியம்',

    "Following the completion of the Thuparama Stupa, a massive religious renaissance swept across the land of Lanka. Thousands of royals and citizens, including the King's younger brother, Prince Mattabhaya, entered the Buddhist monastic order. Centered around this first stupa of Lanka, a sprawling monastic complex capable of housing thousands of monks developed around Thuparama.":
    "தூபாராமய கட்டப்பட்ட பின் நாட்டில் பெரும் பௌத்த மறுமலர்ச்சி ஏற்பட்டது.",

    'Over the centuries, monarchs such as Vasabha, Gothabhaya, and Aggabodhi continuously renovated and preserved Thuparama. During the brutal foreign invasions of later eras, the monks and rulers of Lanka protected this Right Collarbone Relic at the risk of their own lives, concealing it in secret wilderness hideouts. Once peace returned to the country, they brought it back in grand processions to re-enshrine it within Thuparama.':
    'பல மன்னர்கள் இதனைப் புனரமைத்து திருப்பண்டத்தைப் பாதுகாத்து வந்தனர்.'
}

si_map.update(thupa_si_dict)
ta_map.update(thupa_ta_dict)

print(f"Total mappings to add: SI={len(si_map)}, TA={len(ta_map)}")

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

print("Injected all Thuparamaya exact lines successfully!")
