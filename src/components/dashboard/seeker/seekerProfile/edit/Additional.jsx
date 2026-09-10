"use client";

import { updateUser } from "@/lib/auth-client";
import {
  Chip,
  CloseButton,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SeekerAdditional = ({ user }) => {
  const [skills, setSkills] = useState(
    user?.skills
      ? user.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [],
  );

  const [skillInput, setSkillInput] = useState("");
  const router = useRouter();

  const inputClassName =
    "rounded-md border border-foreground/15 focus-within:border-transparent focus-within:ring-1 focus-within:ring-foreground/50 aria-invalid:focus-within:ring-red-500 bg-foreground/2 focus-within:bg-white dark:focus-within:bg-black dark:bg-black placeholder:text-foreground/40";

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
    <div className="rounded-lg bg-white dark:bg-foreground/5 border">
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
            validate={() => {
              const skillsValue = skills.join(", ");

              if (!skillsValue) {
                return null;
              }

              if (skillsValue.length < 2) {
                return "Add at least one skill";
              }

              if (skillsValue.length > 300) {
                return "Skills must be less than 300 characters";
              }

              return null;
            }}
          >
            <Label>Skills</Label>

            <div
              className={`${inputClassName} flex flex-wrap gap-2 items-center py-2 px-3 transition-all duration-150`}
            >
              {skills.map((skill) => (
                <Chip key={skill} size="sm" className="rounded-sm">
                  <Chip.Label>{skill}</Chip.Label>

                  <CloseButton
                    aria-label={`Remove ${skill}`}
                    onPress={() =>
                      setSkills((current) =>
                        current.filter((item) => item !== skill),
                      )
                    }
                  />
                </Chip>
              ))}

              <input
                value={skillInput}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.includes(",")) {
                    const parts = value.split(",");
                    const newSkills = parts
                      .slice(0, -1)
                      .map((skill) => skill.trim())
                      .filter(Boolean);

                    setSkills((current) => [
                      ...current,
                      ...newSkills.filter(
                        (skill) =>
                          !current.some(
                            (existing) =>
                              existing.toLowerCase() === skill.toLowerCase(),
                          ),
                      ),
                    ]);

                    setSkillInput(parts.at(-1) || "");
                  } else {
                    setSkillInput(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && skillInput.trim()) {
                    e.preventDefault();

                    const skill = skillInput.trim();

                    setSkills((current) => {
                      if (
                        current.some(
                          (existing) =>
                            existing.toLowerCase() === skill.toLowerCase(),
                        )
                      ) {
                        return current;
                      }

                      return [...current, skill];
                    });

                    setSkillInput("");
                  }

                  if (e.key === "Backspace" && !skillInput && skills.length) {
                    setSkills((current) => current.slice(0, -1));
                  }
                }}
                placeholder={skills.length ? "" : "React, Next.js, TypeScript"}
                className="flex-1 min-w-24 outline-none bg-transparent text-sm placeholder:opacity-70"
              />
            </div>

            <input type="hidden" name="skills" value={skills.join(", ")} />

            <Description id="skills-description">
              Separate skills with commas
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
