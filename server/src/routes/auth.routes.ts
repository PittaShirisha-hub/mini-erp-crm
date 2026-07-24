import { Router } from "express";
import {
  register,
  login,
  profile,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Get Logged-in User Profile
router.get("/profile", protect, profile);

export default router;