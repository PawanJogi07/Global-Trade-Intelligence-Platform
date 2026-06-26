import axios from "axios";

export const getPredictionHistory = async () => {
  const response = await axios.get(
    "https://global-trade-intelligence-platform-1.onrender.com/api/predictions"
  );

  return response.data;
};