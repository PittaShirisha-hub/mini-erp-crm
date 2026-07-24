import { Router } from "express";
import {
  createChallan,
  getAllChallans,
  getChallanById,
} from "../controllers/challan.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Create Sales Challan
router.post("/", protect, createChallan);

// Get All Sales Challans
router.get("/", protect, getAllChallans);

// Get Sales Challan By ID
router.get("/:id", protect, getChallanById);

export default router;