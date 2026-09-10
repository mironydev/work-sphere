"use client";

import { getSession, signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  Spinner,
  TextField,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const LoginCard = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const clearMessage = () => setMessage("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { error } = await signIn.email({
      email: user.email,
      password: user.password,
    });

    setIsLoading(false);

    if (!error) {
      toast.success("Login successful");
      if (redirect) {
        router.push(redirect);
        return;
      }

      const { data: session } = await getSession();
      const role = session?.user?.role;
      const accountType = session?.user?.accountType;

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (accountType === "recruiter") {
        router.push("/dashboard/recruiter");
      } else {
        router.push("/dashboard/seeker");
      }
    } else {
      setMessage(error.message);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);

    setTimeout(() => {
      setGoogleLoading(false);
    }, 3000);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="px-4 h-screen">
      <div className="mt-24 sm:mt-28 bg-white dark:bg-foreground/5 p-6 max-w-sm mx-auto rounded-xl border">
        <h2 className="text-center text-3xl font-semibold">Log In</h2>
        <p className="text-sm text-center opacity-60 pt-1.5 pb-5">
          Welcome back, continue your journey.
        </p>
        <Separator className="mb-5 dark:bg-foreground/15" />
        <Form className="flex mx-auto flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            name="email"
            type="email"
            onChange={clearMessage}
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              className="rounded-md focus:ring-1 focus:ring-indigo-500 aria-invalid:focus:ring-red-500 shadow-none border border-foreground/15 bg-foreground/2 dark:bg-black focus:bg-white dark:focus:bg-black placeholder:opacity-60"
            />
            <FieldError />
          </TextField>
          <TextField
            name="password"
            type={show ? "text" : "password"}
            onChange={clearMessage}
            validate={(value) => {
              if (!value) {
                return "Enter your password";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <div className="relative">
              <Input
                placeholder="Enter your password"
                className="w-full rounded-md focus:ring-1 focus:ring-indigo-500 aria-invalid:focus:ring-red-500 shadow-none border border-foreground/15 bg-foreground/2 dark:bg-black focus:bg-white dark:focus:bg-black placeholder:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-3 translate-y-1/2 opacity-50 hover:opacity-70 cursor-pointer"
              >
                {show ? (
                  <EyeSlash className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <FieldError />
          </TextField>
          {message && (
            <div className="text-red-500 dark:text-red-400 text-sm">
              {message}
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              className="rounded-md w-full bg-indigo-600 text-base mt-2"
              style={{ outline: "none", boxShadow: "none" }}
              isLoading={isLoading}
              isDisabled={isLoading || googleLoading}
            >
              {isLoading ? <Spinner color="current" /> : <>Log in</>}
            </Button>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="border w-1/2"></div>
            <div className="opacity-40 font-medium text-xs">OR</div>
            <div className="border w-1/2"></div>
          </div>
          <div
            onClick={loginWithGoogle}
            className="relative select-none bg-foreground/3 dark:bg-foreground/10 border rounded-md py-2 cursor-pointer"
          >
            <div className={googleLoading ? "opacity-20" : "opacity-100"}>
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.98em"
                  height="1em"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  ></path>
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                Log In with Google
              </div>
            </div>

            {googleLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner color="current" />
              </div>
            )}
          </div>
          <div className="text-sm mt-1 flex justify-center gap-1">
            <p>Don&apos;t have an account?</p>
            <Link
              href={!redirect ? "/signup" : `/signup?redirect=${redirect}`}
              className="cursor-pointer hover:underline active:underline"
            >
              Create one
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginCard;
