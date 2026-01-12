import {
  invite,
  userData,
  updateRole,
  remove,
} from "../controllers/membership.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.post("/invite", protect, invite);
router.get("/:id/members", protect, userData);
router.post("/update/:membershipId", updateRole);
router.post("/remove/:membershipId", remove);

export default router;
