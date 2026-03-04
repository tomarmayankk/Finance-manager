import express from "express";
import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
} from "../controllers/expense.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create expense
router.post("/", protectRoute, addExpense);

// Get all user expenses
router.get("/", protectRoute, getExpenses);

// Update expense
router.put("/:id", protectRoute, updateExpense);

// Delete expense
router.delete("/:id", protectRoute, deleteExpense);

export default router;