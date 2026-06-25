import axios from "axios";

export const getModelPerformance = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/model-performance"
  );

  return response.data;
};