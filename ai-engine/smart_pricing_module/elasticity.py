import joblib
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "elasticity_model.pkl")

# Load model and parameters globally so they are cached
try:
    saved = joblib.load(MODEL_PATH)
    model = saved["model"]
    unit_cost = saved["unit_cost"]
    accuracy_pct = saved["accuracy_pct"]
    elasticity_val = saved["elasticity"]
    model_loaded = True
except Exception as e:
    model_loaded = False
    error_msg = str(e)

def predict_demand(price: float) -> float:
    """Predict expected demand quantity based on a given price."""
    if not model_loaded:
        raise RuntimeError(f"Elasticity model failed to load: {error_msg}")
    log_q = model.intercept_ + model.coef_[0] * np.log(price)
    return float(np.exp(log_q))

def predict_profit(price: float) -> float:
    """Calculate expected profit based on a given price."""
    if not model_loaded:
        raise RuntimeError(f"Elasticity model failed to load: {error_msg}")
    quantity = predict_demand(price)
    return (price - unit_cost) * quantity
