import SignUpCard from "@/components/SignUpCard";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const SignUpPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spinner color="current" size="xl" />
          </div>
        }
      >
        <SignUpCard />
      </Suspense>
    </div>
  );
};

export default SignUpPage;
