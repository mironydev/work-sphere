"use server";

import { revalidatePath } from "next/cache";
import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

export async function submitApplication(data) {
  const res = await fetch(`${url}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateApplicationStatus(applicationId, status) {
  const res = await fetch(`${url}/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify({ status }),
  });

  revalidatePath("/dashboard/recruiter/applications");

  return res.json();
}
