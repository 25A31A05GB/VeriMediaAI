import express from "express";
import { createCheckoutSession } from "../controllers/paymentController";
import { verifyToken } from "../controllers/authController";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSession);

export default router;
