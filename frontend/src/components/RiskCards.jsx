import { useEffect, useState } from "react";
import { getRisk } from "../services/riskService";

function RiskCards() {
  const [risk, setRisk] = useState({
    globalRisk: 0,
    weatherRisk: 0,
    shippingRisk: 0,
    commodityRisk: 0,
  });

  useEffect(() => {
    fetchRisk();
  }, []);

  const fetchRisk = async () => {
    try {
      const data = await getRisk();
      setRisk(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "220px",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <div style={cardStyle}>
        <h3>Global Risk</h3>
        <h1>{risk.globalRisk}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Weather Risk</h3>
        <h1>{risk.weatherRisk}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Shipping Risk</h3>
        <h1>{risk.shippingRisk}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Commodity Risk</h3>
        <h1>{risk.commodityRisk}</h1>
      </div>
    </div>
  );
}

export default RiskCards;