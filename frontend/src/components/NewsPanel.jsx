import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";

function NewsPanel() {
const [news, setNews] = useState([]);

useEffect(() => {
fetchNews();
}, []);

const fetchNews = async () => {
  try {
    const data = await getNews();

console.log("STATE NEWS:", news);
    setNews(data);
  } catch (error) {
    console.log("ERROR:", error);
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
> <h2>Global Trade News</h2>


  <div style={{ marginTop: "20px" }}>
    {news.map((item) => (
      <div
        key={item.id}
        style={{
          background: "#0f172a",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        📰 {item.title}
      </div>
    ))}
  </div>
</div>


);
}

export default NewsPanel;
