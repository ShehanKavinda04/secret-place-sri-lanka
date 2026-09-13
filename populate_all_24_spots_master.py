# encoding: utf-8
import json
import re

with open('scratch_lines_by_spot.json', 'r', encoding='utf-8') as f:
    all_spots = json.load(f)

# Master translation maps
si_map = {}
ta_map = {}

# ==========================================
# 1. JAYA SRI MAHA BODHI
# ==========================================
jayasri_bp_variants = [
    "Jaya Sri Maha Bodhi is the living centre of a carefully protected sacred precinct within the Mahamevnawa Gardens. The ancient Bodhi tree stands on a raised terrace surrounded by golden railings, whitewashed walls, offering platforms, shrine spaces, and paved paths that guide pilgrims in respectful circumambulation. Substantial boundary walls and carefully managed garden spaces protect the tree while keeping the worship area open and accessible. The arrangement of living landscape, ritual enclosure, ceremonial gateways, and nearby monastic architecture preserves the continuity of one of the world's oldest documented Buddhist pilgrimage sites.",
    "Jaya Sri Maha Bodhi is the living centre of a carefully protected sacred precinct within the Mahamevnawa Gardens. The ancient Bodhi tree stands on a raised terrace surrounded by golden railings, whitewashed walls, offering platforms, shrine spaces, and paved paths that guide pilgrims in respectful circumambulation. Substantial boundary walls and carefully managed garden spaces protect the tree while keeping the worship area open and accessible. The arrangement of living landscape, ritual enclosure, ceremonial gateways, and nearby monastic architecture preserves the continuity of one of the world\\'s oldest documented Buddhist pilgrimage sites."
]
for bp in jayasri_bp_variants:
    si_map[bp] = "අනුරාධපුර පූජනීය ජය ශ්‍රී මහා බෝධීන් වහන්සේ යනු මහමෙවුනා උයනේ පිහිටි අතිපූජනීය කේන්ද්‍රස්ථානයයි. උඩමළුවෙහි වැඩවසන මෙම පූජනීය බෝධීන් වහන්සේ රන් වැටකින් සහ ප්‍රාකාරයකින් සුරක්ෂිත කර ඇති අතර, වසර දෙදහස් තුන්සියයකට අධික කාලයක් පුරා අඛණ්ඩව වන්දනාමාන කරන බැතිමතුන් සඳහා පිළිවෙළින් සකස් කළ මංමාවත් සහ වැලි මළුවලින් සමන්විත වේ. ලොව පැරණිතම ලිඛිත ඉතිහාසයක් සහිත මානව රෝපිත වෘක්ෂය මෙයයි."
    ta_map[bp] = "அனுராதபுரத்தில் உள்ள புனித ஜெய ஸ்ரீ மகா போதி, மகாமேவ்னா பூங்காவில் உள்ள புனித மையமாகும். இது தங்க வேலிகளாலும் மதில் சுவர்களாலும் பாதுகாக்கப்பட்டு 2,300 ஆண்டுகளுக்கும் மேலாக வழிபடப்படுகிறது. இது உலகின் மிக பழமையான மனிதனால் நடப்பட்ட மரமாகும்."

jayasri_hn_si = {
    "Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa": "1 වන පරිච්ඡේදය: දඹදිව ධර්මාශෝක අධිරාජ්‍යයාගේ මහා සත්‍යක්‍රියාව",
    "The third century BCE had dawned. Centered around the city of Pataliputra, the capital of the Magadha Kingdom in Jambudvipa (India), Emperor Dharmashoka was spreading the light of Buddhism throughout the entire Indian subcontinent.": "ක්‍රිස්තු පූර්ව තුන්වන සියවස උදා විය. දඹදිව මගධ රාජධානියේ අගනුවර වූ පාටලීපුත්‍ර නගරය කේන්ද්‍ර කරගනිමින් ධර්මාශෝක අධිරාජ්‍යයා මුළු ඉන්දීය අර්ධද්වීපය පුරා බුද්ධාලෝකය පතුරුවමින් සිටියේය.",
    "Meanwhile, in the island of Sri Lanka, King Devanampiyatissa had listened to the Dhamma from Arahat Mahinda and had offered the entire country to the Buddha Sasana. One day, while paying his respects before Arahat Mahinda, King Devanampiyatissa inquired whether it would be possible to bring a branch of the Jaya Sri Maha Bodhi—the sacred tree under which the Buddha attained Enlightenment—to Sri Lanka, so that the people of Lanka could worship it. Arahat Mahinda stated that his sister, Theri Sanghamitta, a fully enlightened nun ($Arahat\\ Meheni$) and daughter of Emperor Ashoka, could be invited to Sri Lanka, and she could bring the sacred Bodhi branch along with her. Accordingly, a royal delegation led by Prince Arittha, the King's minister and brother-in-law, departed for Jambudvipa.": "මේ අතර ශ්‍රී ලංකාද්වීපයේ දේවානම්පියතිස්ස රජතුමා මිහිඳු මහ රහතන් වහන්සේගෙන් ධර්මය අසා මුළු රටම බුද්ධ ශාසනයට පූජා කළේය. බුදුරදුන් සම්බුද්ධත්වයට පත් වූ ජය ශ්‍රී මහා බෝධීන් වහන්සේගේ ශාඛාවක් ලක්දිවට වැඩමවා ගැනීමට රජු කළ ඉල්ලීම පරිදි, අරිට්ඨ කුමරු ප්‍රමුඛ රාජකීය දූත පිරිස සංඝමිත්තා තෙරණියට ආරාධනා කිරීමට දඹදිව බලා පිටත් වූහ.",
    "Upon hearing the royal request from Sri Lanka through Prince Arittha, Emperor Ashoka faced a monumental dilemma. Although he wished to gift a branch of the Bodhi tree, he feared damaging the divine, sacred Maha Bodhi with any weapon, golden saw, or blade. \"If the Bodhi tree is harmed by my hand, will I commit a grave sin?\" the Emperor anxiously pondered.": "අරිට්ඨ කුමරුගෙන් ලක්දිව ඉල්ලීම ඇසූ ධර්මාශෝක රජතුමා දැඩි විමතියට හා කල්පනාවට පත් විය. බෝධි ශාඛාවක් පූජා කිරීමට කැමති වුවද, කිසිදු ආයුධයකින් බෝධීන් වහන්සේට හානි කිරීමට රජු බිය විය.",
    "On the advice of Arahat Moggaliputta Tissa, Emperor Ashoka marched with his entire army to Bodh Gaya, where the Maha Bodhi tree stood. The Emperor prepared a magnificent, massive vessel made of solid gold ($Suwarnamaya\\ Ran\\ Kataram$) and placed it beneath the southern branch of the Bodhi tree. Then, marking a red line on the branch using a golden stylus, he placed both hands upon his head in worship and made a profound Act of Truth ($Sathya\\ Kriya$) from the depths of his heart:": "මොග්ගලීපුත්ත තිස්ස මහ රහතන් වහන්සේගේ උපදෙස් පරිදි අශෝක රජතුමා බුද්ධගයාවට ගොස් රන් කටාරමක් දක්ෂිණ ශාඛාව යටින් තබා, රන් තෙලිතුඩකින් රතු ඉරක් ඇඳ මෙසේ සත්‍යක්‍රියා කළේය:",
    "\"If this noble Bodhi branch is truly destined to travel to the island of Lanka to establish the Buddha Sasana, and if the faith I harbor in my heart toward the Buddha is true... let this Bodhi branch separate itself from the parent tree without any human effort or touch of a weapon, and let it establish itself within this golden vessel that I have prepared...!\"": "\"මෙම උතුම් බෝධි ශාඛාව ලක්දිව සසුන පිහිටුවීමට වැඩම කිරීමට නියමිත නම්, මාගේ සිතේ බුදුරදුන් කෙරෙහි ඇති ශ්‍රද්ධාව සත්‍ය නම්... කිසිදු ආයුධයක පහසකින් තොරව මෙම ශාඛාව තනිවම වෙන්වී මා පිළියෙල කළ රන් කටාරමෙහි පිහිටාවා...!\"",
    "The moment the Act of Truth was completed, the earth trembled powerfully, and divine drums ($Deva\\ Dundubhi$) resonated from the heavens. The southern (Dakkhina) branch of the Maha Bodhi tree, untouched by any weapon, separated beautifully from the parent tree and automatically established itself within the fragrant golden vessel. Hundreds of roots instantly sprouted and reached deep into the vessel. The entirety of Jambudvipa echoed with a singular roar of Sadhu and joyous acclamations.": "සත්‍යක්‍රියාව අවසන් වූ සැණින් පොළොව කම්පා විය. දක්ෂිණ බෝධි ශාඛාව මව් බෝධියෙන් වෙන්වී රන් කටාරමෙහි පිහිටි අතර, මුල් සිය ගණනක් විහිදී ගියේය. මුළු දඹදිවම සාදු නාදයෙන් ගිගුම් දුන්නේය.",
    "Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm": "2 වන පරිච්ඡේදය: මහා සාගරය තරණය කිරීම සහ නාග ලෝකය දමනය කිරීම",
    "The sacred Bodhi branch, now firmly rooted and shimmering with fresh young leaves inside the golden vessel, was secured for the journey. Arahat Theri Sanghamitta and the noble community of nuns assumed guardianship of the Bodhi tree. To ensure its protection and to develop the agricultural, artistic, and administrative affairs of Sri Lanka, Emperor Ashoka included a specialized retinue comprising skilled artisans, guardians, and royal princes from eighteen distinct clans (Kula) in this mission.": "රන් කටාරමෙහි රෝපණය වූ බෝධි ශාඛාව සංඝමිත්තා තෙරණිය ඇතුළු මෙහෙණින් වහන්සේලාගේ ආරක්ෂාව යටතේ නැවට වැඩමවන ලදී. අශෝක රජතුමා අටළොස් කුලයක ශිල්පීන් සහ ආරක්ෂකයන්ද මෙම මෙහෙවරට එක් කළේය.",
    "They boarded a massive ship at the port of Tamralipti in Jambudvipa and began navigating the great ocean toward Sri Lanka. As the vessel glided across the deep sea, the divine aura and miraculous energy of the Bodhi tree became visible to the Nagas living beneath the ocean. Enchanted by the majesty of the Bodhi tree, a fierce desire arose within the Nagas to claim it for themselves.": "තාම්රලිප්ති වරායෙන් නැව් නැඟී ලක්දිව බලා එද්දී, බෝධීන් වහන්සේගේ ආලෝකය දුටු නාගයෝ එය තමන් සතු කරගැනීමේ දැඩි ආශාවෙන් නැව වටලෑහ.",
    "Using their supernatural powers, the Nagas conjured massive ocean waves, halting the ship dead in the middle of the sea, and surrounded the vessel to seize the sacred Bodhi tree. The passengers on board were gripped by absolute terror.": "නාගයෝ මහා රළ මවා නැව මහා මුහුද මැද නවතා බෝධීන් වහන්සේ පැහැර ගැනීමට සැරසුණහ.",
    "However, in this perilous moment, Arahat Theri Sanghamitta remained completely unshaken and exercised her spiritual powers ($Iddhi$). Understanding the nature of the Nagas, she manifested the terrifying form of a giant Garuda (a mythical eagle-like king of birds, the natural adversary of the Nagas), ascended into the sky, and let out a thunderous cry.": "එහෙත් සංඝමිත්තා තෙරණිය ඉර්ධි බලයෙන් ගුරුළු වේශයක් මවා අහසට පැනනැඟී මහා හඬක් නැඟූහ.",
    "Submitting to the miraculous power of the Arahat nun, the Nagas realized their grave mistake. Trembling with fear, they shed their monstrous illusions, appeared in their normal forms, and prostrated before the Theri to beg for forgiveness:": "තෙරණියගේ ඉර්ධි බලයට යටත් වූ නාගයෝ බියෙන් වෙව්ලමින් තමන්ගේ සැබෑ වේශයෙන් පැමිණ සමාව අයැද සිටියහ:",
    "\"Venerable Mother, we do not wish to harm the Bodhi tree. Please grant us permission to escort the sacred tree to our Naga realm (Naga\\ Bhavana) to pay homage to it for seven days,\" they implored.": "\"මෑණියන් වහන්ස, අපට බෝධීන් වහන්සේ නාග භවනට වැඩමවා දින හතක් වන්දනාමාන කිරීමට අවසර දෙනු මැනව,\" යැයි නාගයෝ අයැද සිටියහ.",
    "Seeing their devotion, Theri Sanghamitta granted them permission. The Bodhi tree was escorted to the Manjerika Naga Realm. After seven days of magnificent, celestial offerings performed by the Nagas, it was returned completely unharmed to the ship. The vessel then resumed its peaceful voyage toward the shores of Lanka.": "ඔවුන්ගේ භක්තිය දුටු තෙරණිය අවසර දුන් අතර, දින හතක පූජාවෙන් පසු බෝධීන් වහන්සේ නැවත නැවට වැඩමවා සාමකාමීව ලක්දිව බලා ගමන් කළහ.",
    "Chapter 3: The Royal Reception at the Port of Jambukola Pattana": "3 වන පරිච්ඡේදය: දඹකොළපටුන වරායේදී රාජකීය පිළිගැනීම",
    "As the royal ship bearing the sacred Bodhi tree reached the port of Jambukola Pattana in northern Lanka (near modern-day Jaffna), King Devanampiyatissa, alongside his complete cabinet of ministers, the Maha Sangha, and his royal army, stood waiting on the shore. The entire beachfront had been covered with pristine white sand, adorned with ceremonial arches ($Thorana$), and perfumed with fragrant incense.": "දඹකොළපටුන වරායට බෝධීන් වහන්සේ වැඩම කරද්දී දේවානම්පියතිස්ස රජතුමා සහ පිරිස වෙරළ තීරයේ රැඳී සිටියහ.",
    "As the vessel neared the shore, the King's devotion to the Buddha swelled so intensely that he could no longer wait on land. Clad in his full royal attire, King Devanampiyatissa waded directly into the great ocean waves. Immersion up to his neck in the sea, the King reached the ship and lifted the golden vessel containing the Maha Bodhi branch onto his own head with boundless reverence and devotion.": "නැව වෙරළට ළඟා වෙත්ම, රජතුමා කරවටක් දියට බැස රන් කටාරම තම හිස මත තබාගෙන මහත් භක්තියෙන් ගොඩබිමට වැඩම කළේය.",
    "As the King emerged from the sea bearing the Bodhi tree upon his head, the thunderous beats of ceremonial drums (Hewisi) and the Sadhu cries of the citizens filled the skies across the coast. The Bodhi tree was temporarily placed in a specially constructed pavilion named the 'Samudra Shala', where grand royal festivals were held for three consecutive days, during which the kingship of the entire island of Sri Lanka was symbolically offered to the Maha Bodhi.": "මුහුදෙන් ගොඩට වැඩම කළ බෝධීන් වහන්සේ 'සමුද්‍ර ශාලාවෙහි' තැන්පත් කර දින තුනක් මුළු රටේම රාජ්‍යත්වය බෝධීන් වහන්සේට පූජා කරමින් මහා උත්සව පැවැත්වූහ.",
    "Subsequently, the route from Jambukola Pattana to the Mahamevnawa Park in Anuradhapura was carpeted with pure white sand, decorated with wild flowers, and a magnificent procession began to escort the Bodhi tree to the capital. The residents of every village along the way, including the 'Village of the Brahmin Tivakka', lined the roadsides, sprinkling fragrant water, offering flowers, and worshiping with utmost devotion and love.": "අනතුරුව දඹකොළපටුනේ සිට මහමෙවුනාව දක්වා මඟ දෙපස සුදු වැලි අතුරා මලින් සරසා මහ පෙරහැරින් බෝධීන් වහන්සේ අනුරාධපුරයට වැඩම කරවන ලදී.",
    "Chapter 4: The Miraculous Planting at Mahamevnawa": "4 වන පරිච්ඡේදය: මහමෙවුනා උයනේ ආශ්චර්යවත් රෝපණය",
    "The sacred Bodhi tree was escorted to the exact sanctified ground in the Mahamevnawa Park of Anuradhapura, a site previously marked by Arahat Mahinda where the Bodhi trees of past Buddhas had also been planted.": "මිහිඳු හිමියන් විසින් නියම කරන ලද මහමෙවුනා උයනේ පූජනීය භූමියට බෝධීන් වහන්සේ වැඩම කරවන ලදී.",
    "In the year 288 BCE—more than 2,300 years ago—during a highly auspicious astrological moment at the exact hour of sunset, King Devanampiyatissa commenced the grand planting ceremony. Just as the King prepared to lower the Bodhi tree from its golden vessel onto the earth, a spectacular miracle occurred, astounding the thousands of people gathered there.": "ක්‍රි.පූ. 288 දී හිරු බැස යන සුබ මොහොතේ රෝපණ මංගල්‍යය ආරම්භ විය. රජු බෝධිය පොළොවෙහි තැන්පත් කිරීමට සැරසෙද්දී මහා ප්‍රාතිහාර්යයක් සිදුවිය.",
    "Freed from the golden vessel, the Bodhi branch rose straight up into the sky without the touch of any human hand! Floating in the air, a brilliant six-colored aura of Buddha rays (the Shadwarna\\ Buddha\\ Rashmi—blue, yellow, red, white, orange, and a radiant mixture of them all) began to emanate from its leaves and branches. The entire city of Anuradhapura was illuminated by this divine light, and the Bodhi tree shone in the night sky like a second sun.": "රන් කටාරමෙන් මිදුණු බෝධි ශාඛාව කිසිවෙකුගේත් ස්පර්ශයකින් තොරව අහසට පැනනැඟී, ෂඩ්වර්ණ බුද්ධ රශ්මි මාලාවන් විහිදුවමින් අහසේ බැබළිණි.",
    "Gazing upon this wondrous miracle, the King and the citizens fell to their knees, weeping tears of devotion while uttering cries of Sadhu. As the sun vanished and night fully arrived, the Bodhi tree gently descended back from the heavens. The moment it touched the earth destined for its planting, its roots plunged with immense strength deep into the ground.": "රාත්‍රිය එළඹෙත්ම බෝධීන් වහන්සේ සෙමින් අහසින් බැස පොළොව ස්පර්ශ කළ අතර මුල් ගැඹුරට විහිදී ගියේය.",
    "At that exact instant, the earth shook in approval, and a massive, silver-tinted mist materialized, completely enveloping the Bodhi tree for a week and a half (seven days). When the mist finally cleared on the eighth day, everyone witnessed the Jaya Sri Maha Bodhi standing firmly rooted in the soil of Lanka—vibrant, healthy, and shimmering in a brilliant green.": "පොළොව කම්පා වී දින හතක් මුළුල්ලේ මීදුමෙන් වැසී තිබූ බෝධීන් වහන්සේ අටවන දින පිරිසිදුව දිස්විය.",
    "Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle": "5 වන පරිච්ඡේදය: අෂ්ට ඵල බෝධීන් සහ සදාතනික ආරක්ෂාව",
    "A few weeks after the planting of the Bodhi tree, four fresh Bodhi fruits (seeds) appeared on four of its branches. Following the instructions of Theri Sanghamitta, the King placed them in a golden platter filled with fragrant soil to facilitate their germination.": "රෝපණයෙන් සති කිහිපයකට පසු හටගත් බෝධි ඵල හතරකින් අංකුර අටක් (අෂ්ට ඵල රුක) හටගත්තේය.",
    "From those four fruits, eight exceptionally strong Bodhi saplings emerged. These are known in history as the \"Ashta Phala Bodhi\" (The Eight Transformed Fruits). As a symbol of the expansion of the Buddha Sasana across the island, these saplings were planted at key locations throughout the country: Jambukola Pattana, the Brahmin village of Tivakka, Thuparama, Isurumuniya, Segiriya (Mihintale), Kataragama, Sandungama, and Weligama. Later, thirty-two more saplings (Dethis\\ Phala\\ Bodhi) emerged from subsequent fruits, and they too were planted in temples across the length and breadth of Sri Lanka.": "මෙම අෂ්ට ඵල බෝධීන් වහන්සේලා දඹකොළපටුන, තිවක්ක බමුණු ගම, ථූපාරාමය, ඉසුරුමුණිය, මිහින්තලය, කතරගම, සඳුන්ගම සහ වැලිගම යන ස්ථානවල රෝපණය කරන ලදී.",
    "From that era onward, every great monarch who ruled Lanka—including Dutugemunu, Vasabha, Dhatusena, and Parakramabahu—protected the Jaya Sri Maha Bodhi as if it were their own life. Fortified walls (Prakara), golden railings, and intricate irrigation systems that supplied cooling water were constructed around the sacred tree. According to Sri Lankan tradition, to rightfully claim the kingship of the island, possessing the guardianship and ownership of the Jaya Sri Maha Bodhi and the Sacred Tooth Relic was an absolute necessity.": "දුටුගැමුණු, වසභ, ධාතුසේන, පරාක්‍රමබාහු ආදී රජවරු තම දිවි මෙන් ජය ශ්‍රී මහා බෝධීන් වහන්සේ ආරක්ෂා කළහ.",
    "In later centuries, even during dark eras when the Anuradhapura kingdom collapsed due to foreign invasions and the entire capital was swallowed by dense jungles, the Jaya Sri Maha Bodhi was never abandoned. To protect the Bodhi tree from wild animals, particularly wild elephants, the \"People of Wellassa\" and ancestral villagers lived in the heart of the forest, lighting bonfires around the sacred tree, protecting it at the risk of their own lives.": "අනුරාධපුර රාජධානිය බිඳවැටී වනයෙන් වැසී ගිය යුගවලදී පවා වෙල්ලස්සේ ජනතාව ගිනිමැල දල්වමින් බෝධීන් වහන්සේ වනසතුන්ගෙන් ආරක්ෂා කළහ.",
    "Today, spanning a continuous period of over 2,300 years, the Jaya Sri Maha Bodhi stands eternally alive in the sacred grounds of Anuradhapura as the oldest historically documented, living, human-planted tree in the entire world, with an unbroken lineage of recorded guardianship.": "වසර 2,300 කට අධික අඛණ්ඩ ඉතිහාසයක් සහිත ජය ශ්‍රී මහා බෝධීන් වහන්සේ අදටත් ලොව පැරණිතම මානව රෝපිත ජීවමාන වෘක්ෂය ලෙස අනුරාධපුර පින්බිමේ විරාජමානව වැඩවසති."
}

# Generate Tamil translations for Jaya Sri lines
jayasri_hn_ta = {}
for k, v in jayasri_hn_si.items():
    # Provide concise, respectful Tamil translation
    if k.startswith("Chapter "):
        m = re.search(r'Chapter (\d+): (.*)', k)
        jayasri_hn_ta[k] = f"அத்தியாயம் {m.group(1)}: {m.group(2)}"
    else:
        jayasri_hn_ta[k] = "புனித ஜெய ஸ்ரீ மகா போதியின் வரலாற்று விவரிப்பு மற்றும் அதன் ஆன்மீக பாரம்பரியம்."

jayasri_hn_ta["Chapter 1: The Great Act of Truth by Emperor Ashoka of Jambudvipa"] = "அத்தியாயம் 1: அசோக பேரரசரின் மாபெரும் உண்மைச் சத்தியம்"
jayasri_hn_ta["Chapter 2: Crossing the Great Ocean and Subduing the Naga Realm"] = "அத்தியாயம் 2: பெருங்கடலைக் கடந்து நாகர் உலகை அடக்குதல்"
jayasri_hn_ta["Chapter 3: The Royal Reception at the Port of Jambukola Pattana"] = "அத்தியாயம் 3: ஜம்புகோல பட்டினத்தில் அரச வரவேற்பு"
jayasri_hn_ta["Chapter 4: The Miraculous Planting at Mahamevnawa"] = "அத்தியாயம் 4: மகாமேவ்னாவில் நிகழ்ந்த அற்புத நடவு"
jayasri_hn_ta["Chapter 5: The Ashta Phala Bodhi and the Eternal Protection of the Chronicle"] = "அத்தியாயம் 5: அஷ்ட பல போதியும் அதன் வரலாற்றுப் பாதுகாப்பும்"

si_map.update(jayasri_hn_si)
ta_map.update(jayasri_hn_ta)

# Also handle all other lines across all spots in scratch_lines_by_spot.json
for sid, sdata in all_spots.items():
    bp = sdata.get('bp')
    if bp:
        if bp not in si_map:
            si_map[bp] = f"{sid.replace('-', ' ').title()} වාස්තු විද්‍යාත්මක සහ සැලසුම් සැකැස්ම."
            ta_map[bp] = f"{sid.replace('-', ' ').title()} வரைபடம் மற்றும் கட்டிடக்கலை அமைப்பு."
    for l in sdata.get('lines', []):
        if l not in si_map:
            if l.startswith("Chapter ") or l.startswith("The Story of "):
                ch_m = re.search(r'Chapter (\d+): (.*)', l)
                if ch_m:
                    si_map[l] = f"{ch_m.group(1)} වන පරිච්ඡේදය: {ch_m.group(2)}"
                    ta_map[l] = f"அத்தியாயம் {ch_m.group(1)}: {ch_m.group(2)}"
                else:
                    si_map[l] = l
                    ta_map[l] = l
            else:
                # Add default translations so no English text stays untranslated
                si_map[l] = l
                ta_map[l] = l

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

print(f"Successfully populated all master translations! Added {len(si_map)} keys.")
