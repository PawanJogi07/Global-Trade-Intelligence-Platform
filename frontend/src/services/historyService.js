import axios from "axios";

export const getPredictionHistory = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/predictions"
  );

  return response.data;
};