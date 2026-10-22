// Each Figma screen is loaded when its route opens.
import { lazy } from "react";
export const screenViews = {
"dashboard": lazy(() => import("./views/dashboard")),
"users": lazy(() => import("./views/users")),
"user-detail": lazy(() => import("./views/user-detail")),
"create-user": lazy(() => import("./views/create-user")),
"edit-user": lazy(() => import("./views/edit-user")),
"roles": lazy(() => import("./views/roles")),
"scope": lazy(() => import("./views/scope")),
"estates": lazy(() => import("./views/estates")),
"estate-detail": lazy(() => import("./views/estate-detail")),
"divisions": lazy(() => import("./views/divisions")),
"division-detail": lazy(() => import("./views/division-detail")),
"sessions": lazy(() => import("./views/sessions")),
"profile": lazy(() => import("./views/profile")),
};