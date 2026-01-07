import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();
connectDB(); // ✅ DB connect once

const app = express();

/* ✅ BODY PARSER */
app.use(express.json());

/* ✅ CORS */
app.use(
  cors({
    origin:"https://job-tracker-frontend-5m6x.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ✅ URL CLEAN + LOG (VERY IMPORTANT) */
app.use((req, res, next) => {
  // decode %0A, %20 etc
  const decodedUrl = decodeURIComponent(req.url);
  req.url = decodedUrl.replace(/\s+/g, "");
  console.log("Incoming request:", req.method, req.url);
  next();
});

/* ✅ TEST ROUTES */
app.get("/", (req, res) => {
  res.send("Job Tracker Backend is Running 🚀");
});

app.post("/api/test", (req, res) => {
  res.json({ message: "TEST OK" });
});

/* ✅ MAIN ROUTES */
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);


/* ✅ SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
