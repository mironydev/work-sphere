import { headers } from "next/headers";
import { auth } from "../auth";
import { authHeader } from "../actions/jobs";

const url = process.env.SERVER_URL;

export const getAllJobs = async (query) => {
  const res = await fetch(`${url}/jobs?${query}`);
  return res.json();
};

export const getRecruiterJobs = async () => {
  const res = await fetch(`${url}/recruiter/jobs`, {
    headers: await authHeader(),
  });
  return res.json();
};

export const getCompanies = async () => {
  const res = await fetch(`${url}/companies`);
  return res.json();
};

export const getMyCompanies = async () => {
  const res = await fetch(`${url}/mycompanies`, {
    headers: await authHeader(),
  });
  return res.json();
};

export const getCompanyDetails = async (companyId) => {
  const res = await fetch(`${url}/companies/${companyId}`);
  return res.json();
};

export const getJobDetails = async (jobId) => {
  const res = await fetch(`${url}/jobs/${jobId}`);
  return res.json();
};

export const getApplications = async (userId) => {
  const res = await fetch(`${url}/applications?userId=${userId}`);
  return res.json();
};

export const getPlans = async (planName) => {
  const res = await fetch(`${url}/plans?planName=${planName}`);
  return res.json();
};

export const listAllUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    headers: await headers(),
  });
  return users;
};
