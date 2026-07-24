import api from "../../api/axios";

export const getSuppliers = async () => {
  const res = await api.get("/suppliers");
  return res.data;
};

export const createSupplier = async (data: any) => {
  const res = await api.post("/suppliers", data);
  return res.data;
};

export const updateSupplier = async (id: string, data: any) => {
  const res = await api.put(`/suppliers/${id}`, data);
  return res.data;
};

export const deleteSupplier = async (id: string) => {
  const res = await api.delete(`/suppliers/${id}`);
  return res.data;
};