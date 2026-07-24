import { Router } from "express";
import {
  addCustomer,
  getCustomers,
  getCustomer,
  editCustomer,
  removeCustomer,
} from "../controllers/customer.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, addCustomer);

router.get("/", protect, getCustomers);

router.get("/:id", protect, getCustomer);

router.put("/:id", protect, editCustomer);

router.delete("/:id", protect, removeCustomer);

export default router;