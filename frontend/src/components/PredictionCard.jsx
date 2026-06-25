import { useEffect, useState } from "react";
import { getPrediction } from "../services/predictService";

function PredictionCard() {
  const [risk, setRisk] = useState("Loading...");

  useEffect(() => {
    fetchPrediction();
  }, []);

  const fetchPrediction = async () => {
    try {
      // SH002 ke liye prediction
      const data = await getPrediction("SH002");

      console.log("Prediction API:", data);

      setRisk(data.predictedRisk);
    } catch (error) {
      console.log("Prediction Error:", error);
      setRisk("Error fetching prediction");
    }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        textAlign: "center",
      }}
    >
      <h2>AI Predicted Risk</h2>

      <h1>{risk}</h1>
    </div>
  );
}

export default PredictionCard;