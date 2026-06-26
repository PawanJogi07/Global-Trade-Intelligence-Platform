import axios from "axios";

export const getAnalytics = async () => {
  const response = await axios.get(
    "https://global-trade-intelligence-platform-1.onrender.com/api/analytics"
  );

  return response.data;
};