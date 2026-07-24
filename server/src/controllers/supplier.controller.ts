import { Request, Response } from "express";
import * as supplierService from "../services/supplier.service";

export const createSupplier = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const supplier = await supplierService.createSupplier(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier Created Successfully",
      supplier,
    });
  } catch (error: any) {
    console.error("========== CREATE SUPPLIER ERROR ==========");
    console.error(error);
    console.error("===========================================");

    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const getAllSuppliers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const suppliers = await supplierService.getAllSuppliers();

    res.status(200).json({
      success: true,
      suppliers,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupplierById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const supplier = await supplierService.getSupplierById(
      req.params.id as string
    );

    if (!supplier) {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      supplier,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSupplier = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const supplier = await supplierService.updateSupplier(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Supplier Updated Successfully",
      supplier,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSupplier = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await supplierService.deleteSupplier(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Supplier Deleted Successfully",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};