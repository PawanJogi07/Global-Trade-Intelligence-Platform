import { useEffect, useState } from "react";
import { getCommodity } from "../services/commodityService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CommodityChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCommodity();
  }, []);

  const fetchCommodity = async () => {
    try {
      const commodityData = await getCommodity();
      setData(commodityData);
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
      }}
    >
      <h2>Live Commodity Trend</h2>

      <LineChart
        width={900}
        height={300}
        data={data}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#0689ad"
        />
      </LineChart>
    </div>
  );
}

export default CommodityChart;