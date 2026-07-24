import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Create Product
router.post("/", protect, createProduct);

// Get All Products
router.get("/", protect, getAllProducts);

// Get Product By ID
router.get("/:id", protect, getProductById);

// Update Product
router.put("/:id", protect, updateProduct);

// Delete Product
router.delete("/:id", protect, deleteProduct);

export default router;