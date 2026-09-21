import { request } from "./api.js";

export function getUser(username) {
  return request("/users/" + encodeURIComponent(username));
}
