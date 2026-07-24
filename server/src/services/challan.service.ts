import { PrismaClient, ChallanStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const createChallan = async (
  customerId: string,
  createdById: string,
  items: {
    productId: string;
    quantity: number;
  }[]
) => {
  return await prisma.$transaction(async (tx) => {
    let totalQuantity = 0;

    const challanItems: any[] = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.currentStock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          currentStock: {
            decrement: item.quantity,
          },
        },
      });

      totalQuantity += item.quantity;

      challanItems.push({
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        unitPrice: product.unitPrice,
        quantity: item.quantity,
      });
    }

    const challan = await tx.salesChallan.create({
      data: {
        challanNumber: `CH-${Date.now()}`,
        customerId,
        createdById,
        totalQuantity,
        status: ChallanStatus.DRAFT,
        items: {
          create: challanItems,
        },
      },
      include: {
        customer: true,
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

    return challan;
  });
};

export const getAllChallans = async () => {
  return await prisma.salesChallan.findMany({
    include: {
      customer: true,
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

export const getChallanById = async (id: string) => {
  return await prisma.salesChallan.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
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