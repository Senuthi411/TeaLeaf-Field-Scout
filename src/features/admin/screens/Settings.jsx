import { useEffect, useState } from "react";
import { Save, CheckCircle2, Server, Database, Radio } from "lucide-react";
import {
  settingsService,
  defaultSettings,
} from "../../../services/settingsService";
import { appConfig } from "../../../services/config";
import { isValidEmail } from "../../../utils/validation";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import LoadingState from "../../../components/common/LoadingState";
function Row({ title, description, children }) {
  return (
    <div className="setting-row">
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings),
    [baseline, setBaseline] = useState(defaultSettings),
    [loading, setLoading] = useState(true),
    [saving, setSaving] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [tab, setTab] = useState("Security");
  const dirty = JSON.stringify(settings) !== JSON.stringify(baseline),
    tabs = [
      "Security",
      "Synchronisation",
      "Data retention",
      "Notifications",
      "Integrations",
    ];
  useEffect(() => {
    let current = true;
    settingsService
      .get()
      .then((value) => {
        if (current) {
          setSettings(value);
          setBaseline(value);
        }
      })
      .catch((failure) => {
        if (current) setError(failure.message);
      })
      .finally(() => {
        if (current) setLoading(false);
      });
    return () => {
      current = false;
    };
  }, []);
  const change = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setNotice("");
    setError("");
  };
  const number = (key, label, min, max, unit) => (
    <div className="setting-value">
      <input
        aria-label={label}
        type="number"
        min={min}
        max={max}
        required
        value={settings[key]}
        onChange={(event) =>
          change(
            key,
            event.target.value === "" ? "" : Number(event.target.value),
          )
        }
      />
      <span>{unit}</span>
    </div>
  );
  const toggle = (key, label) => (
    <ToggleSwitch
      label={label}
      checked={settings[key]}
      onChange={(value) => change(key, value)}
      disabled={saving}
    />
  );
  async function save(event) {
    event.preventDefault();
    if (saving || !dirty) return;
    for (const [key, min, max] of [
      ["sessionTimeout", 5, 240],
      ["pinLength", 4, 12],
      ["failedAttempts", 3, 10],
      ["syncInterval", 1, 60],
      ["photoRetention", 1, 120],
      ["auditRetention", 1, 10],
      ["deletedRetention", 1, 3650],
    ])
      if (
        !Number.isInteger(settings[key]) ||
        settings[key] < min ||
        settings[key] > max
      ) {
        setError(
          "Check the numeric settings. Values must be within the displayed limits.",
        );
        return;
      }
    if (settings.escalationEmail && !isValidEmail(settings.escalationEmail)) {
      setError("Enter a valid escalation email address.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const value = await settingsService.save(settings);
      setSettings(value);
      setBaseline(value);
      setNotice("Settings saved successfully.");
    } catch (failure) {
      setError(failure.message);
    } finally {
      setSaving(false);
    }
  }
  const authCard = (
    <section className="settings-card">
      <h2>Authentication & access</h2>
      <p>Controls how staff sign in to the admin console and mobile apps.</p>
      <Row
        title="Require MFA for all admin roles"
        description="Admins and Reviewers must verify with an authenticator or FIDO2 key."
      >
        {toggle("requireMfa", "Require MFA for all admin roles")}
      </Row>
      <Row
        title="Allow hardware security keys (FIDO2)"
        description="Enable passkey sign-in on supported workstations."
      >
        {toggle("allowFido", "Allow hardware security keys")}
      </Row>
      <Row
        title="Admin session timeout"
        description="Idle sessions sign out automatically."
      >
        {number("sessionTimeout", "Admin session timeout", 5, 240, "minutes")}
      </Row>
      <Row
        title="Field PIN length"
        description="Minimum digits for worker PINs."
      >
        {number("pinLength", "Field PIN length", 4, 12, "digits")}
      </Row>
      <Row
        title="Lock account after failed attempts"
        description="Temporarily locks after repeated wrong credentials."
      >
        {number(
          "failedAttempts",
          "Failed sign-in attempt limit",
          3,
          10,
          "attempts",
        )}
      </Row>
    </section>
  );
  const syncCard = (
    <section className="settings-card">
      <h2>Offline & synchronisation</h2>
      <p>Defaults for mobile devices operating without connectivity.</p>
      <Row
        title="Auto-sync interval"
        description="How often connected handhelds upload queued records."
      >
        {number("syncInterval", "Auto-sync interval", 1, 60, "minutes")}
      </Row>
      <Row
        title="Offline estate pack refresh"
        description="Refresh cached parcel boundaries on handsets."
      >
        <input
          aria-label="Offline estate pack refresh"
          type="time"
          required
          value={settings.packRefresh}
          onChange={(event) => change("packRefresh", event.target.value)}
        />
      </Row>
      <Row
        title="Conflict resolution default"
        description="Used when two edits collide on one record."
      >
        <select
          aria-label="Conflict resolution default"
          value={settings.conflictResolution}
          onChange={(event) => change("conflictResolution", event.target.value)}
        >
          <option>Prompt worker</option>
          <option>Newest record</option>
          <option>Manual review</option>
        </select>
      </Row>
      {tab === "Synchronisation" && (
        <Row
          title="Enable offline mode"
          description="Allow field observations to be queued on the device."
        >
          {toggle("offlineMode", "Enable offline mode")}
        </Row>
      )}
    </section>
  );
  const retentionCard = (
    <section className="settings-card">
      <h2>Data retention</h2>
      <p>How long records are kept.</p>
      <Row title="Observation photos">
        {number(
          "photoRetention",
          "Observation photo retention",
          1,
          120,
          "months",
        )}
      </Row>
      <Row title="Audit log">
        {number("auditRetention", "Audit log retention", 1, 10, "years")}
      </Row>
      <Row title="Deleted users">
        {number("deletedRetention", "Deleted user retention", 1, 3650, "days")}
      </Row>
    </section>
  );
  if (loading) return <LoadingState message="Loading settings…" />;
  return (
    <section
      className="settings-page"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="breadcrumb">
        Admin › Engine & Governance › <strong>System Settings</strong>
      </p>
      <div className="page-title-row">
        <div>
          <h1>System Settings</h1>
          <p className="page-description">
            Platform-wide security, sync and data-retention policy. Changes
            apply to all estates.
          </p>
        </div>
        <span className="context-pill">
          {dirty ? "Unsaved changes" : "Settings up to date"}
        </span>
      </div>
      <div
        className="settings-tabs"
        role="tablist"
        aria-label="Settings categories"
      >
        {tabs.map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={"tab-" + value.replaceAll(" ", "-")}
            aria-controls="settings-panel"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
          >
            {value}
          </button>
        ))}
      </div>
      {error && (
        <p className="alert alert-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="alert alert-success" role="status">
          <CheckCircle2 size={17} />
          {notice}
        </p>
      )}
      <form onSubmit={save} aria-label="System settings">
        <div
          className="settings-layout"
          id="settings-panel"
          role="tabpanel"
          aria-labelledby={"tab-" + tab.replaceAll(" ", "-")}
        >
          <div className="settings-main">
            {tab === "Security" && (
              <>
                {authCard}
                {syncCard}
              </>
            )}
            {tab === "Synchronisation" && syncCard}
            {tab === "Data retention" && retentionCard}
            {tab === "Notifications" && (
              <section className="settings-card">
                <h2>Notifications & escalation</h2>
                <p>Choose how administrators receive operational updates.</p>
                <Row title="Email notifications">
                  {toggle("emailNotifications", "Email notifications")}
                </Row>
                <Row title="Push notifications">
                  {toggle("pushNotifications", "Push notifications")}
                </Row>
                <Row
                  title="Escalation email"
                  description="Optional address for operational escalation."
                >
                  <input
                    type="email"
                    aria-label="Escalation email"
                    placeholder="operations@estate.lk"
                    value={settings.escalationEmail}
                    onChange={(event) =>
                      change("escalationEmail", event.target.value)
                    }
                  />
                </Row>
              </section>
            )}
            {tab === "Integrations" && (
              <section className="settings-card">
                <h2>Backend connection</h2>
                <p>Connection details are configured for this deployment.</p>
                <Row title="Authentication service">
                  <span className="context-pill">
                    {appConfig.isDevelopment && appConfig.authMode === "mock"
                      ? "Development mock"
                      : "REST API"}
                  </span>
                </Row>
                <Row title="API endpoint">
                  <span className="integration-value">
                    {appConfig.apiBaseUrl || "Not configured"}
                  </span>
                </Row>
                <Row title="Hardware security keys">
                  <span className="context-pill">
                    Backend integration required
                  </span>
                </Row>
                <p className="settings-note">
                  Production authentication uses server-managed sessions. No
                  production credentials are stored in the frontend.
                </p>
              </section>
            )}
          </div>
          <aside className="settings-secondary">
            {tab !== "Data retention" && retentionCard}
            <section className="settings-card">
              <h2>System health</h2>
              <p>
                {appConfig.isDevelopment && appConfig.authMode === "mock"
                  ? "Development environment"
                  : "Connection configuration"}
              </p>
              <Row title="API">
                <span className="status-badge">
                  {appConfig.authMode === "mock"
                    ? "Mock service"
                    : appConfig.apiBaseUrl
                      ? "Configured"
                      : "Not configured"}
                </span>
              </Row>
              <Row title="Sync workers">
                <span className="context-pill">Backend required</span>
              </Row>
              <Row title="Map tiles">
                <span className="context-pill">Design preview</span>
              </Row>
              <Row title="Backup">
                <span className="context-pill">Local demo storage</span>
              </Row>
            </section>
          </aside>
        </div>
        <div className="settings-actions">
          <button
            className="btn"
            type="button"
            disabled={!dirty || saving}
            onClick={() => {
              setSettings({ ...baseline });
              setError("");
              setNotice("Changes discarded.");
            }}
          >
            Discard changes
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!dirty || saving}
          >
            <Save size={16} />
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      </form>
    </section>
  );
}
