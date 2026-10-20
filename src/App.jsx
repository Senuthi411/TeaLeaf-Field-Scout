import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import AdminWorkspace from "./features/admin/AdminWorkspace";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
export const adminPages = [
  "dashboard",
  "users",
  "roles",
  "estates",
  "divisions",
  "mapping",
  "features",
  "rules",
  "workflows",
  "audit",
  "settings",
];
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/recovery"
        element={<Navigate to="/forgot-password" replace />}
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        {adminPages.map((page) => (
          <Route
            key={page}
            path={"/admin/" + page}
            element={<AdminWorkspace />}
          />
        ))}
        <Route path="/admin/*" element={<NotFound />} />
      </Route>
      {adminPages.map((page) => (
        <Route
          key={page}
          path={"/" + page}
          element={<Navigate to={"/admin/" + page} replace />}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
