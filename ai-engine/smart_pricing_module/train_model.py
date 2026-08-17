"""
=====================================================================
TRAIN MODEL - Smart Dynamic Pricing / Price Elasticity Module
=====================================================================
Meka karanne:
1. data/pricing_data.csv eka load karanawa (nathnam generate karanawa)
2. Log-Log Regression eken elasticity model eka train karanawa
3. Accuracy check karanawa (target: 90%+)
4. Optimal price eka calculate karanawa
5. model/elasticity_model.pkl widihata model eka save karanawa
6. outputs/ folder eke chart eka save karanawa

RUN KARANNA:
    python train_model.py
=====================================================================
"""

import os
import numpy as np
import pandas as pd
import joblib
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_percentage_error

DATA_PATH = "data/pricing_data.csv"
MODEL_PATH = "model/elasticity_model.pkl"
CHART_PATH = "outputs/price_optimization_chart.png"
UNIT_COST = 40  # REAL DATA WALADA MEKA obe product ekaka actual cost ekata change karanna

# ---------------------------------------------------------------
# STEP 1: DATA LOAD KARANAWA
# ---------------------------------------------------------------
if not os.path.exists(DATA_PATH):
    print("Data file eka hamba unne naha - generate_data.py eka run karanawa...")
    os.system("python generate_data.py")

df = pd.read_csv(DATA_PATH)
df = df[(df["price"] > 0) & (df["quantity_sold"] > 0)].copy()

print("=" * 60)
print(f"DATA LOADED: {len(df)} rows")
print("=" * 60)
print(df.head())

# ---------------------------------------------------------------
# STEP 2: LOG TRANSFORM (Log-Log Regression sadaha)
# ---------------------------------------------------------------
df["log_price"] = np.log(df["price"])
df["log_quantity"] = np.log(df["quantity_sold"])

X = df[["log_price"]]
y = df["log_quantity"]

# ---------------------------------------------------------------
# STEP 3: TRAIN / TEST SPLIT
# ---------------------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ---------------------------------------------------------------
# STEP 4: MODEL TRAIN KARANAWA
# ---------------------------------------------------------------
model = LinearRegression()
model.fit(X_train, y_train)

elasticity = model.coef_[0]

# ---------------------------------------------------------------
# STEP 5: EVALUATE KARANAWA
# ---------------------------------------------------------------
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mape = mean_absolute_percentage_error(np.exp(y_test), np.exp(y_pred))
accuracy_pct = (1 - mape) * 100

print("\n" + "=" * 60)
print("MODEL RESULTS")
print("=" * 60)
print(f"Estimated Price Elasticity : {elasticity:.3f}")
print(f"R² Score                   : {r2:.3f}")
print(f"MAPE (error %)              : {mape*100:.2f}%")
print(f"Accuracy                    : {accuracy_pct:.2f}%")

if accuracy_pct >= 90:
    print(f"\n✅ TARGET ACHIEVED - Accuracy {accuracy_pct:.2f}% >= 90%")
else:
    print(f"\n⚠️ Accuracy {accuracy_pct:.2f}% < 90% - check data quality / outliers")

if elasticity < -1:
    print(">> Product eka ELASTIC ekak")
else:
    print(">> Product eka INELASTIC ekak")

# ---------------------------------------------------------------
# STEP 6: OPTIMAL PRICE CALCULATE KARANAWA (Profit Maximize)
# ---------------------------------------------------------------
price_range = np.linspace(df["price"].min(), df["price"].max(), 300)
log_p = np.log(price_range)
predicted_q = np.exp(model.intercept_ + model.coef_[0] * log_p)
profits = (price_range - UNIT_COST) * predicted_q

optimal_idx = np.argmax(profits)
optimal_price = price_range[optimal_idx]
optimal_profit = profits[optimal_idx]

print("\n" + "=" * 60)
print("OPTIMAL PRICE")
print("=" * 60)
print(f"Optimal Price   : {optimal_price:.2f}")
print(f"Expected Profit : {optimal_profit:.2f}")

# ---------------------------------------------------------------
# STEP 7: CHART SAVE KARANAWA
# ---------------------------------------------------------------
os.makedirs("outputs", exist_ok=True)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.scatter(df["price"], df["quantity_sold"], alpha=0.4, label="Actual data")
ax1.plot(price_range, predicted_q, color="red", label="Model prediction")
ax1.set_xlabel("Price")
ax1.set_ylabel("Quantity Sold")
ax1.set_title("Price vs Demand")
ax1.legend()

ax2.plot(price_range, profits, color="green")
ax2.axvline(optimal_price, color="red", linestyle="--", label=f"Optimal = {optimal_price:.2f}")
ax2.set_xlabel("Price")
ax2.set_ylabel("Profit")
ax2.set_title("Profit vs Price")
ax2.legend()

plt.tight_layout()
plt.savefig(CHART_PATH, dpi=120)
print(f"\nChart save una: {CHART_PATH}")

# ---------------------------------------------------------------
# STEP 8: MODEL SAVE KARANAWA
# ---------------------------------------------------------------
os.makedirs("model", exist_ok=True)
joblib.dump({
    "model": model,
    "unit_cost": UNIT_COST,
    "elasticity": elasticity,
    "accuracy_pct": accuracy_pct,
    "r2": r2,
}, MODEL_PATH)
print(f"Model save una: {MODEL_PATH}")
print("\n✅ Training COMPLETE!")
