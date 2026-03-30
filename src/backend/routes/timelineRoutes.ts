import express from "express";
import { getTimeline } from "../services/timelineService";
import { verifyToken } from "../controllers/authController";

const router = express.Router();

router.get("/timeline", verifyToken, (req, res) => {
  res.json(getTimeline());
});

export default router;
