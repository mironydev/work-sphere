"use client";

import { updateUser } from "@/lib/auth-client";
import {
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SeekerAdditional = ({ user }) => {
  const router = useRouter();
  const inputClassName =
    "border border-foreground/10 rounded-md focus:ring-1 focus:ring-indigo-500 aria-invalid:focus:ring-red-500 bg-white dark:bg-black/40";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newAdditionalData = Object.fromEntries(formData.entries());

    const updatedData = {
      yearsOfExperience: newAdditionalData.yearsOfExperience
        ? Number(newAdditionalData.yearsOfExperience)
        : "",
      resumeLink: newAdditionalData.resumeLink,
      bio: newAdditionalData.bio,
      skills: newAdditionalData.skills,
      portfolio: newAdditionalData.portfolio,
      linkedin: newAdditionalData.linkedin,
    };

    const hasChanges = Object.entries(updatedData).some(([key, value]) => {
      return value !== (user?.[key] ?? "");
    });

    if (!hasChanges) {
      toast.info("No changes to update");
      return;
    }

    const { data, error } = await updateUser(updatedData);

    if (error) {
      toast.error(error.message || "Failed to update details");
      return;
    }
    toast.success("Professional details updated");
    setTimeout(() => {
      router.push("/dashboard/seeker/profile");
    }, 1500);
  };

  return (
    <div className="rounded-lg border-t-2 dark:border border-white dark:border-foreground/10 bg-white/80 dark:bg-foreground/5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-semibold">Professional Details</h2>
      </div>

      <Form onSubmit={onSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            name="yearsOfExperience"
            defaultValue={user?.yearsOfExperience?.toString() || ""}
            validate={(value) => {
              const experience = value.trim();

              if (!experience) {
                return null;
              }

              const number = Number(experience);

              if (!Number.isInteger(number)) {
                return "Experience must be a whole number";
              }

              if (number < 0) {
                return "Experience cannot be negative";
              }

              if (number > 60) {
                return "Experience cannot be more than 60 years";
              }

              return null;
            }}
          >
            <Label>Years of Experience</Label>
            <Input
              type="number"
              placeholder="e.g. 5"
              variant="secondary"
              className={inputClassName}
            />
            <FieldError />
          </TextField>

          <TextField
            name="resumeLink"
            defaultValue={user?.resumeLink || ""}
            validate={(value) => {
              const url = value.trim();

              if (!url) {
                return null;
              }

              try {
                new URL(url);
                return null;
              } catch {
                return "Enter a valid resume URL";
              }
            }}
          >
            <Label>Resume Link</Label>
            <Input
              type="url"
              placeholder="https://your-resume-link.com"
              variant="secondary"
              className={inputClassName}
            />
            <FieldError />
          </TextField>
        </div>

        <TextField
          name="bio"
          defaultValue={user?.bio || ""}
          validate={(value) => {
            const bio = value.trim();

            if (!bio) {
              return null;
            }

            if (bio.length < 20) {
              return "Must be at least 20 characters";
            }

            if (bio.length > 500) {
              return "Must be less than 500 characters";
            }

            return null;
          }}
        >
          <Label>About</Label>
          <TextArea
            placeholder="Tell employers about yourself..."
            variant="secondary"
            className={inputClassName}
            rows={5}
          />
          <Description id="email-description" className="text-right">
            Max 500 characters
          </Description>
          <FieldError />
        </TextField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            name="skills"
            defaultValue={user?.skills || ""}
            validate={(value) => {
              const skills = value.trim();

              if (!skills) {
                return null;
              }

              if (skills.length < 2) {
                return "Add at least one skill";
              }

              if (skills.length > 300) {
                return "Skills must be less than 300 characters";
              }

              return null;
            }}
          >
            <Label>Skills</Label>
            <Input
              placeholder="React, Next.js, TypeScript"
              variant="secondary"
              className={inputClassName}
            />
            <Description id="skills-description">
              Enter each skill separated by a comma
            </Description>
            <FieldError />
          </TextField>

          <TextField
            name="portfolio"
            defaultValue={user?.portfolio || ""}
            validate={(value) => {
              const url = value.trim();

              if (!url) {
                return null;
              }

              try {
                new URL(url);
                return null;
              } catch {
                return "Enter a valid portfolio URL";
              }
            }}
          >
            <Label>Portfolio URL</Label>
            <Input
              type="url"
              placeholder="https://yourportfolio.com"
              variant="secondary"
              className={inputClassName}
            />
            <FieldError />
          </TextField>
        </div>

        <TextField
          name="linkedin"
          defaultValue={user?.linkedin || ""}
          validate={(value) => {
            const url = value.trim();

            if (!url) {
              return null;
            }

            try {
              const parsedUrl = new URL(url);

              if (!parsedUrl.hostname.includes("linkedin.com")) {
                return "Enter a valid LinkedIn URL";
              }

              return null;
            } catch {
              return "Enter a valid LinkedIn URL";
            }
          }}
        >
          <Label>LinkedIn Profile</Label>
          <Input
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            variant="secondary"
            className={inputClassName}
          />
          <FieldError />
        </TextField>

        <button
          type="submit"
          className="bg-foreground font-medium text-background px-4 py-2 cursor-pointer select-none rounded-sm active:bg-foreground/80 duration-75"
        >
          Save Details
        </button>
      </Form>
    </div>
  );
};

export default SeekerAdditional;
