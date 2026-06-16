"use client";

import { createJob } from "@/lib/actions/jobs";
import { Check } from "@gravity-ui/icons";
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
} from "@heroui/react";
import React, { useState } from "react";
import { toast } from "sonner";
import RecruiterAddCompanyModal from "./RecruiterAddCompanyModal";
import { useRouter } from "next/navigation";

const RecruiterPostJob = ({ userId, companies }) => {
  const [jobType, setJobType] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJobData = Object.fromEntries(formData.entries());
    newJobData.salaryMin = parseInt(newJobData.salaryMin, 10);
    newJobData.salaryMax = parseInt(newJobData.salaryMax, 10);
    newJobData.userId = userId;
    const company = companies.find((c) => c._id === newJobData.companyId);
    newJobData.companyName = company.companyName;

    const res = await createJob(newJobData);

    if (res.insertedId) {
      toast.success("Job created");
      router.push("/dashboard/recruiter/jobs");
    } else {
      toast.error("Something went wrong");
    }
  };

  const inputClassName =
    "rounded-md focus:ring-indigo-500 aria-invalid:focus:ring-red-500 bg-white dark:bg-black/40";

  if (!companies.length) {
    return (
      <div className="sm:px-10">
        <div className="bg-foreground/5 rounded-md text-center py-12">
          <p className="text-4xl font-medium">Create a Company First</p>
          <p className="text-muted mt-2 mb-8">
            You need to create a company before posting or managing jobs.
          </p>
          <RecruiterAddCompanyModal />
        </div>
      </div>
    );
  }

  return (
    <div className="md:pl-5">
      <div>
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className=" mt-2 opacity-70">
          Fill in the details below to create a job listing and find the perfect
          candidate for your team.
        </p>
      </div>

      <div className="flex items-center justify-center mt-6">
        <Form
          onSubmit={onSubmit}
          className=" relative p-6 w-full sm:w-lg lg:w-3xl rounded-lg bg-foreground/5"
        >
          <Fieldset className=" w-full mb-8 sm:border-l-3 border-indigo-500 sm:pl-6">
            <Fieldset.Legend>Job Information</Fieldset.Legend>
            <Description>Enter the basic job details.</Description>
            <Select
              isRequired
              name="companyId"
              placeholder="Select one"
              className="absolute top-6 right-7"
            >
              <Label>Select Company</Label>
              <Select.Trigger
                className={"rounded-md  bg-white dark:bg-black/40 shadow-none"}
              >
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={"rounded-lg"}>
                <ListBox>
                  {companies.map((comp) => (
                    <ListBox.Item
                      key={comp._id}
                      id={comp._id}
                      textValue={comp.companyName}
                      className="rounded-lg focus:ring-indigo-500"
                    >
                      {comp.companyName}
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
                  className="flex-1"
                >
                  <Label>Job Category</Label>

                  <Select.Trigger className={`${inputClassName} shadow-none`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover className="rounded-lg">
                    <ListBox>
                      <ListBox.Item
                        id="technology"
                        textValue="Technology"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Technology
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="design"
                        textValue="Design"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Design
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="marketing"
                        textValue="Marketing"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Marketing
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="sales"
                        textValue="Sales"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Sales
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="customer-support"
                        textValue="Customer Support"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Customer Support
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="human-resources"
                        textValue="Human Resources"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Human Resources
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="finance"
                        textValue="Finance"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Finance
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="engineering"
                        textValue="Engineering"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Engineering
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="data-analytics"
                        textValue="Data & Analytics"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Data & Analytics
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="product-management"
                        textValue="Product Management"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Product Management
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="operations"
                        textValue="Operations"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Operations
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="healthcare"
                        textValue="Healthcare"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Healthcare
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="education"
                        textValue="Education"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Education
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item
                        id="other"
                        textValue="Other"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Other
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="flex gap-4">
                <Select
                  isRequired
                  name="jobType"
                  placeholder="Select job type"
                  className="flex-1"
                  onChange={setJobType}
                >
                  <Label>Job Type</Label>
                  <Select.Trigger className={`${inputClassName} shadow-none`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={"rounded-lg"}>
                    <ListBox>
                      <ListBox.Item
                        id="full-time"
                        textValue="Full-time"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Full-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="part-time"
                        textValue="Part-time"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Part-time
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="remote"
                        textValue="Remote"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Remote
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="contract"
                        textValue="Contract"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        Contract
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
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
                  className="flex-1"
                >
                  <Label>Currency</Label>
                  <Select.Trigger className={`${inputClassName} shadow-none`}>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={"rounded-lg"}>
                    <ListBox>
                      <ListBox.Item
                        id="usd"
                        textValue="USD"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        USD
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
                        id="eur"
                        textValue="EUR"
                        className="rounded-lg focus:ring-indigo-500"
                      >
                        EUR
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item
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

              {jobType !== "remote" && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <TextField
                    isRequired={!jobType}
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
                    isRequired={!jobType}
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
                <DateField.Group className={`${inputClassName} shadow-none`}>
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                </DateField.Group>
                <FieldError />
              </DateField>
            </Fieldset.Group>
          </Fieldset>

          <Fieldset className="w-full sm:border-l-3 border-green-700 sm:pl-6">
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
                <Description>What will the candidate be doing?</Description>
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
                <Description>
                  Skills, experience, and qualifications needed
                </Description>
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
                <Description>
                  What benefits does this position offer?
                </Description>
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Fieldset.Actions>
              <Button
                type="submit"
                className="rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600"
              >
                <Check />
                Post Job
              </Button>
              <Button
                type="reset"
                variant="tertiary"
                className="rounded-lg bg-foreground/10"
                style={{
                  boxShadow: "none",
                  outline: "none",
                }}
              >
                Clear
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
};

export default RecruiterPostJob;
