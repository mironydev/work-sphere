"use client";

import { signIn } from "@/lib/auth-client";
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

const LoginCard = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
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
      setMessage("Login successful.");
      setIsSuccess(true);
      setTimeout(() => {
        router.push(redirect);
      }, 1000);
    } else {
      setMessage(error.message);
      setIsSuccess(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    sessionStorage.setItem("authIntent", "login");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      sessionStorage.removeItem("authIntent");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="px-4">
      <div className="mt-24 sm:mt-28 dark:border-2 bg-stone-100 dark:bg-black p-7 max-w-sm mx-auto rounded-xl">
        <h2 className="text-center text-3xl font-semibold">Log In</h2>
        <p className="text-sm text-center opacity-60 pt-1.5 pb-5">
          Welcome back, continue your journey.
        </p>
        <Separator className="mb-5" />
        <Form className="flex mx-auto flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
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
              className="rounded-md  focus:ring-indigo-500 aria-invalid:focus:ring-red-500"
            />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="password"
            type={show ? "text" : "password"}
            onChange={clearMessage}
            className="relative"
          >
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              className="rounded-md focus:ring-indigo-500 aria-invalid:focus:ring-red-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-8 opacity-70 hover:opacity-100 cursor-pointer"
            >
              {show ? (
                <EyeSlash className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            <FieldError />
          </TextField>
          {message && (
            <div
              className={`rounded-md px-4 py-1.5 border w-fit${
                isSuccess
                  ? "border dark:border-green-700 bg-green-600 dark:bg-green-950 text-white dark:text-green-200 text-sm w-fit mb-1"
                  : "border dark:border-red-700 bg-red-400 dark:bg-red-950 text-white dark:text-red-200 text-sm w-fit mb-1"
              }`}
            >
              {message}
            </div>
          )}
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              className="rounded-md w-25 bg-indigo-600"
              isLoading={isLoading}
              isDisabled={isLoading || googleLoading}
            >
              {isLoading ? <Spinner color="current" /> : <>Log in</>}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              className="rounded-md text-black dark:text-white"
              isDisabled={isLoading || googleLoading}
              onClick={clearMessage}
            >
              Clear
            </Button>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="border w-1/2"></div>
            <div className="opacity-40">OR</div>
            <div className="border w-1/2"></div>
          </div>
          <div
            onClick={loginWithGoogle}
            className="relative select-none bg-white border dark:border-0 dark:bg-gray-800 rounded-md py-2 cursor-pointer"
          >
            <div className={googleLoading ? "opacity-20" : "opacity-100"}>
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <g fill="none" fillRule="evenodd" clipRule="evenodd">
                    {" "}
                    <path
                      fill="#f44336"
                      d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86"
                      opacity={0.987}
                    ></path>{" "}
                    <path
                      fill="#ffc107"
                      d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92"
                      opacity={0.997}
                    ></path>{" "}
                    <path
                      fill="#448aff"
                      d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49"
                      opacity={0.999}
                    ></path>{" "}
                    <path
                      fill="#43a047"
                      d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z"
                      opacity={0.993}
                    ></path>{" "}
                  </g>{" "}
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
          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href={!redirect ? "/signup" : `/signup?redirect=${redirect}`}
              className="cursor-pointer underline hover:text-blue-700 active:text-blue-800 dark:hover:text-indigo-200 dark:active:text-indigo-300"
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
