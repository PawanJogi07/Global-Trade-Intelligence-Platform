import { useEffect, useState } from "react";
import { getAlerts } from "../services/alertService";

function AlertPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      console.log(error);
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
      <h2>Critical Alerts</h2>

      <div style={{ marginTop: "15px" }}>
        {alerts.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "12px",
              fontSize: "18px",
            }}
          >
            {item.severity === "High" ? "🔴" : "🟡"} {item.alert}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertPanel;