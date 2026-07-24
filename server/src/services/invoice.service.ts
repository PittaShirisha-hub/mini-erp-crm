import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInvoice = async (
  customerId: string,
  createdById: string,
  items: {
    productId: string;
    quantity: number;
  }[]
) => {
  const invoiceNumber = `INV-${Date.now()}`;

  let totalAmount = 0;

  const invoiceItems = [];

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: {
        id: item.productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.currentStock < item.quantity) {
      throw new Error(
        `Insufficient stock for product ${product.name}`
      );
    }

    const total = product.unitPrice * item.quantity;

    totalAmount += total;

    invoiceItems.push({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      unitPrice: product.unitPrice,
      quantity: item.quantity,
      total,
    });
  }

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      totalAmount,
      customerId,
      createdById,

      items: {
        create: invoiceItems,
      },
    },

    include: {
      customer: true,

      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },

      items: true,
    },
  });

  for (const item of items) {
    await prisma.product.update({
      where: {
        id: item.productId,
      },

      data: {
        currentStock: {
          decrement: item.quantity,
        },
      },
    });

    await prisma.stockMovement.create({
      data: {
        productId: item.productId,
        quantity: item.quantity,
        movementType: "OUT",
        reason: `Invoice ${invoice.invoiceNumber}`,
        createdById,
      },
    });
  }

  return invoice;
};

export const getAllInvoices = async () => {
  return prisma.invoice.findMany({
    include: {
      customer: true,
      items: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getInvoiceById = async (id: string) => {
  return prisma.invoice.findUnique({
    where: {
      id,
    },

    include: {
      customer: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      items: true,
    },
  });
};