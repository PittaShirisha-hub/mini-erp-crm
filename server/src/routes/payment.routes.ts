import { Router } from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
} from "../controllers/payment.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createPayment);
router.get("/", protect, getAllPayments);
router.get("/:id", protect, getPaymentById);

export default router;