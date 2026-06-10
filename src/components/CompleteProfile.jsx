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

    const { error } = await updateUser({
      role: data.role,
    });

    setIsLoading(false);

    if (!error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="px-4">
      <div className="mt-36 max-w-sm mx-auto p-6 bg-background rounded-xl">
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
            className={"flex flex-col mt-1 mb-6 gap-0"}
          >
            <div className="flex items-center gap-5 mt-2">
              <Radio value="seeker">
                <Radio.Control className="border-2 border-gray-300 dark:border-gray-700 bg-indigo-600 dark:bg-indigo-500">
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>

              <Radio value="recruiter">
                <Radio.Control className="border-2 border-gray-300 dark:border-gray-700 bg-indigo-600 dark:bg-indigo-500">
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </div>

            <FieldError className={"mt-2"}>Please select a role</FieldError>
          </RadioGroup>

          <Button
            type="submit"
            isLoading={isLoading}
            className={"w-full rounded-xl bg-indigo-600"}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CompleteProfile;
