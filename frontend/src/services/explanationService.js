import axios from "axios";

export const getExplanation = async (shipmentId) => {
  const response = await axios.get(
    `http://localhost:5000/api/explanation/${shipmentId}`
  );

  return response.data;
};