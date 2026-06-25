from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load("model.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    df = pd.DataFrame([data])

    prediction = model.predict(df)

    return jsonify({
        "predictedRisk": round(float(prediction[0]), 2)
    })

if __name__ == "__main__":
    app.run(port=5001)