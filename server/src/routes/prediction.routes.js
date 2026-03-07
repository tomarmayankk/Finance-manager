import express from "express";
import { predictNextMonth } from "../controllers/prediction.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/budget-prediction", protectRoute, predictNextMonth);

export default router;