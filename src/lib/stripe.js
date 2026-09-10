import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PRICE_ID = {
  seeker_pro_monthly: "price_1TllGPL3OFZtRvj1b1sxUW1O",
  seeker_premium_monthly: "price_1TlmL6L3OFZtRvj1OuCRSYfe",
  seeker_pro_yearly: "price_1U7tzeL3OFZtRvj1Kc5iOOFy",
  seeker_premium_yearly: "price_1U7u3TL3OFZtRvj1S2XEmB68",
  recruiter_pro_monthly: "price_1U8FtdL3OFZtRvj1xJkXunKV",
  recruiter_premium_monthly: "price_1U8FtxL3OFZtRvj1IdXqK65n",
  recruiter_pro_yearly: "price_1U8FvPL3OFZtRvj1opKwwQBW",
  recruiter_premium_yearly: "price_1U8FvfL3OFZtRvj146XbGoVE",
};
