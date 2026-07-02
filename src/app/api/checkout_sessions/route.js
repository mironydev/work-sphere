import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PRICE_ID, stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();
    const planName = formData.get("planName");
    const priceId = PRICE_ID[planName];

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const userMail = userSession?.user?.email;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: userMail,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: { planName },
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
