import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Circles4Square, Briefcase, File } from "@gravity-ui/icons";
import { createSubscription } from "@/lib/actions/createsubscription";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const { status, customer_details, line_items, invoice, metadata } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "invoice"],
    });

  if (status === "open") {
    return redirect("/");
  }

  const customerEmail = customer_details?.email;
  const planName = metadata?.planName || "";
  const billingCycle = metadata?.billingCycle || "";

  const displayPlanName = planName
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const billingInterval = billingCycle === "monthly" ? "Monthly" : "Yearly";

  const hostedInvoiceUrl = invoice?.hosted_invoice_url;
  const accountType = metadata?.accountType;

  if (status === "complete") {
    const subscribedUserInfo = {
      userId: metadata?.userId,
      email: customerEmail,
      planName: metadata?.planName,
      billingCycle: metadata?.billingCycle,
    };

    await createSubscription(subscribedUserInfo);

    return (
      <div className="flex items-center justify-center px-4 h-screen">
        <div className="max-w-2xl w-full text-center">
          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-emerald-600">
            Payment Successful!
          </h1>

          <p className="text-lg text-muted mb-2">
            Your subscription is now active.
          </p>

          <p className="text-sm text-muted mb-10">
            A confirmation email will be sent to{" "}
            <strong>{customerEmail}</strong>
          </p>

          {/* Plan Info */}
          <div className="mb-7 p-6 rounded-lg bg-white dark:bg-foreground/5 border border-transparent dark:border-foreground/10">
            <p className="text-sm text-muted">Plan</p>
            <p className="text-2xl font-semibold mt-1">{displayPlanName}</p>
            <span className="text-sm text-muted">({billingInterval})</span>
          </div>

          {/* Actions */}
          {accountType === "seeker" ? (
            <div className="flex flex-col gap-4 mb-7">
              {/* View Invoice */}
              {hostedInvoiceUrl && (
                <Link
                  href={hostedInvoiceUrl}
                  target="_blank"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex justify-center items-center gap-2 py-3 active:scale-95 duration-100"
                >
                  <File className="w-5 h-5" />
                  View Invoice
                </Link>
              )}

              {/* Seeker Navigation */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard/seeker"
                  className="flex-1 flex items-center justify-center gap-2 bg-background shadow dark:bg-foreground/10 hover:bg-foreground/5 dark:hover:bg-foreground/15 text-foreground font-semibold py-3 rounded-lg active:scale-95 duration-100"
                >
                  <Circles4Square className="w-5 h-5" />
                  Go to Dashboard
                </Link>

                <Link
                  href="/jobs?page=1"
                  className="flex-1 flex items-center justify-center gap-2 bg-background shadow dark:bg-foreground/10 hover:bg-foreground/5 dark:hover:bg-foreground/15 text-foreground font-semibold py-3 rounded-lg active:scale-95 duration-100"
                >
                  <Briefcase className="w-5 h-5" />
                  Apply to Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 mb-7">
              {/* Recruiter View Invoice */}
              {hostedInvoiceUrl && (
                <Link
                  href={hostedInvoiceUrl}
                  target="_blank"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex justify-center items-center gap-2 py-3 active:scale-95 duration-100"
                >
                  <File className="w-5 h-5" />
                  View Invoice
                </Link>
              )}

              {/* Recruiter Dashboard */}
              <Link
                href="/dashboard/recruiter"
                className="flex-1 flex items-center justify-center gap-2 bg-white border dark:bg-foreground/10 hover:bg-white dark:hover:bg-foreground/15 text-foreground font-semibold py-3 rounded-lg active:scale-95 duration-100"
              >
                <Circles4Square className="w-5 h-5" />
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
