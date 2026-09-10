import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PRICE_ID, stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: headersList,
    });

    if (!userSession?.user) {
      return NextResponse.json(
        { error: "You must be logged in to subscribe." },
        { status: 401 },
      );
    }

    const formData = await req.formData();
    const planName = formData.get("planName");
    const billingCycle = formData.get("billingCycle");
    const priceId = PRICE_ID[`${planName}_${billingCycle}`];
    const accountType = userSession.user.accountType;
    const userId = userSession.user.id;

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: userSession.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: { planName, billingCycle, accountType, userId },
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
