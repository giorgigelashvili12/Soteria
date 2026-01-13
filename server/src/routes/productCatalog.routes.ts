import {
  get,
  getAll,
  create,
  edit,
  deleteProduct,
  sync,
  createCheckout,
} from "../controllers/productCatalog.controller.js";
import { Router } from "express";
import { verifyPasskey } from "../middleware/passkey.middleware.js";

const router = Router();

router.get("/all", getAll);
router.get("/get", verifyPasskey, get);
router.post("/", create);
router.post("/edit", verifyPasskey, edit);
router.post("/delete", verifyPasskey, deleteProduct);
router.post("/sync", verifyPasskey, sync);
router.post("/create-checkout", createCheckout);

export default router;
