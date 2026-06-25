import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
} from "recharts";

function WeatherChart() {
const [data, setData] = useState([]);

useEffect(() => {
fetchWeather();
}, []);

const fetchWeather = async () => {
try {
const weatherData = await getWeather();


  const formatted = weatherData.map((item) => ({
    day: item.date.split(" ")[1],
    risk: item.temp,
  }));

  setData(formatted);
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
> <h2>Live Weather Trend</h2>


  <LineChart
    width={900}
    height={300}
    data={data}
  >
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="risk"
      stroke="#22d3ee"
    />
  </LineChart>
</div>


);
}

export default WeatherChart;
