// One place that knows how to talk to the backend.
// Every request sends cookies, because the JWT lives in an HttpOnly
// cookie (access_token) that JavaScript is not allowed to read.

export const API_URL = "https://honestly-app-backend.vercel.app";

export async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(API_URL + path, {
    method,
    credentials: "include", // send/receive the access_token cookie
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Some endpoints (like logout) may answer with an empty body.
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      "Request failed. Please try again.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}
