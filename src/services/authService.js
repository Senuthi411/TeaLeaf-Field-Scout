import { appConfig } from "./config";
import * as apiAuth from "./api/auth";
const loadMock = import.meta.env.DEV ? () => import("./mock/auth") : null;
async function service() {
  if (appConfig.authMode === "mock") {
    if (!loadMock)
      throw new Error(
        "Mock authentication is disabled in production. Configure API authentication.",
      );
    return loadMock();
  }
  if (appConfig.authMode !== "api")
    throw new Error(
      "Invalid authentication mode. Use mock for development or api for backend integration.",
    );
  return apiAuth;
}
export const authService = {
  getSession: async () => (await service()).getSession(),
  login: async (credentials) => (await service()).login(credentials),
  logout: async () => (await service()).logout(),
  forgotPassword: async (email) => (await service()).forgotPassword(email),
};
