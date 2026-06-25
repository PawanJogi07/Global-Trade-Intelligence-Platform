import axios from "axios";

export const getPrediction = async (shipmentId) => {
  const response = await axios.get(
    `http://localhost:5000/api/predict-risk/${shipmentId}`
  );

  return response.data;
};