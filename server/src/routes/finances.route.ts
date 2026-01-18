import { stats } from "../controllers/finances.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.get("/stats", protect, stats);

export default router;
