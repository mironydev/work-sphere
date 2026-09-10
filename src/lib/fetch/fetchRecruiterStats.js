import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

export const getRecruiterStats = async () => {
  const res = await fetch(`${url}/recruiter/dashboard`, {
      headers: await authHeader(),
    });
  return res.json();
};
