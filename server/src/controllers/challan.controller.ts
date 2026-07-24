import { Request, Response } from "express";
import * as challanService from "../services/challan.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createChallan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { customerId, items } = req.body;

    const challan = await challanService.createChallan(
      customerId,
      req.user.id,
      items
    );

    res.status(201).json({
      success: true,
      message: "Sales Challan Created Successfully",
      challan,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllChallans = async (
  req: Request,
  res: Response
) => {
  try {
    const challans = await challanService.getAllChallans();

    res.status(200).json({
      success: true,
      challans,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChallanById = async (
  req: Request,
  res: Response
) => {
  try {
    const challan = await challanService.getChallanById(
      String(req.params.id)
    );

    if (!challan) {
      return res.status(404).json({
        success: false,
        message: "Challan not found",
      });
    }

    res.status(200).json({
      success: true,
      challan,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};