"""
=====================================================================
SMART DYNAMIC PRICING - WEB DASHBOARD (Streamlit)
=====================================================================
Meka run karanna:
    streamlit run dashboard_app.py

Meken karanne:
1. CSV file eka upload karanna puluwan (price, quantity_sold columns)
   Naththam file ekak upload karanne nathnam demo data eka use wenawa
2. Elasticity model eka automatic widihata train wenawa
3. Optimal price eka calculate karala pennanawa
4. Graph interactive widihata balanna puluwan
=====================================================================
"""

import streamlit as st
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_percentage_error
import matplotlib.pyplot as plt

st.set_page_config(page_title="Smart Dynamic Pricing", layout="wide")

st.title("💰 Smart Dynamic Pricing Dashboard")
st.write("Price elasticity eka calculate karala, profit maximize wena optimal price eka soyaganna.")

# ---------------------------------------------------------------
# SIDEBAR: DATA INPUT
# ---------------------------------------------------------------
st.sidebar.header("1. Data Input")
uploaded_file = st.sidebar.file_uploader(
    "CSV file eka upload karanna (columns: price, quantity_sold)", type=["csv"]
)

unit_cost = st.sidebar.number_input("Unit Cost (product ekaka cost eka)", min_value=0.0, value=40.0)

def generate_demo_data():
    """File ekak upload karanne nathnam demo data eka generate karanawa"""
    np.random.seed(42)
    n = 500
    base_price = 100
    prices = np.random.uniform(60, 150, n)
    true_elasticity = -1.5
    base_demand = 200
    noise = np.random.normal(0, 0.1, n)
    log_q = np.log(base_demand) + true_elasticity * (np.log(prices) - np.log(base_price)) + noise
    quantity = np.exp(log_q)
    return pd.DataFrame({"price": prices, "quantity_sold": quantity})

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    st.sidebar.success(f"File eka load una! ({len(df)} rows)")
else:
    df = generate_demo_data()
    st.sidebar.info("Demo data use wenawa (upload karala real data use karanna puluwan)")

# ---------------------------------------------------------------
# VALIDATE COLUMNS
# ---------------------------------------------------------------
required_cols = {"price", "quantity_sold"}
if not required_cols.issubset(df.columns):
    st.error(f"CSV file eke methana columns thiyenna one: {required_cols}")
    st.stop()

df = df[(df["price"] > 0) & (df["quantity_sold"] > 0)].copy()

# ---------------------------------------------------------------
# TRAIN MODEL (Log-Log Regression)
# ---------------------------------------------------------------
df["log_price"] = np.log(df["price"])
df["log_quantity"] = np.log(df["quantity_sold"])

X = df[["log_price"]]
y = df["log_quantity"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

elasticity = model.coef_[0]
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mape = mean_absolute_percentage_error(np.exp(y_test), np.exp(y_pred))
accuracy_pct = (1 - mape) * 100

# ---------------------------------------------------------------
# DISPLAY METRICS
# ---------------------------------------------------------------
st.header("2. Model Results")
col1, col2, col3 = st.columns(3)
col1.metric("Price Elasticity", f"{elasticity:.3f}")
col2.metric("Model Accuracy", f"{accuracy_pct:.1f}%")
col3.metric("R² Score", f"{r2:.3f}")

if elasticity < -1:
    st.success("Product eka **Elastic** ekak — price wenas kaloth demand godak wenas wenawa.")
else:
    st.info("Product eka **Inelastic** ekak — price wenas unath demand ithuru wenas wenne nehe.")

# ---------------------------------------------------------------
# PRICE OPTIMIZATION
# ---------------------------------------------------------------
st.header("3. Optimal Price Finder")

min_price = float(df["price"].min())
max_price = float(df["price"].max())

price_range = np.linspace(min_price, max_price, 300)
log_prices = np.log(price_range)
predicted_log_q = model.intercept_ + model.coef_[0] * log_prices
predicted_q = np.exp(predicted_log_q)
profits = (price_range - unit_cost) * predicted_q

optimal_idx = np.argmax(profits)
optimal_price = price_range[optimal_idx]
optimal_profit = profits[optimal_idx]
optimal_quantity = predicted_q[optimal_idx]

col1, col2, col3 = st.columns(3)
col1.metric("Optimal Price", f"{optimal_price:.2f}")
col2.metric("Expected Quantity", f"{optimal_quantity:.0f} units")
col3.metric("Expected Profit", f"{optimal_profit:.2f}")

# ---------------------------------------------------------------
# CHARTS
# ---------------------------------------------------------------
st.header("4. Visualizations")

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

st.pyplot(fig)

# ---------------------------------------------------------------
# TRY YOUR OWN PRICE
# ---------------------------------------------------------------
st.header("5. Try a Custom Price")
custom_price = st.slider("Price eka select karanna", min_value=min_price, max_value=max_price, value=float(optimal_price))
custom_log_q = model.intercept_ + model.coef_[0] * np.log(custom_price)
custom_q = np.exp(custom_log_q)
custom_profit = (custom_price - unit_cost) * custom_q

st.write(f"**Price = {custom_price:.2f}** → Expected Quantity: **{custom_q:.0f}**, Expected Profit: **{custom_profit:.2f}**")
