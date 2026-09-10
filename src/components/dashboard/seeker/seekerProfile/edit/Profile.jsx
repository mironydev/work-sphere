"use client";

import ImageUpload from "@/components/dashboard/recruiter/ImageUpload";
import { updateUser } from "@/lib/auth-client";
import {
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";
import { toast } from "sonner";

const SeekerProfile = ({ user }) => {
  const [profileImage, setProfileImage] = useState(user?.image);

  const inputClassName =
    "rounded-md border border-foreground/15 focus:border-transparent focus:ring-1 focus:ring-foreground/50 aria-invalid:focus:ring-red-500 bg-foreground/2 focus:bg-white dark:focus:bg-black dark:bg-black placeholder:text-foreground/40";

  const handleImageUpload = (imageUrl) => {
    setProfileImage(imageUrl);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newProfileData = Object.fromEntries(formData.entries());

    const profileFields = ["name", "phone", "city", "country", "headline"];

    const hasChanges =
      profileFields.some(
        (field) => (newProfileData[field] || "") !== (user?.[field] || ""),
      ) || profileImage !== user?.image;

    if (!hasChanges) {
      toast.info("No changes to update");
      return;
    }

    const { data, error } = await updateUser({
      name: newProfileData.name,
      phone: newProfileData.phone,
      city: newProfileData.city,
      country: newProfileData.country,
      headline: newProfileData.headline,
      image: profileImage,
    });

    if (error) {
      toast.error(error.message || "Failed to update profile");
      return;
    }

    toast.success("Profile updated successfully");
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">Edit Profile</h1>
      <div className="rounded-lg bg-white dark:bg-foreground/5 border">
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </div>

        <Form onSubmit={onSubmit} className="p-6 space-y-8">
          {/* Avatar Upload Section */}
          <div className="w-fit">
            <ImageUpload
              onImageUpload={handleImageUpload}
              uploadText="Click to upload profile picture"
              previewSize="w-12 h-12"
            />
          </div>

          {/* Name, Phone, City, Country Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              isRequired
              defaultValue={user?.name || ""}
              name="name"
              validate={(value) => {
                const name = value.trim();
                if (!name) {
                  return "Name is required";
                }
                if (name.length < 2) {
                  return "Name must be at least 2 characters";
                }
                if (name.length > 60) {
                  return "Name must be less than 60 characters";
                }
                if (!/^[a-zA-Z\s.]+$/.test(name)) {
                  return "Name contains invalid characters";
                }
                return null;
              }}
            >
              <Label>Full Name</Label>
              <Input
                placeholder="Your name"
                variant="secondary"
                className={inputClassName}
              />
              <FieldError />
            </TextField>

            <TextField
              defaultValue={user?.phone || ""}
              name="phone"
              validate={(value) => {
                const phone = value.trim();
                if (!phone) {
                  return null;
                }
                if (!/^[0-9+() .]+$/.test(phone)) {
                  return "Enter a valid phone number";
                }
                const digits = phone.replace(/\D/g, "");
                if (digits.length < 7 || digits.length > 15) {
                  return "Phone number must contain 7 to 15 digits";
                }
                return null;
              }}
            >
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Your phone number"
                variant="secondary"
                className={inputClassName}
              />
              <FieldError />
            </TextField>

            <TextField
              defaultValue={user?.city || ""}
              name="city"
              validate={(value) => {
                const city = value.trim();
                if (!city) {
                  return null;
                }
                if (city.length < 2) {
                  return "City must be at least 2 characters";
                }
                if (city.length > 80) {
                  return "City name is too long";
                }
                if (!/^[a-zA-Z\s.]+$/.test(city)) {
                  return "City contains invalid characters";
                }
                return null;
              }}
            >
              <Label>City</Label>
              <Input
                placeholder="e.g. New York"
                variant="secondary"
                className={inputClassName}
              />
              <FieldError />
            </TextField>

            <TextField
              defaultValue={user?.country || ""}
              name="country"
              validate={(value) => {
                const country = value.trim();
                if (!country) {
                  return null;
                }
                if (country.length < 2) {
                  return "Country must be at least 2 characters";
                }
                if (country.length > 60) {
                  return "Country name is too long";
                }
                if (!/^[a-zA-Z\s.]+$/.test(country)) {
                  return "Country contains invalid characters";
                }
                return null;
              }}
            >
              <Label>Country</Label>
              <Input
                placeholder="e.g. United States"
                variant="secondary"
                className={inputClassName}
              />
              <FieldError />
            </TextField>
          </div>

          {/* Headline Field */}
          <TextField
            defaultValue={user?.headline || ""}
            name="headline"
            validate={(value) => {
              const headline = value.trim();
              if (!headline) {
                return null;
              }
              if (headline.length < 5) {
                return "Headline must be at least 5 characters";
              }
              if (headline.length > 120) {
                return "Headline must be less than 120 characters";
              }
              return null;
            }}
          >
            <Label>Professional Headline</Label>
            <Input
              placeholder="e.g. Senior Frontend Developer"
              variant="secondary"
              className={inputClassName}
            />
            <Description id="email-description" className="text-right">
              Max 120 characters
            </Description>
            <FieldError />
          </TextField>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="bg-foreground font-medium text-background px-4 py-2 cursor-pointer select-none rounded-sm active:bg-foreground/80 duration-75"
            >
              Update Profile
            </button>
            <button
              type="button"
              className="bg-white dark:bg-red-500 border border-red-400 dark:border-red-500 text-red-500 dark:text-white active:text-red-400 dark:active:opacity-80 px-3 font-medium  rounded-sm cursor-pointer select-none"
            >
              Reset Password
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SeekerProfile;
