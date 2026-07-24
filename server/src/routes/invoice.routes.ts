import { Router } from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
} from "../controllers/invoice.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Create Invoice
router.post("/", protect, createInvoice);

// Get All Invoices
router.get("/", protect, getAllInvoices);

// Get Invoice By ID
router.get("/:id", protect, getInvoiceById);

export default router;