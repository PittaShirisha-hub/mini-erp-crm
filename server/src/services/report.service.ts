import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Dashboard Summary
export const getDashboardReport = async () => {
  const totalCustomers = await prisma.customer.count();

  const totalProducts = await prisma.product.count();

  const totalSuppliers = await prisma.supplier.count();

  const totalInvoices = await prisma.invoice.count();

  const totalPayments = await prisma.payment.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
  });

  return {
    totalCustomers,
    totalProducts,
    totalSuppliers,
    totalInvoices,
    totalPayments,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
};

// Sales Report
export const getSalesReport = async () => {
  return prisma.invoice.findMany({
    include: {
      customer: true,
      items: true,
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Purchase Report
export const getPurchaseReport = async () => {
  return prisma.purchase.findMany({
    include: {
      supplier: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Inventory Report
export const getInventoryReport = async () => {
  return prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

// Customer Report
export const getCustomerReport = async () => {
  return prisma.customer.findMany({
    include: {
      invoices: true,
      challans: true,
    },
  });
};

// Supplier Report
export const getSupplierReport = async () => {
  return prisma.supplier.findMany({
    include: {
      purchases: true,
    },
  });
};