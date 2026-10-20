import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
export default function NotFound() {
  const { user } = useAuth();
  return (
    <main className="error-page">
      <Leaf size={42} aria-hidden="true" />
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>This path leads off the estate.</h1>
      <p>The page you requested is unavailable.</p>
      <Link
        className="btn btn-primary"
        to={user ? "/admin/dashboard" : "/login"}
      >
        Return to {user ? "dashboard" : "sign in"}
      </Link>
    </main>
  );
}
