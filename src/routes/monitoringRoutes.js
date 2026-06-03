import express from "express";
import aiciController from "../controllers/aiciMonitoringController.js";

const router = express.Router();

router.post("/monitoring", aiciController.saveMonitoring);

export default router;
