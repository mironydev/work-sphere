"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const AuthToast = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localStorage.getItem("loginSuccess") === "true") {
        toast.success("Login successful");
        localStorage.removeItem("loginSuccess");
      }

      if (localStorage.getItem("signupSuccess") === "true") {
        toast.success("Account created successfully");
        localStorage.removeItem("signupSuccess");
      }

      if (localStorage.getItem("authError") === "login") {
        toast.error("Login failed. Please try again.");
        localStorage.removeItem("authError");
      }

      if (localStorage.getItem("authError") === "signup") {
        toast.error("Signup failed. Please try again.");
        localStorage.removeItem("authError");
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default AuthToast;
