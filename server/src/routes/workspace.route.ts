import {
  create,
  get,
  getAll,
  workspaceId,
} from "../controllers/workspace.controller.js";
import { Router } from "express";
import { protect } from "../middleware/protect.middleware.js";

const router = Router();

router.post("/create", protect, create);
router.get("/get", protect, get);
router.get("/mine", protect, getAll);
router.get("/:id", protect, workspaceId);

export default router;
