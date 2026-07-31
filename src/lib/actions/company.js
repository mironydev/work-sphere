"use server";

import { revalidatePath } from "next/cache";
import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

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
  return res.json();
}
