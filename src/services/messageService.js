import { request } from "./api.js";

// The sender is never sent from the frontend.
// The backend reads it from the access_token cookie.
export function sendMessage({ receiver, content, isAnonymous, replyTo }) {
  const body = { receiver, content, isAnonymous };
  if (replyTo) body.replyTo = replyTo;
  return request("/messages", { method: "POST", body });
}

export function getMessages() {
  return request("/messages");
}
