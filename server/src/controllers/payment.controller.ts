import { Request, Response } from "express";
import * as paymentService from "../services/payment.service";

export const createPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId, amount, method } = req.body;

    const createdById = (req as any).user.id;

    const payment = await paymentService.createPayment(
      invoiceId,
      amount,
      method,
      createdById
    );

    res.status(201).json({
      success: true,
      message: "Payment Recorded Successfully",
      payment,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payments = await paymentService.getAllPayments();

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPaymentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const payment = await paymentService.getPaymentById(id);

    if (!payment) {
      res.status(404).json({
        success: false,
        message: "Payment not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};