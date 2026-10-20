export default function ToggleSwitch({
  label,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <button
      type="button"
      role="switch"
      className={"toggle-switch " + (checked ? "checked" : "")}
      aria-label={label}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}
