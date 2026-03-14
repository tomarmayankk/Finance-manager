import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import predictionRoutes from "./routes/prediction.routes.js";
import insightRoutes from "./routes/insights.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

/* ========= MIDDLEWARE ========= */
app.use(cors({
  origin: ["http://localhost:5173", "https://finance-manager-nine-xi.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

/* ========= ROUTES ========= */
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/insights", insightRoutes);

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});