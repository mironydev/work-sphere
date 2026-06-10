"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

const AuthToast = () => {
  const { data: session } = useSession();
  const prevSession = useRef(null);
  const hasShownToast = useRef(false);

  useEffect(() => {
    const wasLoggedOut = !prevSession.current;
    const isLoggedIn = !!session;

    if (wasLoggedOut && isLoggedIn && !hasShownToast.current) {
      const intent = sessionStorage.getItem("authIntent");

      if (intent === "signup") {
        toast.success("Account created successfully");
      } else if (intent === "login") {
        toast.success("Login successful");
      }

      sessionStorage.removeItem("authIntent");
      hasShownToast.current = true;
    }

    if (!isLoggedIn) {
      hasShownToast.current = false;
    }

    prevSession.current = session;
  }, [session]);

  return null;
};

export default AuthToast;
