export async function getUserForMail(userName, userEmail) {
  const res = await fetch(`${process.env.SERVER_URL}/api/send-email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userName, userEmail }),
  });
  return res.json();
}
