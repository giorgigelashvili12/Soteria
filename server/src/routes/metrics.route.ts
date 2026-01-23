import { grossVolume } from "../controllers/metrics.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.get("/gross-volume", protect, grossVolume);

export default router;
