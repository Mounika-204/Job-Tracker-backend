import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
connectDB(); // ✅ ONLY ONE DB CONNECTION

const app = express();

/* ✅ MIDDLEWARES */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ✅ LOGGING */
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

/* ✅ TEST ROUTE */
app.get("/test", (req, res) => {
  res.send("Server OK");
});

/* ✅ ROUTES */
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

/* ✅ SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
