import {
  signup,
  login,
  logout,
  verifyEmail,
  profile,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.get("/profile", protect, profile);

export default router;
