import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv("data/supply_chain_data.csv")

X = df[
    [
        "Stock levels",
        "Lead times",
        "Shipping times",
        "Shipping costs",
        "Manufacturing costs",
    ]
]

y = df["Costs"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

joblib.dump(model, "model.pkl")

print("Model Trained Successfully")