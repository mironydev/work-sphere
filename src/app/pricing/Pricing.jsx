"use client";

import {
  Person,
  ChartLineArrowUp,
  Star,
  ArrowRight,
  Check,
  CircleCheckFill,
  Briefcase,
} from "@gravity-ui/icons";
import { Button, Modal, Skeleton, Tabs } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Pricing = ({ user, showSkeleton }) => {
  const [isDowngradeModalOpen, setIsDowngradeModalOpen] = useState(false);
  const router = useRouter();

  const seekerMonthlyPlans = [
    {
      planName: "seeker_starter",
      billingCycle: "monthly",
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
      billingCycle: "monthly",
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
      billingCycle: "monthly",
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

  const seekerYearlyPlans = [
    {
      planName: "seeker_starter",
      billingCycle: "yearly",
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
      billingCycle: "yearly",
      name: "Pro",
      price: 190,
      originalPrice: 240,
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
      billingCycle: "yearly",
      name: "Premium",
      price: 950,
      originalPrice: 1200,
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

  const recruiterMonthlyPlans = [
    {
      planName: "recruiter_starter",
      billingCycle: "monthly",
      name: "Starter",
      price: 0,
      icon: Briefcase,
      description: "Get started with the essentials:",
      features: [
        "Post up to 3 jobs",
        "Basic applicant management",
        "View applicant profiles",
        "Basic hiring analytics",
      ],
      popular: false,
    },
    {
      planName: "recruiter_pro",
      billingCycle: "monthly",
      name: "Pro",
      price: 49,
      icon: ChartLineArrowUp,
      description: "Hire faster with powerful recruiting tools:",
      features: [
        "Post up to 15 jobs",
        "Unlimited applicant management",
        "Advanced candidate search",
        "AI candidate recommendations",
        "Advanced hiring analytics",
      ],
      popular: true,
    },
    {
      planName: "recruiter_premium",
      billingCycle: "monthly",
      name: "Premium",
      price: 149,
      icon: Star,
      description: "Build and manage your hiring pipeline at scale:",
      features: [
        "Unlimited job postings",
        "Unlimited candidate search",
        "AI candidate matching",
        "Featured job listings",
        "Advanced hiring analytics",
        "Priority support",
      ],
      popular: false,
    },
  ];

  const recruiterYearlyPlans = [
    {
      planName: "recruiter_starter",
      billingCycle: "yearly",
      name: "Starter",
      price: 0,
      icon: Briefcase,
      description: "Get started with the essentials:",
      features: [
        "Post up to 3 jobs",
        "Basic applicant management",
        "View applicant profiles",
        "Basic hiring analytics",
      ],
      popular: false,
    },
    {
      planName: "recruiter_pro",
      billingCycle: "yearly",
      name: "Pro",
      price: 450,
      originalPrice: 588,
      icon: ChartLineArrowUp,
      description: "Hire faster with powerful recruiting tools:",
      features: [
        "Post up to 15 jobs",
        "Unlimited applicant management",
        "Advanced candidate search",
        "AI candidate recommendations",
        "Advanced hiring analytics",
      ],
      popular: true,
    },
    {
      planName: "recruiter_premium",
      billingCycle: "yearly",
      name: "Premium",
      price: 1400,
      originalPrice: 1788,
      icon: Star,
      description: "Build and manage your hiring pipeline at scale:",
      features: [
        "Unlimited job postings",
        "Unlimited candidate search",
        "AI candidate matching",
        "Featured job listings",
        "Advanced hiring analytics",
        "Priority support",
      ],
      popular: false,
    },
  ];

  const monthlyPlans =
    user?.accountType === "recruiter"
      ? recruiterMonthlyPlans
      : seekerMonthlyPlans;

  const yearlyPlans =
    user?.accountType === "recruiter"
      ? recruiterYearlyPlans
      : seekerYearlyPlans;

  const listClassName = [
    "rounded-xl border bg-white dark:bg-foreground/5 p-1",
    "**:data-[slot=tabs-tab]:transition-colors",
    "**:data-[slot=tabs-tab]:data-[selected=true]:font-medium",
    "**:data-[slot=tabs-tab]:data-[selected=true]:text-background",
    "**:data-[slot=tabs-tab]:shadow-none",
    "**:data-[slot=tabs-indicator]:rounded-lg",
    "**:data-[slot=tabs-indicator]:bg-foreground",
    "**:data-[slot=tabs-indicator]:shadow-none",
  ].join(" ");

  const handleDowngrade = async () => {
    try {
      // We'll add the backend downgrade request here
      setIsDowngradeModalOpen(false);
      toast.success("Plan downgraded.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <Tabs className="w-full">
        <div className="w-full max-w-xs mx-auto mb-3 md:mb-8 mt-6">
          <Tabs.ListContainer className="rounded-none bg-transparent">
            <Tabs.List aria-label="Billing cycle" className={listClassName}>
              <Tabs.Tab
                id="monthly"
                style={{ outline: "none", boxShadow: "none" }}
                className="text-foreground/70 hover:text-foreground hover:opacity-100 duration-75 py-4.5 text-base"
              >
                Monthly
                <Tabs.Indicator />
              </Tabs.Tab>

              <Tabs.Tab
                id="yearly"
                style={{ outline: "none", boxShadow: "none" }}
                className="group flex items-center gap-2 text-foreground/70 hover:text-foreground hover:opacity-100 duration-75 py-4.5 text-base"
              >
                Yearly
                <span className="text-xs font-semibold bg-foreground/10 group-data-[selected=true]:bg-background/10 px-2 py-0.5 rounded-full">
                  20% off
                </span>
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </div>

        {showSkeleton ? (
          <div className="relative flex flex-wrap justify-center gap-6 lg:gap-8 pt-3 pb-2">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className={`skeleton--shimmer relative w-xs rounded-2xl px-5 py-6 overflow-hidden ${
                  card === 2
                    ? "bg-indigo-500 dark:bg-indigo-600/30 xl:scale-105"
                    : "border dark:border-0 bg-white dark:bg-foreground/10"
                }`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap gap-3 justify-between mb-6">
                      <div className="flex items-end gap-3 mt-px">
                        <Skeleton
                          animationType="none"
                          className="size-8 rounded-md"
                        />

                        <Skeleton
                          animationType="none"
                          className={`h-7 w-24 rounded-md ${
                            card === 1 ? "w-20" : card === 2 ? "w-10" : "w-24"
                          }`}
                        />
                      </div>

                      <div className="flex items-end gap-1">
                        <Skeleton
                          animationType="none"
                          className="h-8 w-10 rounded-md"
                        />

                        <Skeleton
                          animationType="none"
                          className="h-5 w-5 rounded-md"
                        />
                      </div>
                    </div>

                    <Skeleton
                      animationType="none"
                      className="h-5 w-56 rounded-md mb-4 mt-7"
                    />

                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Skeleton
                            animationType="none"
                            className="size-5 rounded-full"
                          />

                          <Skeleton
                            animationType="none"
                            className={`h-4 rounded-md ${
                              feature === 2
                                ? "w-48"
                                : feature === 3
                                  ? "w-40"
                                  : "w-52"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Skeleton
                    animationType="none"
                    className="h-13 w-full rounded-lg mt-8"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Tabs.Panel className="pt-3 text-sm" id="monthly">
              <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {monthlyPlans.map((plan) => {
                  const IconComponent = plan.icon;

                  const isCurrentPlan =
                    plan.planName === `${user?.accountType}_starter`
                      ? user?.plan === plan.planName
                      : user?.plan === plan.planName &&
                        user?.billingCycle === plan.billingCycle;

                  return (
                    <div
                      key={plan.planName}
                      className={`relative w-xs rounded-2xl px-5 py-6 flex flex-col justify-between transition-transform hover:scale-105 ${
                        plan.popular
                          ? "inset-shadow-[0_0_40px_rgba(99,102,241,0.5)] bg-indigo-600 text-white dark:bg-indigo-600/30 xl:scale-105 mt-3 md:mt-0"
                          : "border dark:inset-shadow-[0_1px_40px_rgba(255,255,255,.1)] bg-white dark:bg-foreground/10"
                      }`}
                    >
                      {plan.popular && (
                        <div className="bg-linear-to-b from-white to-stone-300 dark:from-indigo-500 dark:to-indigo-700 border-t dark:border-0 text-indigo-600 dark:text-white py-1 px-4 font-medium rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap">
                          MOST POPULAR
                        </div>
                      )}

                      <div>
                        <div className="flex flex-wrap gap-3 justify-between mb-6">
                          <div className="flex items-end gap-3">
                            <div className="bg-foreground/7 p-2 rounded-md">
                              <IconComponent />
                            </div>

                            <p className="text-2xl font-bold">{plan.name}</p>
                          </div>

                          <div className="flex items-end gap-1">
                            <p className="text-3xl font-bold">${plan.price}</p>

                            <p className="opacity-70 flex">/ m</p>
                          </div>
                        </div>

                        <p className="mb-4 font-medium">{plan.description}</p>

                        <div className="space-y-2">
                          {plan.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-2"
                            >
                              <span
                                className={
                                  plan.popular
                                    ? "text-white"
                                    : "text-indigo-500"
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
                        <input
                          type="hidden"
                          name="planName"
                          value={plan.planName}
                        />

                        <input
                          type="hidden"
                          name="billingCycle"
                          value={plan.billingCycle}
                        />

                        <section>
                          <button
                            type={plan.name === "Starter" ? "button" : "submit"}
                            onClick={(e) => {
                              if (plan.name === "Starter") {
                                setIsDowngradeModalOpen(true);
                              }

                              if (!user) {
                                e.preventDefault();
                                router.push("/login?redirect=/pricing");
                              }
                            }}
                            disabled={
                              isCurrentPlan ||
                              (!user && plan.name === "Starter")
                            }
                            className={`select-none flex justify-between py-4 px-6 w-full rounded-lg mt-8 font-semibold active:scale-95 duration-100 text-base lg:text-sm ${
                              isCurrentPlan ||
                              (!user && plan.name === "Starter")
                                ? plan.popular
                                  ? "active:scale-100 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white"
                                  : "active:scale-100 bg-foreground text-background"
                                : plan.popular
                                  ? "bg-white hover:bg-stone-100 dark:bg-indigo-600 hover:dark:bg-[#563fff] text-indigo-600 dark:text-white cursor-pointer"
                                  : "bg-foreground hover:bg-foreground/90 text-background cursor-pointer"
                            }`}
                          >
                            <div className="w-full text-left">
                              {!user && plan.name === "Starter"
                                ? "Default Plan"
                                : isCurrentPlan
                                  ? "Current Plan"
                                  : "Choose This Plan"}
                            </div>

                            <div className="flex justify-center items-center">
                              {!user &&
                              plan.name === "Starter" ? null : isCurrentPlan ? (
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
            </Tabs.Panel>

            <Tabs.Panel className="pt-3 text-sm" id="yearly">
              <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {yearlyPlans.map((plan) => {
                  const IconComponent = plan.icon;

                  const isCurrentPlan =
                    plan.planName === `${user?.accountType}_starter`
                      ? user?.plan === plan.planName
                      : user?.plan === plan.planName &&
                        user?.billingCycle === plan.billingCycle;

                  return (
                    <div
                      key={plan.planName}
                      className={`relative w-xs rounded-2xl px-5 py-6 flex flex-col justify-between transition-transform hover:scale-105 ${
                        plan.popular
                          ? "inset-shadow-[0_0_40px_rgba(99,102,241,0.5)] bg-indigo-600 text-white dark:bg-indigo-600/30 xl:scale-105 mt-3 md:mt-0"
                          : "border dark:inset-shadow-[0_1px_40px_rgba(255,255,255,.1)] bg-white dark:bg-foreground/10"
                      }`}
                    >
                      {plan.popular && (
                        <div className="bg-linear-to-b from-white to-stone-300 dark:from-indigo-500 dark:to-indigo-700 border-t dark:border-0 text-indigo-600 dark:text-white py-1 px-4 font-medium rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm whitespace-nowrap">
                          MOST POPULAR
                        </div>
                      )}

                      <div>
                        <div className="flex text-nowrap gap-3 justify-between mb-6">
                          <div className="flex items-end gap-3">
                            <div className="bg-foreground/7 p-2 rounded-md">
                              <IconComponent />
                            </div>

                            <p className="text-2xl font-bold">{plan.name}</p>
                          </div>

                          <div className="relative flex items-end gap-1">
                            {plan.originalPrice > plan.price && (
                              <p className="absolute -bottom-4 right-10 line-through opacity-70">
                                ${plan.originalPrice}
                              </p>
                            )}

                            <p className="text-3xl font-bold">${plan.price}</p>

                            <p className="opacity-70">/ y</p>
                          </div>
                        </div>

                        <p className="mb-4 font-medium">{plan.description}</p>

                        <div className="space-y-2">
                          {plan.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-2"
                            >
                              <span
                                className={
                                  plan.popular
                                    ? "text-white"
                                    : "text-indigo-500"
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
                        <input
                          type="hidden"
                          name="planName"
                          value={plan.planName}
                        />

                        <input
                          type="hidden"
                          name="billingCycle"
                          value={plan.billingCycle}
                        />

                        <section>
                          <button
                            type={plan.name === "Starter" ? "button" : "submit"}
                            onClick={(e) => {
                              if (plan.name === "Starter") {
                                setIsDowngradeModalOpen(true);
                              }

                              if (!user) {
                                e.preventDefault();
                                router.push("/login?redirect=/pricing");
                              }
                            }}
                            disabled={
                              isCurrentPlan ||
                              (!user && plan.name === "Starter")
                            }
                            className={`select-none flex justify-between py-4 px-6 w-full rounded-lg mt-8 font-semibold active:scale-95 duration-100 text-base lg:text-sm ${
                              isCurrentPlan ||
                              (!user && plan.name === "Starter")
                                ? plan.popular
                                  ? "active:scale-100 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white"
                                  : "active:scale-100 bg-foreground text-background"
                                : plan.popular
                                  ? "bg-white hover:bg-stone-100 dark:bg-indigo-600 hover:dark:bg-[#563fff] text-indigo-600 dark:text-white cursor-pointer"
                                  : "bg-foreground hover:bg-foreground/90 text-background cursor-pointer"
                            }`}
                          >
                            <div className="w-full text-left">
                              {!user && plan.name === "Starter"
                                ? "Default Plan"
                                : isCurrentPlan
                                  ? "Current Plan"
                                  : "Choose This Plan"}
                            </div>

                            <div className="flex justify-center items-center">
                              {!user &&
                              plan.name === "Starter" ? null : isCurrentPlan ? (
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
            </Tabs.Panel>
          </>
        )}
      </Tabs>

      <Modal
        isOpen={isDowngradeModalOpen}
        onOpenChange={setIsDowngradeModalOpen}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-110 rounded-xl">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading className="text-xl font-semibold">
                  Downgrade to Starter?
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <div className="space-y-4">
                  <p>
                    You’re about to switch from your current plan to the free
                    Starter plan.
                  </p>

                  <div className="rounded-lg bg-foreground/5 p-4 text-foreground">
                    <p className="font-semibold mb-2">You’ll lose access to:</p>

                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-foreground">
                      <li>Unlimited job applications</li>
                      <li>Unlimited saved jobs</li>
                      <li>AI job recommendations</li>
                      <li>Company insight dashboards</li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted">
                    Your current plan will remain active until the end of your
                    current billing period. After that, your account will switch
                    to the Starter plan.
                  </p>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="tertiary"
                  className="rounded-lg"
                  style={{ outline: "none", boxShadow: "none" }}
                  onPress={() => setIsDowngradeModalOpen(false)}
                >
                  Keep My Plan
                </Button>

                <Button
                  className="rounded-lg"
                  style={{ outline: "none", boxShadow: "none" }}
                  onPress={handleDowngrade}
                  variant="danger"
                >
                  Downgrade to Starter
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default Pricing;
