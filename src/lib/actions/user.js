"use server";

import { revalidatePath } from "next/cache";
import { authHeader } from "../authHeader";

const url = process.env.SERVER_URL;

export async function updateUserRole(userId, role) {
  const res = await fetch(`${url}/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify({ role }),
  });
  revalidatePath("/dashboard/admin/users");
  return res.json();
}
