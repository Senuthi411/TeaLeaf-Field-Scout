import { apiRequest } from "./client";
export async function listUsers() {
  const data = await apiRequest("/users");
  if (!Array.isArray(data?.users))
    throw new Error("The server returned an invalid user list.");
  return data.users;
}
export async function saveUser(user) {
  const data = await apiRequest(
    user.id ? "/users/" + encodeURIComponent(user.id) : "/users",
    { method: user.id ? "PATCH" : "POST", body: user },
  );
  return data.user;
}
export async function deleteUser(id) {
  return apiRequest("/users/" + encodeURIComponent(id), { method: "DELETE" });
}
export async function importUsers(users) {
  return apiRequest("/users/import", { method: "POST", body: { users } });
}
export async function requestReset(id) {
  return apiRequest("/users/" + encodeURIComponent(id) + "/reset-password", {
    method: "POST",
  });
}
