import { headers } from "next/headers";
import { auth } from "../auth";
import { authHeader } from "../actions/jobs";

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

export const getCompanies = async (userid = null) => {
  let res;
  if (userid) {
    res = await fetch(`${url}/companies`, {
      headers: { userid },
    });
  } else {
    res = await fetch(`${url}/companies`, {
      headers: await authHeader(),
    });
  }
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
