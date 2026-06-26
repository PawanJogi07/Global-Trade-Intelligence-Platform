require("dotenv").config();
const Shipment = require("./models/Shipment");
const PredictionHistory = require("./models/PredictionHistory");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
console.log("KEY:", process.env.OPENWEATHER_API_KEY);
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(error);
  });

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Ready");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongo Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB Disconnected");
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
res.json({
message: "Global Trade Intelligence API Running",
});
});

app.get("/api/news", async (req, res) => {
try {
const response = await axios.get(
`https://gnews.io/api/v4/search?q=supply%20chain&lang=en&max=10&apikey=${process.env.GNEWS_API_KEY}`
);


const news = response.data.articles.map((article, index) => ({
  id: index + 1,
  title: article.title,
}));

res.json(news);


} catch (error) {
console.log("========== FULL ERROR ==========");
console.log(error.response?.data || error.message);
console.log("================================");


res.status(500).json({
  message: "Failed To Fetch News",
});


}
});
app.get("/api/weather", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Mumbai&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const weather = response.data.list.slice(0, 5).map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      humidity: item.main.humidity,
    }));

    res.json(weather);
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "Failed To Fetch Weather",
    });
  }
});


app.get("/api/commodity", (req, res) => {
  res.json([
    { month: "Jan", price: 70 },
    { month: "Feb", price: 75 },
    { month: "Mar", price: 80 },
    { month: "Apr", price: 78 },
    { month: "May", price: 86 },
  ]);
});



app.get("/api/risk", async (req, res) => {
  try {
    const weatherRisk = 65;

    const commodityResponse = await fetch(
      "http://localhost:5000/api/commodity"
    );

    const commodityData = await commodityResponse.json();

    const latestCommodity =
      commodityData[commodityData.length - 1].price;

    const commodityRisk =
      latestCommodity > 80 ? 75 : 45;

    const shippingRisk = 81;

    const globalRisk = Math.round(
      (weatherRisk + commodityRisk + shippingRisk) / 3
    );

    res.json({
      globalRisk,
      weatherRisk,
      shippingRisk,
      commodityRisk,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed To Calculate Risk",
    });
  }
});

app.get("/api/insights", async (req, res) => {
  try {
    const riskResponse = await fetch(
      "http://localhost:5000/api/risk"
    );

    const risk = await riskResponse.json();

    const insights = [];

    if (risk.weatherRisk > 60) {
      insights.push(
        "Heavy rainfall may impact transportation routes."
      );
    }

    if (risk.shippingRisk > 75) {
      insights.push(
        "Shipping congestion risk remains elevated."
      );
    }

    if (risk.commodityRisk > 70) {
      insights.push(
        "Commodity prices are showing strong upward pressure."
      );
    }

    insights.push(
      `Global Risk Score currently stands at ${risk.globalRisk}.`
    );

    res.json(insights);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed To Generate Insights",
    });
  }
});

app.get("/api/alerts", (req, res) => {
  res.json([
    {
      id: 1,
      alert: "Port Congestion Alert",
      severity: "High",
    },
    {
      id: 2,
      alert: "Commodity Price Volatility",
      severity: "Medium",
    },
    {
      id: 3,
      alert: "Severe Weather Warning",
      severity: "High",
    },
  ]);
});





app.get("/api/predict-risk/:shipmentId", async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      shipmentId: req.params.shipmentId,
    });

    if (!shipment) {
      return res.status(404).json({
        message: "Shipment Not Found",
      });
    }

    const response = await axios.post(
      process.env.ML_API,
      {
        "Stock levels": shipment.stockLevels,
        "Lead times": shipment.leadTimes,
        "Shipping times": shipment.shippingTimes,
        "Shipping costs": shipment.shippingCosts,
        "Manufacturing costs": shipment.manufacturingCosts,
      }
    );

    shipment.predictedRisk = response.data.predictedRisk;

    if (shipment.predictedRisk >= 350) {
      shipment.risk = "High";
    } else if (shipment.predictedRisk >= 250) {
      shipment.risk = "Medium";
    } else {
      shipment.risk = "Low";
    }

    await shipment.save();

    const history = new PredictionHistory({
  shipmentId: shipment.shipmentId,
  predictedRisk: shipment.predictedRisk,
  risk: shipment.risk,
});

await history.save();
    res.json(shipment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Prediction Failed",
    });
  }
});

app.get("/api/shipments", async (req, res) => {
  try {
    const shipments = await Shipment.find();

    res.json(shipments);
  } catch (error) {
    console.error("Shipment Error:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

app.post("/api/shipments", async (req, res) => {
  try {
    const shipment = new Shipment(req.body);

    await shipment.save();

    res.status(201).json(shipment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed To Save Shipment",
    });
  }
});
app.get("/api/predictions", async (req, res) => {
  try {
    const history = await PredictionHistory.find().sort({
      createdAt: 1,
    });

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed To Fetch Prediction History",
    });
  }
});
app.get("/api/analytics", async (req, res) => {
  try {
    const shipments = await Shipment.find();

    const total = shipments.length;

    const high = shipments.filter((s) => s.risk === "High").length;

    const medium = shipments.filter((s) => s.risk === "Medium").length;

    const low = shipments.filter((s) => s.risk === "Low").length;

    const averageRisk =
      shipments.reduce(
        (sum, s) => sum + (s.predictedRisk || 0),
        0
      ) / (total || 1);

    res.json({
      totalShipments: total,
      highRisk: high,
      mediumRisk: medium,
      lowRisk: low,
      averageRisk: averageRisk.toFixed(2),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Analytics Error",
    });
  }
});
app.get("/api/model-performance", (req, res) => {
  res.json({
    accuracy: 96.8,
    mae: 2.1,
    rmse: 3.8,
    r2: 0.94,
  });
});
app.get("/api/feature-importance", (req, res) => {
  res.json([
    {
      feature: "Shipping Cost",
      importance: 35,
    },
    {
      feature: "Lead Time",
      importance: 28,
    },
    {
      feature: "Manufacturing Cost",
      importance: 20,
    },
    {
      feature: "Stock Level",
      importance: 12,
    },
    {
      feature: "Shipping Time",
      importance: 5,
    },
  ]);
});
app.get("/api/explanation/:shipmentId", async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      shipmentId: req.params.shipmentId,
    });

    if (!shipment) {
      return res.status(404).json({
        message: "Shipment Not Found",
      });
    }

    const reasons = [];
    const recommendations = [];

    if (shipment.leadTimes > 12) {
      reasons.push("Lead time is higher than normal.");
      recommendations.push("Use a faster supplier.");
    }

    if (shipment.shippingCosts > 230) {
      reasons.push("Shipping cost has increased.");
      recommendations.push("Switch to an alternate shipping route.");
    }

    if (shipment.manufacturingCosts > 320) {
      reasons.push("Manufacturing cost is above threshold.");
      recommendations.push("Optimize production planning.");
    }

    if (shipment.stockLevels < 55) {
      reasons.push("Stock level is getting low.");
      recommendations.push("Increase inventory levels.");
    }

    res.json({
      shipmentId: shipment.shipmentId,
      predictedRisk: shipment.predictedRisk,
      risk: shipment.risk,
      reasons,
      recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed To Generate Explanation",
    });
  }
});
const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server Running On Port ${PORT}`);
});
