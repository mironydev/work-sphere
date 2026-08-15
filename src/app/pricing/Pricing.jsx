"use client";

import { useSessionClient } from "@/lib/helpers";
import {
  Person,
  ChartLineArrowUp,
  Star,
  ArrowRight,
  Check,
  CircleCheckFill,
} from "@gravity-ui/icons";
import { Spinner } from "@heroui/react";

const Pricing = () => {
  const { user, isPending } = useSessionClient();

  const seekerPlans = [
    {
      planName: "seeker_starter",
      name: "Starter",
      price: 0,
      icon: Person,
      description: "Get started with the essentials:",
      features: [
        "Browse job listings",
        "Save up to 10 jobs",
        "Apply up to 5 jobs per month",
        "Basic salary insights",
      ],
      popular: false,
    },
    {
      planName: "seeker_pro",
      name: "Pro",
      price: 20,
      icon: ChartLineArrowUp,
      description: "Unlock faster, smarter job searching:",
      features: [
        "Unlimited job applications",
        "Unlimited saved jobs",
        "AI job recommendations",
        "Company insight dashboards",
      ],
      popular: true,
    },
    {
      planName: "seeker_premium",
      name: "Premium",
      price: 99,
      icon: Star,
      description: "Stand out with professional career tools:",
      features: [
        "Everything in Pro",
        "Premium resume builder",
        "Multi profile career portfolios",
        "Recruiter view access",
      ],
      popular: false,
    },
  ];

  return (
    <div className="px-4 mt-32 sm:mt-38">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted">
            Choose the plan that fits your job search needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {seekerPlans.map((plan) => {
            const IconComponent = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl px-5 py-8 flex flex-col justify-between transition-transform hover:scale-105 ${
                  plan.popular
                    ? "inset-shadow-[0_0_40px_rgba(99,102,241,0.5)] bg-indigo-600 text-white dark:bg-indigo-600/30 md:scale-105"
                    : "border dark:inset-shadow-[0_1px_40px_rgba(255,255,255,.1)] bg-white dark:bg-foreground/10"
                }`}
              >
                {plan.popular && (
                  <div className="bg-linear-to-b from-white to-stone-300 dark:from-indigo-500 dark:to-indigo-700 border-t dark:border-0 text-indigo-600 dark:text-white py-1.5 px-4 font-medium rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap gap-3 justify-between mb-6">
                    <div className="flex items-end gap-3">
                      <div className="bg-foreground/7 p-2 rounded-md">
                        <IconComponent />
                      </div>
                      <p className="text-2xl font-semibold">{plan.name}</p>
                    </div>
                    <div className="flex items-end gap-1">
                      <p className="text-4xl font-semibold">${plan.price}</p>
                      <p className="opacity-70 flex">
                        /m<span className="md:hidden lg:block">onth</span>
                      </p>
                    </div>
                  </div>

                  <p className="mb-4 font-medium">{plan.description}</p>

                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <span
                          className={
                            plan.popular ? "text-white" : "text-indigo-500"
                          }
                        >
                          <Check className="w-5 h-5" />
                        </span>
                        <p className="text-sm opacity-80">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <form action="/api/checkout_sessions" method="POST">
                  <input type="hidden" name="planName" value={plan.planName} />
                  <section>
                    <button
                      disabled={user?.plan === plan?.planName}
                      type="submit"
                      role="link"
                      className={`select-none flex justify-between py-4 px-6 w-full rounded-lg mt-8 font-semibold active:scale-95 duration-100 ${
                        user?.plan === plan?.planName
                          ? plan.popular
                            ? "active:scale-100 bg-indigo-300 dark:bg-indigo-900 text-foreground/50" // Pro current plan
                            : "active:scale-100 bg-foreground/10 dark:bg-background/30 text-foreground/50" // Others current plan
                          : plan.popular
                            ? "bg-white hover:bg-stone-100 dark:bg-indigo-600 hover:dark:bg-[#563fff] text-indigo-600 dark:text-white cursor-pointer" // Pro non-current
                            : "bg-black/85 dark:bg-foreground/20 hover:dark:bg-foreground/25 text-white cursor-pointer hover:bg-foreground/90" // Others non-current
                      }`}
                    >
                      <div className="w-full text-left">
                        {isPending ? (
                          <div className="flex justify-center items-center w-full">
                            <Spinner color="current" />
                          </div>
                        ) : user?.plan === plan?.planName ? (
                          "Current Plan"
                        ) : (
                          "Choose This Plan"
                        )}
                      </div>
                      <div className="flex justify-center items-center">
                        {isPending ? (
                          ""
                        ) : user?.plan === plan?.planName ? (
                          <CircleCheckFill className="w-5 h-5" />
                        ) : (
                          <ArrowRight className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  </section>
                </form>
              </div>
            );
          })}
        </div>

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

export default Pricing;
