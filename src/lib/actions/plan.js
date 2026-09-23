"use server";

import { revalidatePath } from "next/cache";
import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

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

export async function downgradePlan(planName) {
  const res = await fetch(`${url}/downgrade`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify({ planName }),
  });
  revalidatePath("/pricing");
  return res.json();
}
