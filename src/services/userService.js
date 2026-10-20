import { appConfig } from "./config";
import * as apiUsers from "./api/users";
import * as mockUsers from "./mock/users";
export const userService =
  appConfig.isDevelopment && appConfig.authMode === "mock"
    ? mockUsers
    : apiUsers;
