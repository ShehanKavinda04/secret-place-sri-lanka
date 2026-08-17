from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import sys
from smart_pricing_module.elasticity import predict_demand as elastic_demand, predict_profit as elastic_profit


try:
    import sklearn._loss._loss as sklearn_loss
    sys.modules['_loss'] = sklearn_loss
except ImportError:
    pass

app = Flask(__name__)
CORS(app) 

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'cwgbm_model.pkl')

if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as file:
        model = pickle.load(file)
    print("[OK] CwGBM AI Model Loaded Successfully!")
else:
    print("[ERROR] Error: cwgbm_model.pkl not found in ai-engine folder!")


@app.route('/api/predict-demand', methods=['POST'])
def predict_demand():
    try:
        data = request.json
        
        
        temp = float(data['temperature'])
        dew = float(data['dew_point'])
        is_peak = int(data['is_peak_season'])
        lagged_demand = float(data['lagged_demand'])
        
        
        input_features = np.array([[temp, dew, is_peak, lagged_demand]])
        
        
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

@app.route('/api/predict-price-elasticity', methods=['POST'])
def predict_price_elasticity():
    try:
        data = request.json
        price = float(data.get('price', 0))
        
        if price <= 0:
            return jsonify({'status': 'error', 'message': 'Price must be greater than 0'}), 400
            
        expected_demand = elastic_demand(price)
        expected_profit = elastic_profit(price)
        
        return jsonify({
            'status': 'success',
            'price': round(price, 2),
            'expected_demand': round(expected_demand, 2),
            'expected_profit': round(expected_profit, 2)
        }), 200

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400


if __name__ == '__main__':
   
    app.run(host='0.0.0.0', port=5001, debug=True)