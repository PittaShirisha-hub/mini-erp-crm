import { PrismaClient, InvoiceStatus, PaymentMethod } from "@prisma/client";

const prisma = new PrismaClient();

export const createPayment = async (
  invoiceId: string,
  amount: number,
  method: PaymentMethod,
  createdById: string
) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
  });

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  if (invoice.status === InvoiceStatus.PAID) {
    throw new Error("Invoice already paid");
  }

  const paymentNumber = `PAY-${Date.now()}`;

  const payment = await prisma.payment.create({
    data: {
      paymentNumber,
      amount,
      method,
      invoiceId,
      createdById,
    },
    include: {
      invoice: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  await prisma.invoice.update({
    where: {
      id: invoiceId,
    },
    data: {
      status: InvoiceStatus.PAID,
    },
  });

  return payment;
};

export const getAllPayments = async () => {
  return prisma.payment.findMany({
    include: {
      invoice: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      paymentDate: "desc",
    },
  });
};

export const getPaymentById = async (id: string) => {
  return prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      invoice: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};