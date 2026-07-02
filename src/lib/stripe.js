import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PRICE_ID = {
  seeker_pro: "price_1TllGPL3OFZtRvj1b1sxUW1O",
  seeker_premium: "price_1TlmL6L3OFZtRvj1OuCRSYfe",
};
