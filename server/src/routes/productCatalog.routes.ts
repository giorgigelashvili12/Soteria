import {
  get,
  getAll,
  create,
  edit,
  deleteProduct,
  sync,
  createCheckout,
} from "../controllers/productCatalog.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.get("/all", protect, getAll);
router.get("/:id", protect, get);
router.post("/", protect, create);
router.patch("/", protect, edit);
router.delete("/", protect, deleteProduct);
router.post("/sync", sync);
router.post("/create-checkout", createCheckout);

export default router;
