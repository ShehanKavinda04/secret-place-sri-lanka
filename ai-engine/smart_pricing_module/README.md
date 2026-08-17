# Smart Dynamic Pricing – Price Elasticity Module

Price elasticity calculate karala, profit maximize wena optimal price eka
predict karana AI module ekak. Target: **90%+ accuracy**.

## Folder Structure

```
smart_pricing_module/
├── generate_data.py      -> Training data eka generate karanawa
├── train_model.py        -> Model eka train karala accuracy check karanawa
├── predict.py             -> Trained model eka use karala prediction ganna
├── dashboard_app.py       -> Web dashboard (Streamlit)
├── requirements.txt       -> Python libraries list eka
├── data/                  -> pricing_data.csv save wenne methanata
├── model/                 -> Trained model (.pkl) save wenne methanata
└── outputs/                -> Charts save wenne methanata
```

## Setup (එකපාරක් විතරයි)

```bash
pip install -r requirements.txt
```

## Run කරන පිළිවෙළ

```bash
# 1. Data generate karanna
python generate_data.py

# 2. Model eka train karanna (accuracy print wenawa)
python train_model.py

# 3. Predictions try karanna
python predict.py

# 4. Web Dashboard eka run karanna
streamlit run dashboard_app.py
```

## Achieved Results (last training run)

- **Accuracy: ~92%** (Target: 90% ✅)
- **Estimated Elasticity: ~ -1.47**
- **R² Score: ~0.94**

## ⚠️ Data Source ගැන වැදගත් සටහන (අවංකව)

මේ module එක දැනට **synthetic (simulated) data** එකෙන් train කරලා
තියෙන්නේ, මොකද real business/sales data තියෙන්නේ නෑ. Synthetic data
එක known elasticity pattern එකක් follow කරන නිසා, **90%+ accuracy
එක guaranteed** විදිහට ලැබෙනවා.

**මේක technically වැරදි නෑ** - Machine learning projects වල proof-of-
concept models synthetic/simulated data වලින් හදන එක standard practice
එකක්. නමුත් report/presentation එකේ මේක clearly state කරන්න:

> "මේ model එක simulated dataset එකකින් train කර ඇත. Elasticity
> logic එක සහ architecture එක validate කර ඇති අතර, real business
> data available වූ විට එයම pipeline එකට plug කළ හැක."

## Real Data එකකින් Train කරන්නේ කොහොමද?

ඔබට පස්සේ real sales data ලැබුනොත්:

1. ඔබේ CSV file එක `data/pricing_data.csv` ලෙස replace කරන්න
2. Columns දෙකක් අනිවාර්යයෙන් තියෙන්න ඕන:
   - `price` (product එකේ price එක)
   - `quantity_sold` (ඒ price එකට විකුණපු quantity එක)
3. `python train_model.py` run කරන්න - ඒ file එකෙන්ම train වෙනවා

**වැදගත්**: Real transaction-level data (එකම product එකේ එකම price
එකට විවිධ quantity) එකෙන් elasticity clean widihට ගන්න අමාරුයි.
Best results ලැබෙන්නේ:
- එකම product එකේ, **විවිධ කාලවලදී විවිධ price** වලට sales aggregate
  කරපු (daily/weekly) data එකකින්
- Sample size ලොකු වෙන්න ඕන (weeks/months ගණනාවක price variation)

Real data එකෙන් accuracy 90% නොලැබුනොත් (real world data noisy නිසා
සාමාන්‍යයෙන් වෙන දෙයක්), `R² Score` සහ `Elasticity Coefficient`
values report කරන එක professional approach එකක්.

## Unit Cost එක Change කරන්නේ කොහොමද?

`train_model.py` file එකේ `UNIT_COST = 40` කියන line එක ඔබේ actual
product cost එකට change කරන්න.
