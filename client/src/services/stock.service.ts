import api from "../api/axios";

export const getStock = async () => {
  const res = await api.get("/stock");
  return res.data;
};