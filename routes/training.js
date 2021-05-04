import express from "express";
import { saveTraining, getTraining, deleteTraining } from "../controllers/training.js";

const router = express.Router();

// Base route: /training

router.post("/save", saveTraining);
router.get("/", getTraining);
router.post("/delete", deleteTraining);

export default router;