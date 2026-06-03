import express from "express";
import monitoringRoutes from "./monitoringRoutes.js";

const router = express.Router();

router.use("/api", monitoringRoutes);

export default router;
