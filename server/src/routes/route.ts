import paymentRoutes from "./balance.route.js";
import auhtRoutes from "./auth.route.js";
import oauthRoutes from "./oauth.routes.js";
import metricsRoutes from "./metrics.route.js";
import workspaceRoutes from "./workspace.route.js";
import membershipRoutes from "./membership.route.js";
import invitationRoutes from "./invitation.route.js";
import intentRoutes from "./intent.route.js";
import productCatalogRoutes from "./productCatalog.routes.js";
import { Router } from "express";

const router = Router();

router.use("/payment", paymentRoutes);
router.use("/auth", auhtRoutes);
router.use("/oauth", oauthRoutes);
router.use("/metrics", metricsRoutes);
router.use("/workspace", workspaceRoutes);
router.use("/membership", membershipRoutes);
router.use("/invitation", invitationRoutes);
router.use("/payment-intent", intentRoutes);
router.use("/products", productCatalogRoutes);

export default router;
