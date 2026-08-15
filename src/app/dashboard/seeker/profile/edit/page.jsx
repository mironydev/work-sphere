import SeekerAdditional from "@/components/dashboard/seeker/seekerProfile/edit/Additional";
import SeekerProfile from "@/components/dashboard/seeker/seekerProfile/edit/Profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const EditProfilePage = async () => {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <div className="flex flex-col gap-5 max-w-3xl">
        <SeekerProfile user={user} />
        <SeekerAdditional user={user} />
      </div>
    </div>
  );
};

export default EditProfilePage;
