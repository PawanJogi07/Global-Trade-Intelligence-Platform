import axios from "axios";

export const getExplanation = async (shipmentId) => {
  const response = await axios.get(
    `https://global-trade-intelligence-platform-1.onrender.com/api/explanation/${shipmentId}`
  );

  return response.data;
};