import { Router } from "express";
import {
  getDashboardReport,
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getCustomerReport,
  getSupplierReport,
} from "../controllers/report.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/dashboard", protect, getDashboardReport);

router.get("/sales", protect, getSalesReport);

router.get("/purchases", protect, getPurchaseReport);

router.get("/inventory", protect, getInventoryReport);

router.get("/customers", protect, getCustomerReport);

router.get("/suppliers", protect, getSupplierReport);

export default router;