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
import {
  Check,
  FileArrowDown,
  File,
  BriefcaseFill,
  Handset,
  LogoLinkedin,
  Globe,
} from "@gravity-ui/icons";
import { toast } from "sonner";
import { submitApplication } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";

const Apply = ({ job, user }) => {
  const { _id, jobTitle, companyName } = job;
  const { name, email } = user;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const applicationData = Object.fromEntries(formData.entries());

    applicationData.jobId = _id;
    applicationData.userName = name;
    applicationData.userEmail = email;
    applicationData.companyName = companyName;

    const res = await submitApplication(applicationData);
    if (res.insertedId) {
      toast.success("Application submitted!");
      router.push("/jobs");
    } else {
      toast.error("Failed to submit application");
    }
  };

  const inputClassName =
    "rounded-md focus:ring-indigo-500 aria-invalid:focus:ring-red-500 bg-white dark:bg-black/40";

  return (
    <div className="">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-2">Apply Now</h1>
          <p className="text-muted text-lg">Join our team and make an impact</p>
        </div>

        <div className="mb-10 p-8 rounded-xl bg-linear-to-r from-indigo-600/10 via-indigo-500/5 to-indigo-400/5 border border-indigo-200/30 dark:border-indigo-400/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                Position
              </p>
              <p className="text-2xl font-bold">{jobTitle}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                Company
              </p>
              <p className="text-2xl font-bold">{companyName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted mb-2 uppercase tracking-wide">
                Your Name
              </p>
              <p className="text-lg">{name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted mb-2 uppercase tracking-wide">
                Your Email
              </p>
              <p className="text-lg">{email}</p>
            </div>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="space-y-8 p-5 sm:p-8 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-foreground/10"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-xl font-bold">Essential Information</h2>
            </div>

            <div className="space-y-5">
              <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10 hover:border-indigo-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <FileArrowDown className="hidden sm:block w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                  <TextField
                    isRequired
                    name="resumeLink"
                    className="w-full"
                    validate={(value) => {
                      if (!value) return "Resume link is required";
                      if (!value.startsWith("http")) {
                        return "Please provide a valid URL";
                      }
                      return null;
                    }}
                  >
                    <Label className="font-semibold">Resume / CV Link</Label>
                    <Input
                      placeholder="https://drive.google.com/... or your CV link"
                      variant="secondary"
                      className={inputClassName}
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10 hover:border-indigo-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <File className="hidden sm:block w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                  <TextField
                    isRequired
                    name="coverLetter"
                    className="w-full"
                    validate={(value) => {
                      if (value.length < 50) {
                        return "Please write at least 50 characters";
                      }
                      return null;
                    }}
                  >
                    <Label className="font-semibold">Cover Letter</Label>
                    <TextArea
                      placeholder="Tell us why you're excited about this opportunity and what makes you a great fit..."
                      variant="secondary"
                      className={inputClassName}
                      rows={5}
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10 hover:border-indigo-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <BriefcaseFill className="hidden sm:block w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                  <TextField
                    isRequired
                    name="yearsOfExperience"
                    type="number"
                    className="w-full"
                    validate={(value) => {
                      if (value === "" || value === null)
                        return "Years of experience is required";
                      if (Number(value) < 0) return "Must be 0 or greater";
                      return null;
                    }}
                  >
                    <Label className="font-semibold">Years of Experience</Label>
                    <Input
                      placeholder="e.g., 5"
                      variant="secondary"
                      className={inputClassName}
                      type="number"
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-xl font-bold">Contact Information</h2>
            </div>

            <div className="space-y-5">
              <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10 hover:border-indigo-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <Handset className=" hidden sm:block w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                  <TextField
                    name="phoneNumber"
                    className="w-full"
                    validate={(value) => {
                      if (value && value.length < 10) {
                        return "Please provide a valid phone number";
                      }
                      return null;
                    }}
                  >
                    <Label className="font-semibold">
                      Phone Number{" "}
                      <span className="text-muted">(Optional)</span>
                    </Label>
                    <Input
                      placeholder="+1 (555) 123-4567"
                      variant="secondary"
                      className={inputClassName}
                      type="tel"
                    />
                    <FieldError />
                  </TextField>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10 hover:border-indigo-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <LogoLinkedin className="hidden sm:block w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                  <TextField
                    name="linkedinProfile"
                    className="w-full"
                    validate={(value) => {
                      if (value && !value.startsWith("http")) {
                        return "Please provide a valid LinkedIn URL";
                      }
                      return null;
                    }}
                  >
                    <Label className="font-semibold">
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
                </div>
              </div>

              <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10 hover:border-indigo-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <Globe className="hidden sm:block w-5 h-5 text-indigo-600 mt-1 shrink-0" />
                  <TextField
                    name="portfolio"
                    className="w-full"
                    validate={(value) => {
                      if (value && !value.startsWith("http")) {
                        return "Please provide a valid portfolio URL";
                      }
                      return null;
                    }}
                  >
                    <Label className="font-semibold">
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
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-xl font-bold">Final Thoughts</h2>
            </div>

            <div className="p-5 rounded-lg bg-foreground/3 border border-foreground/10">
              <TextField name="additionalMessage" className="w-full">
                <Label className="font-semibold">
                  Additional Message{" "}
                  <span className="text-muted">(Optional)</span>
                </Label>
                <TextArea
                  placeholder="Share anything else you'd like us to know about you..."
                  variant="secondary"
                  className={inputClassName}
                  rows={4}
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-foreground/10">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 rounded-lg flex-1"
            >
              <Check />
              Submit Application
            </Button>
            <Button
              type="reset"
              variant="tertiary"
              className="rounded-lg bg-foreground/10 hover:bg-foreground/20"
              style={{
                boxShadow: "none",
                outline: "none",
              }}
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Apply;
