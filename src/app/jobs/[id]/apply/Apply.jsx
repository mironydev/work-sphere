"use client";

import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { toast } from "sonner";
import { submitApplication } from "@/lib/actions/application";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Apply = ({ job, user, totalApplications, plan }) => {
  const { _id, jobTitle } = job;
  const { name, email, id } = user;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const applicationData = Object.fromEntries(formData.entries());

    applicationData.user = {
      id,
      name,
      email,
    };

    applicationData.job = {
      id: _id,
      title: jobTitle,
    };

    applicationData.company = {
      name: job.company.companyName,
      url: job.company.url,
    };

    applicationData.status = "applied";
    const res = await submitApplication(applicationData);
    if (res.insertedId) {
      toast.success("Application submitted!");
      router.push("/jobs");
    } else {
      toast.error("Failed to submit application");
    }
  };

  const inputClassName =
    "rounded-md border border-foreground/15 focus:border-transparent focus:ring-1 focus:ring-foreground/50 aria-invalid:focus:ring-red-500 bg-foreground/2 focus:bg-white dark:focus:bg-black dark:bg-black placeholder:text-foreground/40";

  if (totalApplications >= plan.maxApplicationsPerMonth) {
    return (
      <div className="flex items-center justify-center pt-12">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Quota Reached
            </h1>
            <p className="text-lg text-muted">
              You&apos;ve applied to the maximum number of jobs.
            </p>
          </div>

          <div className="mb-10 p-8 rounded-xl bg-white dark:bg-foreground/5 border">
            <p className="text-sm text-muted mb-2">Your Applications</p>
            <p className="text-5xl font-bold text-red-500">5 / 5</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/pricing"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg active:scale-95 duration-100"
            >
              Upgrade Plan
            </Link>
            <Link
              href="/dashboard/seeker/applications"
              className="bg-white dark:bg-foreground/5 hover:bg-blue-50 dark:hover:bg-black border text-foreground font-semibold px-8 py-3 rounded-lg active:scale-95 duration-100"
            >
              View My Applications
            </Link>
          </div>

          {/* Info Box */}
          <p className="text-sm text-muted">
            Upgrade your plan to apply to more jobs and unlock premium features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto sm:pt-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Apply for {jobTitle}</h1>
        <p className="text-muted mt-1">{job.company.companyName}</p>
      </div>

      <div className="rounded-xl bg-white dark:bg-foreground/5 border">
        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Application</h2>
              {plan.name === "seeker_starter" && (
                <p className="text-xs text-muted whitespace-nowrap h-fit bg-foreground/3 px-2 py-0.5 rounded-full">
                  Applications left:{" "}
                  <span className="font-semibold">
                    {plan.maxApplicationsPerMonth - totalApplications} /{" "}
                    {plan.maxApplicationsPerMonth}
                  </span>
                </p>
              )}
            </div>

            <p className="text-sm text-muted mt-1">
              Submit your application for this position.
            </p>
          </div>

          <div className="mb-8 p-4 bg-foreground/1 dark:bg-foreground/3 rounded-lg border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-wide">
                  Your Name
                </p>
                <p className="mt-1">{name}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-wide">
                  Your Email
                </p>
                <p className="mt-1">{email}</p>
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold mb-5">
                Essential Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                  isRequired
                  name="resumeLink"
                  validate={(value) => {
                    if (!value) return "Resume link is required";

                    if (!value.startsWith("http")) {
                      return "Please provide a valid URL";
                    }

                    return null;
                  }}
                >
                  <Label>Resume / CV Link</Label>

                  <Input
                    placeholder="https://drive.google.com/..."
                    variant="secondary"
                    className={inputClassName}
                  />

                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="yearsOfExperience"
                  validate={(value) => {
                    if (value === "" || value === null) {
                      return "Years of experience is required";
                    }

                    if (Number(value) < 0) {
                      return "Must be 0 or greater";
                    }

                    return null;
                  }}
                >
                  <Label>Years of Experience</Label>

                  <Input
                    placeholder="e.g. 5"
                    variant="secondary"
                    className={inputClassName}
                    type="number"
                  />

                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="coverLetter"
                  validate={(value) => {
                    if (value.length < 50) {
                      return "Please write at least 50 characters";
                    }

                    return null;
                  }}
                  className="sm:col-span-2"
                >
                  <Label>Cover Letter</Label>

                  <TextArea
                    placeholder="Tell us why you're excited about this opportunity and what makes you a great fit..."
                    variant="secondary"
                    className={inputClassName}
                    rows={6}
                  />

                  <FieldError />
                </TextField>
              </div>
            </section>

            <div className="border-t border-foreground/10" />

            <section>
              <h3 className="text-sm font-semibold mb-5">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextField
                  name="phoneNumber"
                  validate={(value) => {
                    if (value && value.length < 10) {
                      return "Please provide a valid phone number";
                    }

                    return null;
                  }}
                >
                  <Label>
                    Phone Number <span className="text-muted">(Optional)</span>
                  </Label>

                  <Input
                    placeholder="+1 (555) 123-4567"
                    variant="secondary"
                    className={inputClassName}
                    type="tel"
                  />

                  <FieldError />
                </TextField>

                <TextField
                  name="linkedinProfile"
                  validate={(value) => {
                    if (value && !value.startsWith("http")) {
                      return "Please provide a valid LinkedIn URL";
                    }

                    return null;
                  }}
                >
                  <Label>
                    LinkedIn Profile{" "}
                    <span className="text-muted">(Optional)</span>
                  </Label>

                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    variant="secondary"
                    className={inputClassName}
                  />

                  <FieldError />
                </TextField>

                <TextField
                  name="portfolio"
                  validate={(value) => {
                    if (value && !value.startsWith("http")) {
                      return "Please provide a valid portfolio URL";
                    }

                    return null;
                  }}
                  className="sm:col-span-2"
                >
                  <Label>
                    Portfolio / Website{" "}
                    <span className="text-muted">(Optional)</span>
                  </Label>

                  <Input
                    placeholder="https://yourportfolio.com"
                    variant="secondary"
                    className={inputClassName}
                  />

                  <FieldError />
                </TextField>
              </div>
            </section>

            <div className="border-t border-foreground/10" />

            <section>
              <h3 className="text-sm font-semibold mb-5">
                Additional Information
              </h3>

              <TextField name="additionalMessage" className="w-full">
                <Label>
                  Additional Message{" "}
                  <span className="text-muted">(Optional)</span>
                </Label>

                <TextArea
                  placeholder="Anything else you'd like the recruiter to know?"
                  variant="secondary"
                  className={inputClassName}
                  rows={4}
                />

                <FieldError />
              </TextField>
            </section>

            <div className="flex justify-end gap-3 pt-6 border-t border-foreground/10">
              <Button
                type="submit"
                className="w-full sm:w-fit bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 rounded-lg py-5 pr-6 text-base"
              >
                <Check />
                Submit Application
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Apply;
