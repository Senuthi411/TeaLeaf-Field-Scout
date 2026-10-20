import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, LoaderCircle, CheckCircle2 } from "lucide-react";
import AuthFrame from "./AuthFrame";
import { authService } from "../../services/authService";
import { isValidEmail } from "../../utils/validation";
import { appConfig } from "../../services/config";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    [sent, setSent] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (loading) return;
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await authService.forgotPassword(email.trim());
      setSent(true);
    } catch (failure) {
      setError(failure.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthFrame title="Account recovery">
      {sent ? (
        <div className="auth-form">
          <div className="alert alert-success" role="status">
            <CheckCircle2 size={21} />
            <span>
              If an account exists for that email, a password reset link has
              been requested.
            </span>
          </div>
          {appConfig.authMode === "mock" && (
            <p className="availability-note">
              Development preview: no email is sent.
            </p>
          )}
          <Link className="btn btn-primary sign-in" to="/login">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form className="auth-form" onSubmit={submit} noValidate>
          <p className="auth-help">
            Enter your work email to request a password reset.
          </p>
          {error && (
            <p className="alert alert-error" role="alert">
              {error}
            </p>
          )}
          <div className="form-field">
            <label htmlFor="recovery-email">Work email</label>
            <div className="input-with-icon">
              <Mail size={19} />
              <input
                id="recovery-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="admin@tealeaf.com"
                disabled={loading}
                required
                aria-invalid={Boolean(error)}
              />
            </div>
          </div>
          <button className="btn btn-primary sign-in" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="spin" size={18} />
                Requesting reset…
              </>
            ) : (
              "Send reset link"
            )}
          </button>
          <Link className="auth-back" to="/login">
            <ArrowLeft size={15} />
            Back to sign in
          </Link>
        </form>
      )}
    </AuthFrame>
  );
}
