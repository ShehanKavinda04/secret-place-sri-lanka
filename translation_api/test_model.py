import sys
import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "final_model")

print(f"Loading model and tokenizer from '{MODEL_PATH}'...")

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)
    print("[OK] Model loaded successfully!")
except Exception as e:
    print(f"[ERROR] Error loading model: {e}")
    sys.exit(1)

def smart_translate(sinhala_text, src_lang="sin_Sinh", tgt_lang="eng_Latn"):
    tokenizer.src_lang = src_lang
    inputs = tokenizer(sinhala_text, return_tensors="pt")
    forced_bos_token_id = tokenizer.convert_tokens_to_ids(tgt_lang)
    translated_tokens = model.generate(**inputs, forced_bos_token_id=forced_bos_token_id, max_length=128)
    result = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)
    return result[0]

test_phrases = [
    "ඔබට කෙසේද?",
    "මම ශ්‍රී ලංකාවට ආදරෙයි"
]

print("\nRunning translations...")
for phrase in test_phrases:
    try:
        translation = smart_translate(phrase)
        print(f"Original: {phrase}")
        print(f"Translated: {translation}\n")
    except Exception as e:
        print(f"Error translating '{phrase}': {e}")
