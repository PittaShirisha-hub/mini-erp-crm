import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async () => {
  const totalCustomers = await prisma.customer.count();

  const totalProducts = await prisma.product.count();

  const totalChallans = await prisma.salesChallan.count();

  const totalStock = await prisma.product.aggregate({
    _sum: {
      currentStock: true,
    },
  });

  return {
    totalCustomers,
    totalProducts,
    totalChallans,
    totalStock: totalStock._sum.currentStock || 0,
  };
};