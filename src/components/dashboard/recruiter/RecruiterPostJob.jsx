"use client";

import { createJob } from "@/lib/actions/jobs";
import { Check, CircleExclamationFill, Clock } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Select,
  TextArea,
  TextField,
  ListBox,
  DateField,
  Checkbox,
} from "@heroui/react";
import React, { useState } from "react";
import { toast } from "sonner";
import RecruiterAddCompanyModal from "./RecruiterAddCompanyModal";
import { useRouter } from "next/navigation";
import { useSessionClient } from "@/lib/helpers";
import DashboardSpinner from "../DashboardSpinner";

const RecruiterPostJob = ({ userId, companies }) => {
  const { isPending } = useSessionClient();
  const [isRemote, setIsRemote] = useState(false);
  const router = useRouter();

  const inputClassName =
    "rounded-md border border-foreground/15 focus:border-transparent focus:ring-1 focus:ring-foreground/50 aria-invalid:focus:ring-red-500 bg-foreground/2 focus:bg-white dark:focus:bg-black dark:bg-black placeholder:text-foreground/40 mt-1";

  const industries = [
    { id: "technology", label: "Technology" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "sales", label: "Sales" },
    { id: "customer-support", label: "Customer Support" },
    { id: "human-resources", label: "Human Resources" },
    { id: "finance", label: "Finance" },
    { id: "engineering", label: "Engineering" },
    { id: "data-analytics", label: "Data & Analytics" },
    { id: "product-management", label: "Product Management" },
    { id: "operations", label: "Operations" },
    { id: "healthcare", label: "Healthcare" },
    { id: "education", label: "Education" },
    { id: "other", label: "Other" },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJobData = Object.fromEntries(formData.entries());
    newJobData.salaryMin = parseInt(newJobData.salaryMin, 10);
    newJobData.salaryMax = parseInt(newJobData.salaryMax, 10);
    newJobData.userId = userId;
    newJobData.isRemote = isRemote;
    newJobData.isActive = true;

    const res = await createJob(newJobData);

    if (res.insertedId) {
      toast.success("Job created");
      router.push("/dashboard/recruiter/jobs");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (isPending) {
    return <DashboardSpinner />;
  }

  if (!companies.length) {
    return (
      <div className="bg-foreground/5 rounded-md text-center py-12">
        <p className="text-4xl font-medium">Create a Company First</p>
        <p className="text-muted mt-1 mb-8">
          You need to create a company before posting or managing jobs.
        </p>
        <RecruiterAddCompanyModal />
      </div>
    );
  }

  const companiesPending = companies.every(
    (company) => company.status === "pending",
  );

  if (companiesPending) {
    return (
      <div className="flex items-center justify-center mt-5">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-yellow-600/20 mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold mb-3">Please Wait</h2>
          <p className="text-lg text-muted mb-2">
            Your companies are awaiting approval.
          </p>
          <p className="text-sm text-muted mb-8">
            We&apos;re reviewing your company information. This usually takes
            24-48 hours.
          </p>

          {/* Info Box */}
          <div className="px-4 py-6 rounded-lg bg-white dark:bg-foreground/10 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <div className="flex gap-1">
              <CircleExclamationFill className="w-6 h-6 text-yellow-600 scale-75 shrink-0" />
              <p className="text-sm text-yellow-600 text-left">
                You&apos;ll be notified via email once your companies are
                approved. In the meantime, you can review and update your
                company details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className=" mt-1 opacity-70">
          Fill in the details below to create a job listing and find the perfect
          candidate for your team.
        </p>
      </div>

      <div className="flex items-center justify-center mt-6">
        <Form
          onSubmit={onSubmit}
          className="relative p-6 w-full sm:w-xl lg:w-2xl rounded-lg bg-white dark:bg-foreground/5 border"
        >
          <Fieldset className="w-full mb-8">
            <Fieldset.Legend>Job Information</Fieldset.Legend>
            <Description>Enter the basic job details.</Description>
            <Select
              isRequired
              name="companyId"
              placeholder="Select one"
              className="group sm:absolute top-6 right-7 [&_[data-slot=select-value][data-placeholder=true]]:opacity-60"
            >
              <Label>Select Company</Label>
              <Select.Trigger
                className={`${inputClassName} dark:bg-black/40 shadow-none`}
              >
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="rounded-md">
                <ListBox>
                  {companies.map((comp) => (
                    <ListBox.Item
                      style={{ outline: "none", boxShadow: "none" }}
                      key={comp._id}
                      id={comp._id}
                      textValue={comp.companyName}
                      className="rounded-sm focus:ring-indigo-500"
                      isDisabled={comp.status === "pending"}
                    >
                      {comp.companyName}
                      {comp.status === "pending" ? (
                        <p className="text-xs text-muted">(pending)</p>
                      ) : (
                        ""
                      )}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Fieldset.Group>
              <div className="flex flex-col sm:flex-row gap-4">
                <TextField
                  isRequired
                  name="jobTitle"
                  className="w-full flex-1"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Job title must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Job Title</Label>
                  <Input
                    placeholder="e.g., Senior React Developer"
                    variant="secondary"
                    className={`${inputClassName}`}
                  />
                  <FieldError />
                </TextField>

                <Select
                  isRequired
                  name="jobCategory"
                  placeholder="Select job category"
                  className="flex-1 [&_[data-slot=select-value][data-placeholder=true]]:opacity-60"
                >
                  <Label>Job Category</Label>

                  <Select.Trigger className={`${inputClassName} shadow-none`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-lg">
                    <ListBox>
                      {industries.map((industry) => (
                        <ListBox.Item
                          key={industry.id}
                          id={industry.id}
                          textValue={industry.label}
                          className="rounded-lg focus:ring-indigo-500"
                          style={{ outline: "none", boxShadow: "none" }}
                        >
                          {industry.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  isRequired
                  name="jobType"
                  placeholder="Select job type"
                  className="flex-1 text-nowrap [&_[data-slot=select-value][data-placeholder=true]]:opacity-60"
                >
                  <Label>Job Type</Label>
                  <Select.Trigger className={`${inputClassName} shadow-none`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={"rounded-lg"}>
                    <ListBox>
                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="full-time"
                        textValue="Full-time"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Full-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="part-time"
                        textValue="Part-time"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Part-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="contract"
                        textValue="Contract"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Contract
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="internship"
                        textValue="Internship"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Internship
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <Select
                  isRequired
                  name="currency"
                  placeholder="Select currency"
                  className="flex-1 text-nowrap [&_[data-slot=select-value][data-placeholder=true]]:opacity-60"
                >
                  <Label>Currency</Label>
                  <Select.Trigger className={`${inputClassName} shadow-none`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={"rounded-lg"}>
                    <ListBox>
                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="usd"
                        textValue="USD"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        USD
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="eur"
                        textValue="EUR"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        EUR
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        style={{ outline: "none", boxShadow: "none" }}
                        id="gbp"
                        textValue="GBP"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        GBP
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <TextField
                  isRequired
                  name="salaryMin"
                  type="number"
                  className="flex-1"
                  validate={(value) => {
                    const salary = Number(value);

                    if (Number.isNaN(salary)) {
                      return "Enter a valid number";
                    }

                    if (!Number.isInteger(salary)) {
                      return "Salary must be a whole number";
                    }

                    if (salary <= 0) {
                      return "Salary must be greater than 0";
                    }

                    return null;
                  }}
                >
                  <Label>Minimum Salary</Label>
                  <Input
                    placeholder="50000"
                    variant="secondary"
                    className={inputClassName}
                  />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="salaryMax"
                  type="number"
                  className="flex-1"
                  validate={(value) => {
                    const maxSalary = Number(value);

                    if (Number.isNaN(maxSalary)) {
                      return "Enter a valid number";
                    }

                    if (maxSalary <= 0) {
                      return "Salary must be greater than 0";
                    }

                    if (!Number.isInteger(maxSalary)) {
                      return "Salary must be a whole number";
                    }

                    const minSalary = Number(
                      document.querySelector('[name="salaryMin"]')?.value,
                    );

                    if (!Number.isNaN(minSalary) && maxSalary <= minSalary) {
                      return "Max salary must be greater than min salary";
                    }

                    return null;
                  }}
                >
                  <Label>Maximum Salary</Label>
                  <Input
                    placeholder="120000"
                    variant="secondary"
                    className={inputClassName}
                  />
                  <FieldError />
                </TextField>
              </div>
              <Checkbox
                isSelected={isRemote}
                onChange={setIsRemote}
                className="w-fit"
              >
                <Checkbox.Content className="flex flex-row items-center gap-2">
                  <Checkbox.Control
                    className="bg-foreground/5 dark:bg-foreground/10 border border-foreground/10 ring-0 rounded-xl"
                    style={{
                      boxShadow: "none",
                    }}
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  It&apos;s a remote job
                </Checkbox.Content>
              </Checkbox>
              {!isRemote && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <TextField
                    isRequired={!isRemote}
                    name="city"
                    className="w-full"
                    validate={(value) => {
                      const city = value.trim();

                      if (!city) {
                        return "City is required";
                      }

                      if (city.length < 2) {
                        return "City is too short";
                      }

                      if (city.length > 80) {
                        return "City name is too long";
                      }

                      if (!/^[a-zA-Z\s.'-]+$/.test(city)) {
                        return "City contains invalid characters";
                      }

                      return null;
                    }}
                  >
                    <Label>City</Label>
                    <Input
                      placeholder="e.g., New York"
                      variant="secondary"
                      className={inputClassName}
                    />
                    <FieldError />
                  </TextField>

                  <TextField
                    isRequired={!isRemote}
                    name="country"
                    className="w-full"
                    validate={(value) => {
                      const country = value.trim();

                      if (!country) {
                        return "Country is required";
                      }

                      if (country.length < 2) {
                        return "Country is too short";
                      }

                      if (country.length > 60) {
                        return "Country name is too long";
                      }

                      if (!/^[a-zA-Z\s.'-]+$/.test(country)) {
                        return "Country contains invalid characters";
                      }

                      return null;
                    }}
                  >
                    <Label>Country</Label>
                    <Input
                      placeholder="e.g., United States"
                      variant="secondary"
                      className={inputClassName}
                    />
                    <FieldError />
                  </TextField>
                </div>
              )}
              <DateField
                isRequired
                name="deadline"
                className="sm:w-1/2 sm:pr-2"
                validate={(value) => {
                  if (!value) {
                    return "Deadline is required";
                  }
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  if (selectedDate < today) {
                    return "Deadline cannot be in the past";
                  }
                  return null;
                }}
              >
                <Label>Deadline</Label>
                <DateField.Group
                  className={`${inputClassName} shadow-none focus-within:ring-1 focus-within:ring-foreground/50 focus-within:border-transparent`}
                >
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                </DateField.Group>
                <FieldError />
              </DateField>
            </Fieldset.Group>
          </Fieldset>

          <Fieldset className="w-full">
            <Fieldset.Legend>Job Description</Fieldset.Legend>
            <Description>
              Provide detailed information about the role.
            </Description>
            <Fieldset.Group>
              <TextField
                isRequired
                name="responsibilities"
                validate={(value) => {
                  if (value.length < 20) {
                    return "Responsibilities must be at least 20 characters";
                  }
                  return null;
                }}
              >
                <Label>Responsibilities</Label>
                <TextArea
                  placeholder="List the key responsibilities of this position..."
                  variant="secondary"
                  className={inputClassName}
                  rows={4}
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="requirements"
                validate={(value) => {
                  if (value.length < 20) {
                    return "Requirements must be at least 20 characters";
                  }
                  return null;
                }}
              >
                <Label>Requirements</Label>
                <TextArea
                  placeholder="List the required skills and qualifications..."
                  variant="secondary"
                  className={inputClassName}
                  rows={5}
                />

                <FieldError />
              </TextField>

              <TextField name="benefits">
                <Label>Benefits (Optional)</Label>
                <TextArea
                  placeholder="e.g., Health insurance, Remote work..."
                  variant="secondary"
                  className={inputClassName}
                  rows={3}
                />

                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Fieldset.Actions className="justify-center w-full">
              <Button
                type="submit"
                className="w-full sm:w-1/2 py-5 rounded-md bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 pr-6 text-base"
                style={{ outline: "none", boxShadow: "none" }}
              >
                <Check />
                Post Job
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
};

export default RecruiterPostJob;
