"""
=====================================================================
PREDICT - Trained model eka use karala price/demand check karanna
=====================================================================
RUN KARANNA:
    python predict.py
=====================================================================
"""

import joblib
import numpy as np

MODEL_PATH = "model/elasticity_model.pkl"

saved = joblib.load(MODEL_PATH)
model = saved["model"]
unit_cost = saved["unit_cost"]

print(f"Model loaded! (Accuracy: {saved['accuracy_pct']:.2f}%, Elasticity: {saved['elasticity']:.3f})")

def predict_demand(price: float) -> float:
    """Dena price ekakata demand eka predict karanawa"""
    log_q = model.intercept_ + model.coef_[0] * np.log(price)
    return float(np.exp(log_q))

def predict_profit(price: float) -> float:
    """Dena price ekakata expected profit eka calculate karanawa"""
    quantity = predict_demand(price)
    return (price - unit_cost) * quantity

if __name__ == "__main__":
    # Example: try different prices
    test_prices = [70, 90, 100, 110, 130]
    print("\nPrice -> Predicted Quantity -> Expected Profit")
    print("-" * 50)
    for p in test_prices:
        q = predict_demand(p)
        profit = predict_profit(p)
        print(f"Price {p:>6.2f}  ->  Quantity {q:>8.1f}  ->  Profit {profit:>10.2f}")

    # Custom price try karanna
    try:
        user_price = float(input("\nObe price eka danna (test karanna): "))
        q = predict_demand(user_price)
        profit = predict_profit(user_price)
        print(f"\nPrice {user_price:.2f} -> Quantity {q:.1f} -> Profit {profit:.2f}")
    except (ValueError, EOFError):
        pass
