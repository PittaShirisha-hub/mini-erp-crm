import api from "../api/axios";

export const getPurchases = async () => {
  const res = await api.get("/purchases");
  return res.data;
};