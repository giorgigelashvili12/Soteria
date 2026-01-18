import {
  get,
  getAll,
  sdkAll,
  create,
  edit,
  deleteProduct,
  sync,
  createCheckout,
} from "../controllers/productCatalog.controller.js";
import { Router } from "express";
import { verifyPasskey } from "../middleware/passkey.middleware.js";
import { protect } from "../middleware/protect.middleware.js";
import { dash } from "../middleware/dashboard.middleware.js";

const router = Router();

router.get("/all", verifyPasskey, sdkAll);
router.get("/dashboard-list", protect, getAll);
router.get("/get", verifyPasskey, get);
router.post("/", create);
router.post("/edit", verifyPasskey, edit);
router.post("/delete", verifyPasskey, deleteProduct);
router.post("/sync", verifyPasskey, sync);
router.post("/create-checkout", createCheckout);

export default router;
