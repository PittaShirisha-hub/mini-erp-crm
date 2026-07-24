import { Router } from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
} from "../controllers/purchase.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Create Purchase
router.post("/", protect, createPurchase);

// Get All Purchases
router.get("/", protect, getAllPurchases);

// Get Purchase By ID
router.get("/:id", protect, getPurchaseById);

export default router;