import api from "../api/axios";

export const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};