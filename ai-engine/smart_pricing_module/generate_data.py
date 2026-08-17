"""
=====================================================================
DATA GENERATOR - Smart Dynamic Pricing Module
=====================================================================
Meka synthetic (simulated but realistic) price-demand data generate
karala data/pricing_data.csv widihata save karanawa.

REAL DATA thiyenawa nam: methana wenuwata obe CSV file eka 
"data/pricing_data.csv" widihata copy karala, columns "price" saha 
"quantity_sold" widihata rename karanna. Ithuru step ekakwath one 
naha - train_model.py eka automatic widihata ehema data eka use 
karagannawa.
=====================================================================
"""

import numpy as np
import pandas as pd
import os

np.random.seed(42)

n_samples = 1000          # rows gananaya
base_price = 100          # reference price eka
base_demand = 200          # base_price ekedi demand eka
true_elasticity = -1.5     # simulate karana elasticity value eka
unit_cost = 40              # product ekaka cost eka (optimization ekata one)

prices = np.random.uniform(60, 150, n_samples)
noise = np.random.normal(0, 0.1, n_samples)

log_quantity = (
    np.log(base_demand)
    + true_elasticity * (np.log(prices) - np.log(base_price))
    + noise
)
quantity = np.exp(log_quantity)

df = pd.DataFrame({
    "price": np.round(prices, 2),
    "quantity_sold": np.round(quantity).astype(int),
})

os.makedirs("data", exist_ok=True)
df.to_csv("data/pricing_data.csv", index=False)

print(f"Data generate una: data/pricing_data.csv ({len(df)} rows)")
print(df.head())
