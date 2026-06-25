import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!analytics) return <h2>Loading Analytics...</h2>;

  const cardStyle = {
    flex: 1,
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    color: "white",
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ textAlign: "center" }}>
        📊 Live Analytics Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Shipments</h3>
          <h1>{analytics.totalShipments}</h1>
        </div>

        <div style={cardStyle}>
          <h3>High Risk</h3>
          <h1 style={{ color: "red" }}>
            {analytics.highRisk}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Medium Risk</h3>
          <h1 style={{ color: "orange" }}>
            {analytics.mediumRisk}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Low Risk</h3>
          <h1 style={{ color: "lime" }}>
            {analytics.lowRisk}
          </h1>
        </div>

        <div style={cardStyle}>
          <h3>Average AI Score</h3>
          <h1>{analytics.averageRisk}</h1>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;