from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import sys

# Register '_loss' alias for compatibility with older scikit-learn models
try:
    import sklearn._loss._loss as sklearn_loss
    sys.modules['_loss'] = sklearn_loss
except ImportError:
    pass

app = Flask(__name__)
CORS(app) # React frontend එකෙන් කෙලින්ම call කලොත් block වීම වැළැක්වීමට

# 1. AI මොඩලය (Pickle file) නිවැරදිව Load කරගැනීම
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'cwgbm_model.pkl')

if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as file:
        model = pickle.load(file)
    print("[OK] CwGBM AI Model Loaded Successfully!")
else:
    print("[ERROR] Error: cwgbm_model.pkl not found in ai-engine folder!")

# 2. අනාවැකි ලබාදෙන API Endpoint එක සෑදීම
@app.route('/api/predict-demand', methods=['POST'])
def predict_demand():
    try:
        data = request.json
        
        # Laravel හෝ React වෙතින් ලැබෙන සජීවී දත්ත ලබා ගැනීම
        temp = float(data['temperature'])
        dew = float(data['dew_point'])
        is_peak = int(data['is_peak_season'])
        lagged_demand = float(data['lagged_demand'])
        
        # AI මොඩලයට ගැළපෙන පරිදි Array එකක් සෑදීම
        input_features = np.array([[temp, dew, is_peak, lagged_demand]])
        
        # Real-time Prediction (එසැණින් අනාවැකිය ගණනය කිරීම)
        prediction = model.predict(input_features)[0]
        
        return jsonify({
            'status': 'success',
            'predicted_demand': round(prediction, 2)
        }), 200

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

if __name__ == '__main__':
    # Localhost හි 5001 පෝට් එකේ සර්වර් එක ක්‍රියාත්මක කිරීම
    app.run(host='0.0.0.0', port=5001, debug=True)