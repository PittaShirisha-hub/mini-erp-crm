import { Router } from "express";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createSupplier);

router.get("/", protect, getAllSuppliers);

router.get("/:id", protect, getSupplierById);

router.put("/:id", protect, updateSupplier);

router.delete("/:id", protect, deleteSupplier);

export default router;