import { headers } from "next/headers";
import { auth } from "../auth";

const url = process.env.SERVER_URL;

export const getAllJobs = async () => {
  const res = await fetch(`${url}/jobs`);
  return res.json();
};

export const getRecruiterJobs = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userid = session?.user?.id;
  const res = await fetch(`${url}/recruiter/jobs`, {
    headers: { userid },
  });
  return res.json();
};

export const getAllCompanies = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userid = session?.user?.id;
  const res = await fetch(`${url}/companies`, {
    headers: { userid },
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
