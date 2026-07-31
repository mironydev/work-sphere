"use server";

const url = process.env.SERVER_URL;

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
