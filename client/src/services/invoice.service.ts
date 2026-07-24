import api from "../api/axios";

export const getInvoices = async () => {
  const res = await api.get("/invoices");
  return res.data;
};