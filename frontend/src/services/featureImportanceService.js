import axios from "axios";

export const getFeatureImportance = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/feature-importance"
  );

  return response.data;
};