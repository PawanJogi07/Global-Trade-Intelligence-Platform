import axios from "axios";

export const getAnalytics = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/analytics"
  );

  return response.data;
};