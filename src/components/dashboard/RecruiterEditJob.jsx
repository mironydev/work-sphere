"use client";

import { editJob } from "@/lib/actions/jobs";
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
import { useRouter } from "next/navigation";

const RecruiterEditJob = ({ job }) => {
  const router = useRouter();
  const [jobType, setJobType] = useState(job.jobType || "");

  const {
    _id,
    companyName,
    jobTitle,
    jobCategory,
    currency,
    salaryMin,
    salaryMax,
    city,
    country,
    deadline,
    responsibilities,
    requirements,
    benefits,
  } = job;

  const inputClassName =
    "rounded-md focus:ring-indigo-500 aria-invalid:focus:ring-red-500 bg-white dark:bg-black/40";

  const handleForm = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newData = Object.fromEntries(data.entries());
    newData.salaryMin = parseInt(newData.salaryMin, 10);
    newData.salaryMax = parseInt(newData.salaryMax, 10);

    if (newData.jobType === "remote") {
      newData.city = null;
      newData.country = null;
    }

    const res = await editJob(_id, newData);

    if (res.modifiedCount || res.matchedCount) {
      toast.success("Job updated successfully");
      router.push("/dashboard/recruiter/jobs");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="md:pl-5">
      <div>
        <h1 className="text-3xl font-bold">Edit Job Posting</h1>
        <p className="mt-2 opacity-70">
          Update the details below to modify your job listing.
        </p>
      </div>

      <div className="flex items-center justify-center mt-6">
        <Form
          onSubmit={handleForm}
          className="relative p-6 w-full sm:w-lg lg:w-3xl rounded-lg bg-foreground/5"
        >
          <Fieldset className="w-full mb-8 sm:border-l-3 border-indigo-500 sm:pl-6">
            <Fieldset.Legend>Job Information</Fieldset.Legend>
            <Description>Edit the basic job details.</Description>
            <Select
              isDisabled
              placeholder="Select one"
              defaultValue={companyName}
              className="sm:absolute top-6 right-7"
            >
              <Label>Company</Label>
              <Select.Trigger
                className={"rounded-md bg-white dark:bg-black/40 shadow-none"}
              >
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={"rounded-lg"}>
                <ListBox>
                  <ListBox.Item
                    id={companyName}
                    textValue={companyName}
                    className="rounded-lg focus:ring-indigo-500"
                  >
                    {companyName}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Fieldset.Group>
              <div className="flex flex-col sm:flex-row gap-4">
                <TextField
                  isRequired
                  name="jobTitle"
                  className="w-full flex-1"
                  defaultValue={jobTitle}
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
                    className={inputClassName}
                  />
                  <FieldError />
                </TextField>

                <Select
                  isRequired
                  name="jobCategory"
                  placeholder="Select job category"
                  className="flex-1"
                  defaultValue={jobCategory}
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
                  defaultValue={job.jobType}
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
                  defaultValue={currency}
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
                  defaultValue={salaryMin}
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
                  defaultValue={salaryMax}
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
                    isRequired={jobType !== "remote"}
                    name="city"
                    className="w-full"
                    defaultValue={city || ""}
                    validate={(value) => {
                      const cityVal = value.trim();

                      if (!cityVal) {
                        return "City is required";
                      }

                      if (cityVal.length < 2) {
                        return "City is too short";
                      }

                      if (cityVal.length > 80) {
                        return "City name is too long";
                      }

                      if (!/^[a-zA-Z\s.'-]+$/.test(cityVal)) {
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
                    isRequired={jobType !== "remote"}
                    name="country"
                    className="w-full"
                    defaultValue={country || ""}
                    validate={(value) => {
                      const countryVal = value.trim();

                      if (!countryVal) {
                        return "Country is required";
                      }

                      if (countryVal.length < 2) {
                        return "Country is too short";
                      }

                      if (countryVal.length > 60) {
                        return "Country name is too long";
                      }

                      if (!/^[a-zA-Z\s.'-]+$/.test(countryVal)) {
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
              Update detailed information about the role.
            </Description>
            <Fieldset.Group>
              <TextField
                isRequired
                name="responsibilities"
                defaultValue={responsibilities}
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
                defaultValue={requirements}
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

              <TextField name="benefits" defaultValue={benefits || ""}>
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
                Update Job
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

export default RecruiterEditJob;
