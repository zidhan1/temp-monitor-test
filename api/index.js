import "dotenv/config";
import express from "express";
import routes from "../src/routes/index.js";

const app = express();

app.use(express.json());
app.use(routes);

// Vercel serverless function - export the app instead of listening
export default app;
