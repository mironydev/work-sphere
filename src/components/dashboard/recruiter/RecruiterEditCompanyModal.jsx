"use client";

import { editCompany } from "@/lib/actions/company";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";

const RecruiterEditCompanyModal = ({ company, onClose }) => {
  const [logoUrl, setLogoUrl] = useState("");
  const router = useRouter();

  const {
    companyName,
    description,
    industry,
    location,
    totalEmployees,
    url,
    _id,
  } = company;

  const inputClassName =
    "rounded-md border border-foreground/15 focus:border-transparent focus:ring-1 focus:ring-foreground/50 aria-invalid:focus:ring-red-500 bg-white dark:focus:bg-black dark:bg-black placeholder:text-foreground/40 mt-1";

  const handleForm = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const newData = Object.fromEntries(data.entries());

    newData.totalEmployees = parseInt(newData.totalEmployees, 10);

    if (logoUrl) {
      newData.logo = logoUrl;
    }

    const res = await editCompany(_id, newData);

    if (res.matchedCount) {
      toast.success("Company edited successfully");
      setLogoUrl("");
      onClose();
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form className="flex flex-col overflow-hidden" onSubmit={handleForm}>
      <Modal.Header className="p-5">
        <Modal.Heading className="text-2xl">Edit Company Details</Modal.Heading>

        <p className="-mt-2 -mb-1 text-sm leading-5 text-muted">
          Update your company information and save your changes.
        </p>
      </Modal.Header>

      <Modal.Body className="overflow-y-auto flex-1">
        <Surface
          variant="default"
          className="bg-foreground/3 dark:bg-black/50 p-6 border-y flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <TextField
              className="flex-1"
              name="companyName"
              type="text"
              variant="secondary"
              defaultValue={companyName}
              isRequired
              validate={(value) => {
                if (value.length < 2) {
                  return "Company name must be at least 2 characters";
                }

                return null;
              }}
            >
              <Label>New Company Name</Label>
              <Input placeholder="e.g. X Corp" className={inputClassName} />
              <FieldError />
            </TextField>

            <Select
              variant="secondary"
              isRequired
              name="industry"
              placeholder="Select one"
              className="flex-1 [&_[data-slot=select-value][data-placeholder=true]]:opacity-60"
              defaultValue={industry}
            >
              <Label>Industry / Category</Label>

              <Select.Trigger className={inputClassName}>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item
                    style={{ outline: "none", boxShadow: "none" }}
                    id="technology"
                    textValue="Technology"
                    className="rounded-lg focus:ring-indigo-500"
                  >
                    Technology
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item
                    style={{ outline: "none", boxShadow: "none" }}
                    id="healthcare"
                    textValue="Healthcare"
                    className="rounded-lg focus:ring-indigo-500"
                  >
                    Healthcare
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item
                    style={{ outline: "none", boxShadow: "none" }}
                    id="finance"
                    textValue="Finance"
                    className="rounded-lg focus:ring-indigo-500"
                  >
                    Finance
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item
                    style={{ outline: "none", boxShadow: "none" }}
                    id="marketing"
                    textValue="Marketing"
                    className="rounded-lg focus:ring-indigo-500"
                  >
                    Marketing
                    <ListBox.ItemIndicator />
                  </ListBox.Item>

                  <ListBox.Item
                    style={{ outline: "none", boxShadow: "none" }}
                    id="sales"
                    textValue="Sales"
                    className="rounded-lg focus:ring-indigo-500"
                  >
                    Sales
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <TextField
              isRequired
              className="w-full"
              name="url"
              type="url"
              variant="secondary"
              defaultValue={url}
              validate={(value) => {
                if (value && !value.startsWith("http")) {
                  return "URL must start with http:// or https://";
                }

                return null;
              }}
            >
              <Label>Website URL</Label>
              <Input
                placeholder="e.g. https://www.google.com/"
                className={inputClassName}
              />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              className="w-full"
              name="location"
              variant="secondary"
              defaultValue={location}
              validate={(value) => {
                if (value.length < 3) {
                  return "Location must be at least 3 characters";
                }

                return null;
              }}
            >
              <Label>Location</Label>
              <Input placeholder="City, Country" className={inputClassName} />
              <FieldError />
            </TextField>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <TextField
              isRequired
              className="flex-1"
              name="totalEmployees"
              variant="secondary"
              type="number"
              defaultValue={totalEmployees}
              validate={(value) => {
                if (value && value < 1) {
                  return "Total employees must be at least 1";
                }

                return null;
              }}
            >
              <Label>Total Employees</Label>
              <Input placeholder="Enter a number" className={inputClassName} />
              <FieldError />
            </TextField>

            <div className="flex-1">
              <Label>Company Logo</Label>

              <div className="mt-2">
                <ImageUpload
                  onImageUpload={setLogoUrl}
                  uploadText="Click to upload logo"
                />
              </div>
            </div>
          </div>

          <TextField
            isRequired
            className="w-full"
            name="description"
            variant="secondary"
            defaultValue={description}
            validate={(value) => {
              if (value.length < 20) {
                return "Description must be at least 20 characters";
              }

              return null;
            }}
          >
            <Label>Brief Description</Label>

            <TextArea
              aria-label="Quick project update"
              className={inputClassName}
              placeholder="Tell us about your company's mission and culture...."
              rows={5}
            />

            <FieldError />
          </TextField>
        </Surface>
      </Modal.Body>

      <Modal.Footer className="m-0 p-5">
        <Button
          type="button"
          variant="tertiary"
          className="rounded-lg bg-foreground/10 text-base sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 text-base sm:text-sm"
        >
          Update Company
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default RecruiterEditCompanyModal;
