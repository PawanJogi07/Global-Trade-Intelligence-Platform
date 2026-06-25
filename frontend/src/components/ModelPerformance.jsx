import { useEffect, useState } from "react";
import { getModelPerformance } from "../services/modelPerformanceService";

function ModelPerformance() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    const data = await getModelPerformance();
    setMetrics(data);
  };

  if (!metrics) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        background: "#1e293b",
        padding: 20,
        borderRadius: 12,
        marginTop: 30,
        color: "white",
      }}
    >
      <h2>🤖 ML Model Performance</h2>

      <h3>Accuracy : {metrics.accuracy}%</h3>

      <h3>MAE : {metrics.mae}</h3>

      <h3>RMSE : {metrics.rmse}</h3>

      <h3>R² Score : {metrics.r2}</h3>
    </div>
  );
}

export default ModelPerformance;