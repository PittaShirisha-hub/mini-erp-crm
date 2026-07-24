import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";

// Register User
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const data = await registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Profile
export const profile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Remove password before sending response
    const { password, ...userWithoutPassword } = req.user;

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};