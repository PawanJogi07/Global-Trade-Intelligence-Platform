import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getFeatureImportance } from "../services/featureImportanceService";

function FeatureImportance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getFeatureImportance();
    setData(result);
  };

  return (
    <div
      style={{
        background: "#151b24",
        padding: 20,
        borderRadius: 12,
        marginTop: 30,
      }}
    >
      <h2>📊 ML Feature Importance</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="importance" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FeatureImportance;