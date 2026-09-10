import { auth } from "@/lib/auth";
import Pricing from "./Pricing";
import { headers } from "next/headers";

const PricingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="px-4 mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-1">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted">
            Choose the plan that fits your job search needs
          </p>
        </div>
        <Pricing user={session?.user} />
        <div className="text-center mt-12">
          <p className="text-muted">
            All plans include basic features. Cancel anytime. No credit card
            required for Starter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
