import {
  create,
  confirm,
  publicIntent,
  urlConfig,
} from "../controllers/paymentIntent.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.post("/", create);
router.post("/confirm", confirm);
router.get("/:secret", publicIntent);
router.post("/url-config", protect, urlConfig);

export default router;
