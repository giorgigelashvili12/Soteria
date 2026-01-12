import { invitation, accept } from "../controllers/invitation.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.get("/invitations/:workspaceId", protect, invitation);
router.post("/accept/:token", protect, accept);

export default router;
