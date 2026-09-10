"use server";

import { revalidatePath } from "next/cache";
import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

export async function createJob(newJobData) {
  const res = await fetch(`${url}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });
  return res.json();
}

export async function deleteJob(jobId) {
  const res = await fetch(`${url}/jobs/${jobId}`, {
    method: "DELETE",
  });
  revalidatePath("/dashboard/recruiter/jobs");
  return res.json();
}

export async function editJob(jobId, jobData) {
  const res = await fetch(`${url}/jobs/${jobId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return res.json();
}

export async function saveJob(data) {
  const res = await fetch(`${url}/savedjobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidatePath("/jobs");
  return res.json();
}

export async function removeSavedJob(data) {
  const res = await fetch(`${url}/savedjobs`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidatePath("/jobs");
  return res.json();
}

export async function toggleJobActive(jobId, isActive) {
  const res = await fetch(`${url}/jobs/${jobId}/active`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify({ isActive }),
  });
  revalidatePath("/dashboard/recruiter/jobs");
  return res.json();
}
