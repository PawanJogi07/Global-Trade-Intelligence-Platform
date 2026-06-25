import { useEffect, useState } from "react";
import { getShipments } from "../services/shipmentService";
import { getPrediction } from "../services/predictService";

function ShipmentTable() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const data = await getShipments();
      setShipments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePredict = async (shipmentId) => {
    try {
      await getPrediction(shipmentId);

      // Prediction ke baad latest data reload
      fetchShipments();
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
      <h2>Shipment Risk Monitoring</h2>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Route</th>
            <th>AI Score</th>
            <th>Risk</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((item) => (
            <tr key={item._id}>
              <td>{item.shipmentId}</td>

              <td>{item.route}</td>

              <td>{item.predictedRisk || "-"}</td>

              <td>
                <span
                  style={{
                    color:
                      item.risk === "High"
                        ? "red"
                        : item.risk === "Medium"
                        ? "orange"
                        : "lime",
                    fontWeight: "bold",
                  }}
                >
                  {item.risk}
                </span>
              </td>

              <td>
                <button
                  onClick={() => handlePredict(item.shipmentId)}
                  style={{
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Predict
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentTable;