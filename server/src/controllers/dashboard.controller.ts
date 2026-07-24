import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
      dashboard: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};