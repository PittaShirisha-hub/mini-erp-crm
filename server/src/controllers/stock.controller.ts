import { Request, Response } from "express";
import * as stockService from "../services/stock.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const stockIn = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity, reason } = req.body;

    const product = await stockService.addStock(
      productId,
      Number(quantity),
      reason,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Stock Added Successfully",
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const stockOut = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity, reason } = req.body;

    const product = await stockService.removeStock(
      productId,
      Number(quantity),
      reason,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Stock Removed Successfully",
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentStock = async (
  req: Request,
  res: Response
) => {
  try {
    const stock = await stockService.getCurrentStock();

    res.status(200).json({
      success: true,
      stock,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStockHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const history = await stockService.getStockHistory();

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};