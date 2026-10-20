import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  AlertCircle,
  Check,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { appConfig } from "../../services/config";
import { validateLogin, passwordRules } from "../../utils/validation";
import AuthFrame from "./AuthFrame";
import LoadingState from "../../components/common/LoadingState";
export default function LoginPage() {
  const { user, initializing, login, sessionError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);
  if (initializing) return <LoadingState message="Checking your session…" />;
  if (user) return <Navigate to="/admin/dashboard" replace />;
  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
    setErrors((current) => ({ ...current, [name]: "" }));
  }
  async function submit(event) {
    event.preventDefault();
    if (loading) return;
    const next = validateLogin(form);
    setErrors(next);
    setShowRules(Boolean(next.password));
    if (Object.keys(next).length) {
      document.getElementById(next.email ? "email" : "password")?.focus();
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/admin/dashboard", { replace: true });
    } catch (failure) {
      setError(failure.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthFrame>
      <form
        className="auth-form"
        onSubmit={submit}
        noValidate
        aria-label="Administrator sign in"
      >
        {(error || sessionError) && (
          <div className="alert alert-error" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            <span>{error || sessionError}</span>
          </div>
        )}
        <div className="form-field">
          <label htmlFor="email">Work Identity / Email</label>
          <div className="input-with-icon">
            <Mail size={19} aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="admin@tealeaf.com"
              value={form.email}
              onChange={update}
              disabled={loading}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
          </div>
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="form-field">
          <div className="field-label-row">
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="input-with-icon">
            <LockKeyhole size={19} aria-hidden="true" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={update}
              onFocus={() => setShowRules(true)}
              disabled={loading}
              aria-invalid={Boolean(errors.password)}
              aria-describedby="password-requirements password-error"
              required
            />
            <button
              type="button"
              className="password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((value) => !value)}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="field-error">
              {errors.password}
            </p>
          )}
          <ul
            id="password-requirements"
            className={"password-rules " + (showRules ? "" : "visually-hidden")}
          >
            {passwordRules.map((rule) => (
              <li
                key={rule.id}
                className={rule.test(form.password) ? "met" : ""}
              >
                {rule.test(form.password) ? (
                  <Check size={13} aria-hidden="true" />
                ) : (
                  <Circle size={11} aria-hidden="true" />
                )}
                {rule.label}
              </li>
            ))}
          </ul>
        </div>
        <label className="remember-me">
          <input
            name="rememberMe"
            type="checkbox"
            checked={form.rememberMe}
            onChange={update}
            disabled={loading}
          />
          Remember me for 30 days
        </label>
        <button
          type="submit"
          className="btn btn-primary sign-in"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            <>
              Sign In to Admin Console
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
        <div className="auth-divider">
          <span>OR</span>
        </div>
        <button
          type="button"
          className="btn security-key"
          disabled
          aria-describedby="fido-note"
        >
          <KeyRound size={21} aria-hidden="true" />
          Use a hardware security key (FIDO2)
        </button>
        <p id="fido-note" className="availability-note">
          Unavailable until backend integration
        </p>
        {appConfig.isDevelopment && appConfig.authMode === "mock" && (
          <p className="development-note">
            Development mock sign-in · use the demo account in README.
          </p>
        )}
      </form>
    </AuthFrame>
  );
}
