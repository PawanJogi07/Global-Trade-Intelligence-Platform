import axios from "axios";

export const getFeatureImportance = async () => {
  const response = await axios.get(
    "https://global-trade-intelligence-platform-1.onrender.com/api/feature-importance"
  );

  return response.data;
};