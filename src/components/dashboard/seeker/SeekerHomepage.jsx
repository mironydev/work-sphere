"use client";

import { useSessionClient } from "@/lib/helpers";
import { Spinner } from "@heroui/react";

const SeekerHomepage = () => {
  const { isPending } = useSessionClient();
  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10 md:mt-16">
        <Spinner color="current" size="xl" />
      </div>
    );
  }
  return <div>homepage client seeker</div>;
};

export default SeekerHomepage;
