import { ShieldCheck } from "lucide-react";
import emblem from "../../assets/tealeaf-emblem.png";
export default function AuthFrame({
  title = "Admin & System Management Portal",
  children,
}) {
  return (
    <main className="auth-page">
      <section
        className="auth-card"
        aria-label="TeaLeaf administrator authentication"
      >
        <header className="auth-brand">
          <div className="auth-emblem">
            <img src={emblem} alt="TeaLeaf Field Scout" />
            <span />
          </div>
          <h1>
            <span>TeaLeaf</span> Field Scout
          </h1>
          <p>{title}</p>
        </header>
        {children}
        <footer className="auth-footer">
          <div className="connection-note">
            <span />
            Secure administrator workspace
          </div>
          <div className="compliance">
            <strong>
              <ShieldCheck size={15} aria-hidden="true" /> Sri Lanka Tea Board
              Agritech Infrastructure
            </strong>
            <p>
              Sri Lanka Tea Research Institute (TRI) Compliance Certified
              <br />
              Strict Role-Based Quarantine Protocols
            </p>
            <small>Member 01 · Admin Portal</small>
          </div>
        </footer>
      </section>
    </main>
  );
}
