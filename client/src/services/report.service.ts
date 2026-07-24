import api from "../api/axios";

export const getDashboardReport = async () => {
  const res = await api.get("/reports/dashboard");
  return res.data;
};