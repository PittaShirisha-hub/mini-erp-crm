import api from "../../api/axios";

export const getPurchases = async () => {
  const res = await api.get("/purchases");
  return res.data;
};

export const createPurchase = async (data: any) => {
  const res = await api.post("/purchases", data);
  return res.data;
};

export const updatePurchase = async (id: string, data: any) => {
  const res = await api.put(`/purchases/${id}`, data);
  return res.data;
};

export const deletePurchase = async (id: string) => {
  const res = await api.delete(`/purchases/${id}`);
  return res.data;
};