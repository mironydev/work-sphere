import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Check, Circles4Square, Briefcase, File } from "@gravity-ui/icons";
import { createSubscription } from "@/lib/actions/jobs";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const { status, customer_details, line_items, invoice, metadata } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "invoice"],
    });

  if (status === "open") {
    return redirect("/");
  }

  const customerEmail = customer_details?.email;
  const planName = line_items?.data[0]?.description || "Premium Plan";
  const hostedInvoiceUrl = invoice?.hosted_invoice_url;

  if (status === "complete") {
    // if payment complete, update user plan
    const subscribedUserInfo = {
      email: customerEmail,
      planName: metadata.planName,
    };
    const res = await createSubscription(subscribedUserInfo);

    return (
      <div className="flex items-center justify-center px-4 mt-32">
        <div className="max-w-2xl w-full text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-600/20 mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-green-600 dark:text-green-500">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted mb-2">
            Welcome to your new plan. Your subscription is now active.
          </p>
          <p className="text-sm text-muted mb-10">
            A confirmation email will be sent to{" "}
            <strong>{customerEmail}</strong>
          </p>

          {/* Plan Info */}
          <div className="mb-7 p-6 rounded-lg bg-background dark:bg-foreground/5 border border-white dark:border-foreground/10">
            <p className="text-sm text-muted mb-2">Plan</p>
            <p className="text-2xl font-semibold">{planName}</p>
          </div>

          {/* View Invoice */}
          {hostedInvoiceUrl && (
            <div className="mb-7">
              <Link
                href={hostedInvoiceUrl}
                target="_blank"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex justify-center items-center gap-2 py-4 active:scale-95 duration-100 cursor-pointer"
              >
                <File className="w-5 h-5" />
                View Invoice
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/seeker"
              className="flex items-center justify-center gap-2 bg-background shadow dark:bg-foreground/10 hover:bg-foreground/5 dark:hover:bg-foreground/15 text-foreground font-semibold px-8 py-3 rounded-lg active:scale-95 duration-100"
            >
              <Circles4Square className="w-5 h-5" />
              Go to Dashboard
            </Link>
            <Link
              href="/jobs"
              className="flex items-center justify-center gap-2 bg-background shadow dark:bg-foreground/10 hover:bg-foreground/5 dark:hover:bg-foreground/15 text-foreground font-semibold px-8 py-3 rounded-lg active:scale-95 duration-100"
            >
              <Briefcase className="w-5 h-5" />
              Browse Jobs
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-12 text-sm text-muted">
            <p>
              Questions?{" "}
              <a
                href="mailto:support@worksphere.com"
                className="text-indigo-600 hover:underline"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
