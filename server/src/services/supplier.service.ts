import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createSupplier = async (
  data: Prisma.SupplierCreateInput
) => {
  return await prisma.supplier.create({
    data,
  });
};

export const getAllSuppliers = async () => {
  return await prisma.supplier.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSupplierById = async (id: string) => {
  return await prisma.supplier.findUnique({
    where: {
      id,
    },
  });
};

export const updateSupplier = async (
  id: string,
  data: Prisma.SupplierUpdateInput
) => {
  return await prisma.supplier.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteSupplier = async (id: string) => {
  return await prisma.supplier.delete({
    where: {
      id,
    },
  });
};