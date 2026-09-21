import { request } from "./api.js";

export function register({ name, username, email, password }) {
  return request("/auth/register", {
    method: "POST",
    body: { name, username, email, password },
  });
}

export function verifyOtp({ email, otp }) {
  return request("/auth/verify-otp", { method: "POST", body: { email, otp } });
}

export function login({ email, password }) {
  return request("/auth/login", { method: "POST", body: { email, password } });
}

export function logout() {
  return request("/auth/logout", { method: "POST" });
}

export function forgotPassword({ email }) {
  return request("/auth/forgot-password", { method: "POST", body: { email } });
}

export function resetPassword({ email, otp, newPassword }) {
  return request("/auth/reset-password", {
    method: "POST",
    body: { email, otp, newPassword },
  });
}
