import axios from "axios";

const API_URL = "https://global-trade-intelligence-platform-1.onrender.com/api/alerts";

export const getAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};