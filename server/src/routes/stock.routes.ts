import { Router } from "express";
import {
  stockIn,
  stockOut,
  getCurrentStock,
  getStockHistory,
} from "../controllers/stock.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, getCurrentStock);

router.post("/in", protect, stockIn);

router.post("/out", protect, stockOut);

router.get("/history", protect, getStockHistory);

export default router;