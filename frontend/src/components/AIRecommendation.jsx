import { useState } from "react";
import { getExplanation } from "../services/explanationService";

function AIRecommendation() {
  const [data, setData] = useState(null);

  const loadRecommendation = async () => {
    try {
      const result = await getExplanation("SH002");
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
      }}
    >
      <h2>AI Decision Support</h2>

      <button
        onClick={loadRecommendation}
        style={{
          marginTop: "15px",
          padding: "10px 18px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Generate Recommendation
      </button>

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Shipment: {data.shipmentId}
          </h3>

          <h3>
            AI Score: {data.predictedRisk}
          </h3>

          <h3>
            Risk: {data.risk}
          </h3>

          <h3>Reasons</h3>

          <ul>
            {data.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>

          <h3>Recommendations</h3>

          <ul>
            {data.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AIRecommendation;