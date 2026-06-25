import { useEffect, useState } from "react";
import { getInsights } from "../services/insightService";

function AIInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await getInsights();
      setInsights(data);
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
      <h2>AI Insights</h2>

      <ul>
        {insights.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: "12px",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AIInsights;