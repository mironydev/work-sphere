import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

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
