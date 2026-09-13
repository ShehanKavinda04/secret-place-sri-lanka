# encoding: utf-8
import json

abhaya_missing_si = {
    'The King, along with his chief queen Anula Devi, Queen Soma Devi, and his two companion princes, boarded a royal chariot and fled rapidly out of the city through its northern gate. As they fled, they passed a Jain monastery located near the northern gate within the city limits, inhabited by a Jain ascetic (Nigantha) named "Giri".':
    'රජතුමා තම ප්‍රධාන අගබිසව වූ අනුලා දේවිය, සෝමා දේවිය සහ කුමාරවරුන් සමඟ රාජකීය රථයට නැගී උතුරු දොරටුවෙන් නගරයෙන් පිටතට වේගයෙන් පලා ගියේය. ඔවුන් පලායද්දී, නගර සීමාව තුළ උතුරු දොරටුව අසල පිහිටි "ගිරි" නම් ජෛන තවුසා (නිගණ්ඨයා) වාසය කළ ජෛන ආරාමය පසුකර ගියහ.',

    'Seeing King Walagamba fleeing helplessly with the royal family in his chariot, Giri Nigantha burst into loud, mocking laughter and shouted insultingly for all the nearby citizens and enemy troops to hear:':
    'වළගම්බා රජු රාජකීය පවුල සමඟ රථයෙන් අසරණව පලායනු දුටු ගිරි නිගණ්ඨයා මහ හඬින් සරදම් කර සිනාසෙමින් අවට සිටි සියලු වැසියන්ට සහ සතුරු හමුදාවන්ට ඇසෙන සේ නින්දා සහගත ලෙස මෙසේ කෑගැසුවේය:',

    '"Look...! There goes the Great Black Sinhalese, defeated and fleeing in fear...!" (Mahavamsa: "Maha Kanasihalo Palayati")':
    '"බලව්...! අර මහා කළු සිංහලයා පරාජය වී බියෙන් පලායයි...!" (මහාවංශය: "මහා කාළසීහලෝ පලායති")',

    "As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The King’s entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:":
    "රථය වේගයෙන් ඇදී යද්දී මෙම නින්දා සහගත හා කටුක වදන් වළගම්බා රජුගේ දෙසවන් තුළ පැහැදිලිව දෝංකාර දුන්නේය. රජුගේ මුළු සිරුරම කෝපයෙන් වෙව්ලුම් කෑ අතර, හදවත දැඩි වේදනාවෙන් පිරී ගියේය. රථය නවත්වා නිගණ්ඨයාගේ හිස ගසා දැමීමේ අදහසින් රජු කඩුව අතට ගැනීමට සැරසුණද, ජාතියේ අනාගතය වෙනුවෙන් තමා ජීවත් විය යුතු බව වටහාගෙන තම හැඟීම් පාලනය කර ගත්තේය. දෑස් තදින් පියාගත් රජතුමා තම හදවතේ ගැඹුරින්ම දැඩි අධිෂ්ඨානයක් ඇති කර ගත්තේය:",

    "As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The King's entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:":
    "රථය වේගයෙන් ඇදී යද්දී මෙම නින්දා සහගත හා කටුක වදන් වළගම්බා රජුගේ දෙසවන් තුළ පැහැදිලිව දෝංකාර දුන්නේය. රජුගේ මුළු සිරුරම කෝපයෙන් වෙව්ලුම් කෑ අතර, හදවත දැඩි වේදනාවෙන් පිරී ගියේය. රථය නවත්වා නිගණ්ඨයාගේ හිස ගසා දැමීමේ අදහසින් රජු කඩුව අතට ගැනීමට සැරසුණද, ජාතියේ අනාගතය වෙනුවෙන් තමා ජීවත් විය යුතු බව වටහාගෙන තම හැඟීම් පාලනය කර ගත්තේය. දෑස් තදින් පියාගත් රජතුමා තම හදවතේ ගැඹුරින්ම දැඩි අධිෂ්ඨානයක් ඇති කර ගත්තේය:",

    "As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The Kings entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:":
    "රථය වේගයෙන් ඇදී යද්දී මෙම නින්දා සහගත හා කටුක වදන් වළගම්බා රජුගේ දෙසවන් තුළ පැහැදිලිව දෝංකාර දුන්නේය. රජුගේ මුළු සිරුරම කෝපයෙන් වෙව්ලුම් කෑ අතර, හදවත දැඩි වේදනාවෙන් පිරී ගියේය. රථය නවත්වා නිගණ්ඨයාගේ හිස ගසා දැමීමේ අදහසින් රජු කඩුව අතට ගැනීමට සැරසුණද, ජාතියේ අනාගතය වෙනුවෙන් තමා ජීවත් විය යුතු බව වටහාගෙන තම හැඟීම් පාලනය කර ගත්තේය. දෑස් තදින් පියාගත් රජතුමා තම හදවතේ ගැඹුරින්ම දැඩි අධිෂ්ඨානයක් ඇති කර ගත්තේය:",

    '"When I someday reorganize my Sinhalese army, completely vanquish these enemies, and recapture Anuradhapura... I will utterly raze this insulting Nigantha monastery to the ground! And on this very spot, for the longevity of the Buddha Sasana, I shall construct a magnificent Buddhist empire and a monumental stupa that will astound the entire world...!"':
    '"යම් දිනක මා සිංහල සේනාව සංවිධානය කර, මේ සියලු සතුරන් මුලිනුපුටා දමා, අනුරාධපුරය නැවත අත්පත් කරගත් පසු... මා මේ නින්දා සහගත නිගණ්ඨ ආරාමය බිමටම සමතලා කරන්නෙමි! සම්බුද්ධ ශාසනයේ චිරස්ථිතිය උදෙසා මුළු ලොවම මවිත කරවන මහා බෞද්ධ අධිරාජ්‍යයක් සහ අති දැවැන්ත ස්තූපයක් මේ ස්ථානයේදීම ඉදිකරන්නෙමි...!"'
}

abhaya_missing_ta = {
    'The King, along with his chief queen Anula Devi, Queen Soma Devi, and his two companion princes, boarded a royal chariot and fled rapidly out of the city through its northern gate. As they fled, they passed a Jain monastery located near the northern gate within the city limits, inhabited by a Jain ascetic (Nigantha) named "Giri".':
    'மன்னர் தனது பிரதான ராணி அனுலா தேவி, சோமா தேவி மற்றும் இளவரசர்களுடன் அரச ரதத்தில் ஏறி வடக்கு வாயில் வழியாக நகரை விட்டு வேகமாக வெளியேறினார். செல்லும் வழியில், வடக்கு வாயிலுக்கு அருகில் இருந்த "கிரி" என்ற சமண துறவியின் ஆசிரமத்தைக் கடந்தனர்.',

    'Seeing King Walagamba fleeing helplessly with the royal family in his chariot, Giri Nigantha burst into loud, mocking laughter and shouted insultingly for all the nearby citizens and enemy troops to hear:':
    'வலகம்பா மன்னர் தனது குடும்பத்துடன் ரதத்தில் தப்பிச் செல்வதைக் கண்ட கிரி நிகண்டன் கேலியாகச் சிரித்து, அனைவரும் கேட்கும் வகையில் அவதூறாகக் கத்தினான்:',

    '"Look...! There goes the Great Black Sinhalese, defeated and fleeing in fear...!" (Mahavamsa: "Maha Kanasihalo Palayati")':
    '"பாருங்கள்...! அங்கே பெரும் கருப்பு சிங்களவன் தோற்றுப் பயந்து ஓடுகிறான்...!" (மகாவம்சம்: "மகா காளசீஹலோ பாலாயதி")',

    "As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The King’s entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:":
    "ரதம் விரைந்து செல்லும்போது இந்த கடுமையான அவமான வார்த்தைகள் மன்னரின் காதுகளில் எதிரொலித்தன. மன்னரின் உடல் கோபத்தால் நடுங்கியது, ஆனால் நாட்டின் எதிர்காலத்திற்காக தனது உணர்வுகளைக் கட்டுப்படுத்திக் கொண்டு, இதயத்தின் ஆழத்திலிருந்து ஒரு உறுதியான சபதம் செய்தார்:",

    "As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The King's entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:":
    "ரதம் விரைந்து செல்லும்போது இந்த கடுமையான அவமான வார்த்தைகள் மன்னரின் காதுகளில் எதிரொலித்தன. மன்னரின் உடல் கோபத்தால் நடுங்கியது, ஆனால் நாட்டின் எதிர்காலத்திற்காக தனது உணர்வுகளைக் கட்டுப்படுத்திக் கொண்டு, இதயத்தின் ஆழத்திலிருந்து ஒரு உறுதியான சபதம் செய்தார்:",

    "As the chariot sped past, these humiliating and harsh words echoed clearly in the ears of King Walagamba. The Kings entire body trembled with rage, and his heart filled with deep agony. He instinctively reached for his sword, intending to halt the chariot and decapitate the ascetic, but he mastered his emotions, realizing he must survive for the sake of the nation's future. Closing his eyes tightly, the King made a fierce, solemn vow from the depths of his heart:":
    "ரதம் விரைந்து செல்லும்போது இந்த கடுமையான அவமான வார்த்தைகள் மன்னரின் காதுகளில் எதிரொலித்தன. மன்னரின் உடல் கோபத்தால் நடுங்கியது, ஆனால் நாட்டின் எதிர்காலத்திற்காக தனது உணர்வுகளைக் கட்டுப்படுத்திக் கொண்டு, இதயத்தின் ஆழத்திலிருந்து ஒரு உறுதியான சபதம் செய்தார்:",

    '"When I someday reorganize my Sinhalese army, completely vanquish these enemies, and recapture Anuradhapura... I will utterly raze this insulting Nigantha monastery to the ground! And on this very spot, for the longevity of the Buddha Sasana, I shall construct a magnificent Buddhist empire and a monumental stupa that will astound the entire world...!"':
    '"நான் ஒரு நாள் எனது படைகளை ஒன்றுதிரட்டி, எதிரிகளை முழுமையாக அழித்து, அனுராதபுரத்தை மீட்டெடுக்கும் போது... இந்த அவமானகரமான ஆசிரமத்தை தரைமட்டமாக்கி, அவ்விடத்தில் உலகமே வியக்கும் வண்ணம் ஒரு பிரம்மாண்ட பௌத்த விகாரையையும் மாபெரும் தூபியையும் கட்டுவேன்...!"'
}

with open('resources/js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

si_insert_marker = "    SI: {\n"
ta_insert_marker = "    TA: {\n"

si_str = ""
for k, v in abhaya_missing_si.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    si_str += f"        {k_json}: {v_json},\n"

ta_str = ""
for k, v in abhaya_missing_ta.items():
    k_json = json.dumps(k, ensure_ascii=False)
    v_json = json.dumps(v, ensure_ascii=False)
    ta_str += f"        {k_json}: {v_json},\n"

content = content.replace(si_insert_marker, si_insert_marker + si_str, 1)
content = content.replace(ta_insert_marker, ta_insert_marker + ta_str, 1)

with open('resources/js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added missing Abhayagiriya lines successfully!")
