import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPurchase = async (
  supplierId: string,
  createdById: string,
  items: {
    productId: string;
    quantity: number;
  }[]
) => {
  return await prisma.$transaction(async (tx) => {
    let totalQuantity = 0;

    const purchaseItems: any[] = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          currentStock: {
            increment: item.quantity,
          },
        },
      });

      totalQuantity += item.quantity;

      purchaseItems.push({
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        unitPrice: product.unitPrice,
        quantity: item.quantity,
      });
    }

    const purchase = await tx.purchase.create({
      data: {
        purchaseNumber: `PO-${Date.now()}`,
        supplierId,
        createdById,
        totalQuantity,
        items: {
          create: purchaseItems,
        },
      },
      include: {
        supplier: true,
        items: true,
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

    return purchase;
  });
};

export const getAllPurchases = async () => {
  return await prisma.purchase.findMany({
    include: {
      supplier: true,
      items: true,
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
      createdAt: "desc",
    },
  });
};

export const getPurchaseById = async (id: string) => {
  return await prisma.purchase.findUnique({
    where: {
      id,
    },
    include: {
      supplier: true,
      items: true,
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