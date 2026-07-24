import { Request, Response } from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";

// Add Customer
export const addCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await createCustomer(req.body);

    res.status(201).json({
      success: true,
      message: "Customer Added Successfully",
      customer,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Customers
export const getCustomers = async (
  req: Request,
  res: Response
) => {
  try {
    const customers = await getAllCustomers();

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Customer By ID
export const getCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await getCustomerById(req.params.id as string);

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Customer
export const editCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await updateCustomer(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Customer Updated Successfully",
      customer,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Customer
export const removeCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteCustomer(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Customer Deleted Successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};