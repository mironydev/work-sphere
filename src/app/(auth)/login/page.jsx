import LoginCard from "@/components/LoginCard";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const loginPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spinner color="current" size="xl" />
          </div>
        }
      >
        <LoginCard />
      </Suspense>
    </div>
  );
};

export default loginPage;
