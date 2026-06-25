import Navbar from "../components/Navbar";
import RiskCards from "../components/RiskCards";
import WeatherChart from "../components/WeatherChart";
import CommodityChart from "../components/CommodityChart";
import AIInsights from "../components/AIInsights";
import AlertPanel from "../components/AlertPanel";
import ShipmentTable from "../components/ShipmentTable";
import NewsPanel from "../components/NewsPanel";
import PredictionCard from "../components/PredictionCard";
import PredictionHistoryChart from "../components/PredictionHistoryChart";
import AIRecommendation from "../components/AIRecommendation";
import ShipmentWorldMap from "../components/ShipmentWorldMap";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import ModelPerformance from "../components/ModelPerformance";
import FeatureImportance from "../components/FeatureImportance";
function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1d3d",
        color: "white",
      }}
    >
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Global Trade Intelligence Platform
        </h1>

      <RiskCards />

<div style={{ marginTop: "30px" }}>
  <PredictionCard />
</div>

<div style={{ marginTop: "30px" }}>
  <WeatherChart />
</div>
        <div style={{ marginTop: "30px" }}>
          <CommodityChart />
        </div>
        <div style={{ marginTop: "30px" }}>
          <AIInsights />
        </div>
        <div style={{ marginTop: "30px" }}>
          <AlertPanel />
        </div>
        <div style={{ marginTop: "30px" }}>
          <ShipmentTable />
        </div>
        <div style={{ marginTop: "30px" }}>
  <PredictionHistoryChart />
</div>
<div style={{ marginTop: "30px" }}>
  <AIRecommendation />
</div>
<ShipmentWorldMap />
<div style={{ marginTop: "30px" }}>
  <AnalyticsDashboard />
</div>
<ModelPerformance />
<div style={{ marginTop: "30px" }}>
  <FeatureImportance />
</div>
   <div style={{ marginTop: "30px" }}>
          <NewsPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;