import { Response, Request } from "express";
import * as purchaseService from "../services/purchase.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createPurchase = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { supplierId, items } = req.body;

    const purchase = await purchaseService.createPurchase(
      supplierId,
      req.user.id,
      items
    );

    res.status(201).json({
      success: true,
      message: "Purchase Created Successfully",
      purchase,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPurchases = async (
  req: Request,
  res: Response
) => {
  try {
    const purchases = await purchaseService.getAllPurchases();

    res.status(200).json({
      success: true,
      purchases,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPurchaseById = async (
  req: Request,
  res: Response
) => {
  try {
    const purchase = await purchaseService.getPurchaseById(
      String(req.params.id)
    );

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      purchase,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};