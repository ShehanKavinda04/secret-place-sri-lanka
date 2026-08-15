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

# Fix sklearn module loss alias for cwgbm_model.pkl unpickling
try:
    import sklearn._loss._loss as sklearn_loss
    sys.modules['_loss'] = sklearn_loss
except Exception:
    pass

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import pandas as pd
import gdown
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "final_model")
MODEL_FILE = os.path.join(MODEL_DIR, "model.safetensors")
GLOSSARY_PATH = os.path.join(BASE_DIR, "sinhala_cultural_glossary_v3_50entries.csv")
CWGBM_PATH = os.path.abspath(os.path.join(BASE_DIR, "..", "ai-engine", "cwgbm_model.pkl"))

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

# Load CwGBM AI Demand Forecast Model
cwgbm_model = None
if os.path.exists(CWGBM_PATH):
    try:
        with open(CWGBM_PATH, 'rb') as f:
            cwgbm_model = pickle.load(f)
        print("[OK] CwGBM Demand Forecast AI Model Loaded Successfully!")
    except Exception as e:
        print(f"[WARNING] Failed to load CwGBM model: {e}")
else:
    print(f"[WARNING] CwGBM model file not found at '{CWGBM_PATH}'.")

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

@app.route('/api/predict-demand', methods=['POST'])
def predict_demand():
    try:
        data = request.json or {}
        temp = float(data.get('temperature', 28.5))
        dew = float(data.get('dew_point', 22.1))
        is_peak = int(data.get('is_peak_season', 1))
        lagged_demand = float(data.get('lagged_demand', 450))

        if cwgbm_model is not None:
            input_features = np.array([[temp, dew, is_peak, lagged_demand]])
            prediction = float(cwgbm_model.predict(input_features)[0])
        else:
            base = lagged_demand * (1.15 if is_peak else 0.85)
            temp_adj = (30.0 - temp) * 8
            prediction = round(max(50.0, base + temp_adj), 2)

        return jsonify({
            'status': 'success',
            'predicted_demand': round(prediction, 2),
            'model_used': 'cwgbm_model.pkl' if cwgbm_model is not None else 'algorithmic_fallback'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

@app.route('/health', methods=['GET'])
def health_check():
    model_loaded = (model is not None and tokenizer is not None)
    cwgbm_loaded = (cwgbm_model is not None)
    return jsonify({
        "status": "running",
        "model_loaded": model_loaded,
        "cwgbm_loaded": cwgbm_loaded,
        "glossary_count": len(glossary_dict)
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
