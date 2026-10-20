// Development-only service. This module is excluded from production builds.
import { readJSON, writeJSON, removeStored } from "../../utils/storage";
const SESSION_KEY = "tealeaf:mock-auth:v1";
const DEMO_EMAIL = "admin@tealeaf.com";
const DEMO_PASSWORD = "Admin@12345";
const user = {
  id: "admin-01",
  name: "Kavinda Rajapaksha",
  email: DEMO_EMAIL,
  role: "Admin",
  title: "Lead System Administrator",
};
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function getSession() {
  const record =
    readJSON(SESSION_KEY, null, sessionStorage) ||
    readJSON(SESSION_KEY, null, localStorage);
  if (!record) return null;
  if (
    record.user?.id !== user.id ||
    record.user?.email !== DEMO_EMAIL ||
    record.user?.role !== "Admin" ||
    !Number.isFinite(record.expiresAt) ||
    record.expiresAt <= Date.now()
  ) {
    await logout();
    return null;
  }
  return { ...user };
}
export async function login({ email, password, rememberMe }) {
  await pause(450);
  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD)
    throw new Error("Incorrect email or password. Please try again.");
  await logout();
  const record = {
    user,
    expiresAt: Date.now() + (rememberMe ? 30 * 24 : 8) * 60 * 60 * 1000,
  };
  writeJSON(SESSION_KEY, record, rememberMe ? localStorage : sessionStorage);
  return { ...user };
}
export async function logout() {
  removeStored(SESSION_KEY, sessionStorage);
  removeStored(SESSION_KEY, localStorage);
}
export async function forgotPassword() {
  await pause(450);
  return {
    message:
      "If an account exists for that email, a password reset link has been requested.",
  };
}
