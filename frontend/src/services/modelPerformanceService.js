import axios from "axios";

export const getModelPerformance = async () => {
  const response = await axios.get(
    "https://global-trade-intelligence-platform-1.onrender.com/api/model-performance"
  );

  return response.data;
};