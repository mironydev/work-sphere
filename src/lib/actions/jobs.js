"use server";

import { revalidatePath } from "next/cache";
import { getUserToken } from "../session";
import { authorizationCodeRequest } from "better-auth";

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

export async function createCompany(newCompanyData) {
  const res = await fetch(`${url}/companies`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newCompanyData),
  });
  revalidatePath("/dashboard/recruiter/company");

  return res.json();
}

export async function deleteCompany(companyId) {
  const res = await fetch(`${url}/companies/${companyId}`, {
    method: "DELETE",
  });
  revalidatePath("/dashboard/recruiter/company");
  return res.json();
}

export async function deleteJob(jobId) {
  const res = await fetch(`${url}/jobs/${jobId}`, {
    method: "DELETE",
  });
  revalidatePath("/dashboard/recruiter/jobs");
  return res.json();
}

export async function editCompany(companyId, companyData) {
  const res = await fetch(`${url}/companies/${companyId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(companyData),
  });
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

export async function createSubscription(data) {
  const res = await fetch(`${url}/subscriptions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

export async function reviewCompany(companyId, companyData) {
  const res = await fetch(`${url}/admin/company/${companyId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(companyData),
  });
  revalidatePath("/dashboard/admin/companies");
  console.log("clicked");
  return res.json();
}

export async function updatePlan(userId, plan) {
  const res = await fetch(`${url}/plans?userId=${userId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify({ plan }),
  });
  revalidatePath("/dashboard/admin/users");
  return res.json();
}
