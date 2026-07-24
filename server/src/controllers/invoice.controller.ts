import { Request, Response } from "express";
import * as invoiceService from "../services/invoice.service";

export const createInvoice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { customerId, items } = req.body;

    const createdById = (req as any).user.id;

    const invoice = await invoiceService.createInvoice(
      customerId,
      createdById,
      items
    );

    res.status(201).json({
      success: true,
      message: "Invoice Created Successfully",
      invoice,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllInvoices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const invoices = await invoiceService.getAllInvoices();

    res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInvoiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);

    if (!invoice) {
      res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};