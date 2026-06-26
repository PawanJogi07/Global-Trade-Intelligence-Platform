import axios from "axios";

export const getPrediction = async (shipmentId) => {
  const response = await axios.get(
    `https://global-trade-intelligence-platform-1.onrender.com/api/predict-risk/${shipmentId}`
  );

  return response.data;
};