import prisma from "../config/prisma";

export const createCustomer = async (data: any) => {
  return await prisma.customer.create({
    data,
  });
};

export const getAllCustomers = async () => {
  return await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCustomerById = async (id: string) => {
  return await prisma.customer.findUnique({
    where: { id },
  });
};

export const updateCustomer = async (
  id: string,
  data: any
) => {
  return await prisma.customer.update({
    where: { id },
    data,
  });
};

export const deleteCustomer = async (id: string) => {
  return await prisma.customer.delete({
    where: { id },
  });
};