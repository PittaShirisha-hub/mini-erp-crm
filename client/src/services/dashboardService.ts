import api from "../api/axios";

export const getDashboard = async () => {
  const response = await api.get("/reports/dashboard");
  return response.data;
};