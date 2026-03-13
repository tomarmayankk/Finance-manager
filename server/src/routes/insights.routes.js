import express from "express";
import { getInsights, generateInsights } from "../controllers/insight.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/spending-insights", protectRoute, getInsights);
router.get("/ai-insights", protectRoute, generateInsights);

export default router;