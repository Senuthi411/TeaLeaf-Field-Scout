import { apiRequest } from "./client";
import { appConfig } from "../config";
function authenticatedUser(data) {
  const user = data?.user;
  if (
    !user?.id ||
    !user?.email ||
    !["Admin", "admin", "System Admin"].includes(user.role)
  )
    throw new Error("The server did not return a valid administrator session.");
  return user;
}
export async function login(credentials) {
  return authenticatedUser(
    await apiRequest("/auth/login", { method: "POST", body: credentials }),
  );
}
export async function getSession() {
  if (!appConfig.apiBaseUrl) return null;
  try {
    return authenticatedUser(await apiRequest("/auth/session"));
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
}
export async function logout() {
  await apiRequest("/auth/logout", { method: "POST" });
}
export async function forgotPassword(email) {
  await apiRequest("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}
