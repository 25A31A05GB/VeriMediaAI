import express from "express";
import { analyze } from "../controllers/analyzeController";
import { verifyToken } from "../controllers/authController";

const router = express.Router();

router.post("/analyze", verifyToken, analyze);

export default router;
