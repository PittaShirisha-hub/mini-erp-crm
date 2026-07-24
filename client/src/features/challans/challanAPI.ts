import api from "../../api/axios";

export const getChallans = async () => {
  const res = await api.get("/challans");
  return res.data;
};

export const getChallan = async (id: string) => {
  const res = await api.get(`/challans/${id}`);
  return res.data;
};

export const createChallan = async (data: any) => {
  const res = await api.post("/challans", data);
  return res.data;
};