import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key_2026", {
  apiVersion: "2025-01-27.acacia" as any,
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { plan, price } = req.body;
  const { user } = req as any;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `VeriMedia AI - ${plan}`,
              description: `Forensic protection for your digital assets.`,
            },
            unit_amount: parseInt(price.replace('$', '').replace(',', '')) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment/cancel`,
      customer_email: user?.email,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
};
