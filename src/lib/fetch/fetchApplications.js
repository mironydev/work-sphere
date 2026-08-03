"use server";

const url = process.env.SERVER_URL;

export const getApplicationDetails = async (appicationId) => {
  const res = await fetch(`${url}/applications/${appicationId}`);
  return res.json();
};
