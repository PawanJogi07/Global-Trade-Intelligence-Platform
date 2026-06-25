import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getPredictionHistory } from "../services/historyService";

function PredictionHistoryChart() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getPredictionHistory();

      const chartData = data.map((item) => ({
        shipment: item.shipmentId,
        score: item.predictedRisk,
        time: new Date(item.createdAt).toLocaleTimeString(),
      }));

      setHistory(chartData);
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
      <h2>AI Prediction Trend</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionHistoryChart;