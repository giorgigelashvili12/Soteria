import {
  create,
  confirm,
  publicIntent,
} from "../controllers/paymentIntent.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", create);
router.post("/confirm", confirm);
router.get("/:secret", publicIntent);

export default router;
