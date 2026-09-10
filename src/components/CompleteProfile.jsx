"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Label,
  Radio,
  RadioGroup,
  FieldError,
  Separator,
} from "@heroui/react";
import { updateUser } from "@/lib/auth-client";

const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const accountType = data.role;

    const { error } = await updateUser({
      accountType,
      plan: accountType === "seeker" ? "seeker_starter" : "recruiter_starter",
    });

    setIsLoading(false);

    if (!error) {
      router.push(`/dashboard/${accountType}`);
    }
  };

  return (
    <div className="px-4">
      <div className="mt-36 max-w-sm mx-auto p-6 rounded-md bg-white dark:bg-black/30 dark:border border-foreground/15 shadow">
        <h2 className="text-2xl font-semibold text-center">
          Complete Your Profile
        </h2>
        <Separator className="my-5" />
        <Form onSubmit={onSubmit} className="flex flex-col gap- ">
          <Label>Select your role:</Label>
          <RadioGroup
            name="role"
            isRequired
            orientation="horizontal"
            className="flex flex-col mt-1 mb-6"
          >
            <div className="flex items-center gap-5 mt-2">
              <Radio value="seeker">
                <Radio.Content className="gap-2">
                  <Radio.Control
                    className="border-2 border-gray-300 dark:border-gray-700 bg-indigo-600 dark:bg-indigo-500 shadow-none"
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    <Radio.Indicator />
                  </Radio.Control>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>

              <Radio value="recruiter">
                <Radio.Content className="gap-2">
                  <Radio.Control
                    className="border-2 border-gray-300 dark:border-gray-700 bg-indigo-600 dark:bg-indigo-500 shadow-none"
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    <Radio.Indicator />
                  </Radio.Control>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </div>

            <FieldError className="mt-2">Please select a role</FieldError>
          </RadioGroup>

          <Button
            type="submit"
            isLoading={isLoading}
            className={"w-full rounded-sm bg-indigo-600"}
            style={{ outline: "none", boxShadow: "none" }}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CompleteProfile;
