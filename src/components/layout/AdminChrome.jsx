import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function AdminChrome({ onClose, mobileOpen }) {
  const { logout } = useAuth(),
    navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false),
    [error, setError] = useState("");
  async function signOut(event) {
    event.stopPropagation();
    if (loggingOut) return;
    setLoggingOut(true);
    setError("");
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (failure) {
      setError(failure.message || "Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }
  return (
    <div className="admin-chrome" onClick={(event) => event.stopPropagation()}>
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={onClose}
        onLogout={signOut}
        loggingOut={loggingOut}
      />
      <Topbar error={error} />
    </div>
  );
}
