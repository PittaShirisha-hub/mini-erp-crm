import { PrismaClient, MovementType } from "@prisma/client";

const prisma = new PrismaClient();

export const addStock = async (
  productId: string,
  quantity: number,
  reason: string,
  createdById: string
) => {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = await tx.product.update({
      where: { id: productId },
      data: {
        currentStock: {
          increment: quantity,
        },
      },
    });

    await tx.stockMovement.create({
      data: {
        productId,
        quantity,
        movementType: MovementType.IN,
        reason,
        createdById,
      },
    });

    return updatedProduct;
  });
};

export const removeStock = async (
  productId: string,
  quantity: number,
  reason: string,
  createdById: string
) => {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.currentStock < quantity) {
      throw new Error("Insufficient stock");
    }

    const updatedProduct = await tx.product.update({
      where: { id: productId },
      data: {
        currentStock: {
          decrement: quantity,
        },
      },
    });

    await tx.stockMovement.create({
      data: {
        productId,
        quantity,
        movementType: MovementType.OUT,
        reason,
        createdById,
      },
    });

    return updatedProduct;
  });
};

export const getCurrentStock = async () => {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      sku: true,
      category: true,
      currentStock: true,
      minimumStock: true,
      warehouse: true,
      unitPrice: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getStockHistory = async () => {
  return await prisma.stockMovement.findMany({
    include: {
      product: true,
      createdBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};