import os
import sys

# Configure UTF-8 encoding for standard output/error on Windows terminals if supported
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
if sys.stderr and hasattr(sys.stderr, 'reconfigure'):
    try:
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import pandas as pd
import gdown

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "final_model")
MODEL_FILE = os.path.join(MODEL_DIR, "model.safetensors")
GLOSSARY_PATH = os.path.join(BASE_DIR, "sinhala_cultural_glossary_v3_50entries.csv")

# Ensure final_model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Check if model.safetensors exists; if not, download from Google Drive
if not os.path.exists(MODEL_FILE):
    try:
        print("Model file එක නෑ. Google Drive එකෙන් Download වෙනවා...")
    except UnicodeEncodeError:
        print("Model file not found. Downloading from Google Drive...")
        
    file_id = os.environ.get("GDRIVE_FILE_ID", "1T44_jFm-HetjciNjDQwrRh72V83nK9Zl")
    url = f"https://drive.google.com/uc?id={file_id}"
    try:
        gdown.download(url, MODEL_FILE, quiet=False)
    except Exception as e:
        print(f"[ERROR] Google Drive download failed: {e}")

# Load tokenizer and model
tokenizer = None
model = None

try:
    print("Loading model and tokenizer from final_model...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_DIR)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

# Load cultural glossary
glossary_dict = {}
if os.path.exists(GLOSSARY_PATH):
    try:
        glossary_df = pd.read_csv(GLOSSARY_PATH)
        glossary_dict = dict(zip(glossary_df['Sinhala'], glossary_df['English_Cultural_Equivalent']))
        print(f"Glossary loaded with {len(glossary_dict)} entries.")
    except Exception as e:
        print(f"Failed to read glossary CSV: {e}")

def smart_translate(sinhala_text, src_lang="sin_Sinh", tgt_lang="eng_Latn"):
    cleaned_text = sinhala_text.strip()
    if cleaned_text in glossary_dict:
        return glossary_dict[cleaned_text], "glossary"
    
    if tokenizer is None or model is None:
        raise RuntimeError("Model is not loaded. Please ensure model.safetensors is downloaded or present in final_model directory.")
    
    tokenizer.src_lang = src_lang
    inputs = tokenizer(sinhala_text, return_tensors="pt")
    forced_bos_token_id = tokenizer.convert_tokens_to_ids(tgt_lang)
    translated_tokens = model.generate(**inputs, forced_bos_token_id=forced_bos_token_id, max_length=128)
    result = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)
    return result[0], "model"

@app.route('/translate', methods=['POST'])
def translate_endpoint():
    data = request.json or {}
    sinhala_text = data.get('text', '')
    if not sinhala_text:
        return jsonify({"error": "Text field is required"}), 400
    try:
        translation, source = smart_translate(sinhala_text)
        return jsonify({"translation": translation, "source": source})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    model_loaded = (model is not None and tokenizer is not None)
    return jsonify({
        "status": "running",
        "model_loaded": model_loaded,
        "glossary_count": len(glossary_dict)
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
