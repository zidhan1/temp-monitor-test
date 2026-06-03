import "dotenv/config";
import express from "express";
import routes from "../src/routes/index.js";

const app = express();

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: process.env.DATABASE_URL ? "configured" : "missing",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Temperature Monitoring API",
    endpoints: {
      health: "/health",
      monitoring: {
        method: "POST",
        path: "/api/monitoring",
        body: {
          DateTime: "ISO timestamp",
          Temp1: "number",
          Status1: "string",
          Temp2: "number",
          Status2: "string",
          Button: "string",
          Mode: "string",
          Location: "string"
        }
      }
    }
  });
});

app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Vercel serverless function - export the app instead of listening
export default app;
