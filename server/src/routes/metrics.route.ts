import { grossVolume } from "../controllers/metrics.controller.js";
import { Router } from "express";

const router = Router();

router.get("/gross-volume", grossVolume);

export default router;
