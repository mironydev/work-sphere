"use server";

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
