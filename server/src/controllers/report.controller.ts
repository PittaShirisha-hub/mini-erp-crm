import { Request, Response } from "express";
import * as reportService from "../services/report.service";

export const getDashboardReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await reportService.getDashboardReport();

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSalesReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await reportService.getSalesReport();

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPurchaseReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await reportService.getPurchaseReport();

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInventoryReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await reportService.getInventoryReport();

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomerReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await reportService.getCustomerReport();

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupplierReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await reportService.getSupplierReport();

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};