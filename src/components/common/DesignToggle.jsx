import { useState, useRef, useEffect } from "react";
import { readJSON, writeJSON } from "../../utils/storage";
export default function DesignToggle({
  id,
  initial = true,
  className = "",
  children,
  imageSrc,
}) {
  const [on, setOn] = useState(() => readJSON("tealeaf:toggle:" + id, initial));
  const ref = useRef(null);
  const [label, setLabel] = useState("Change setting");
  useEffect(() => {
    const button = ref.current;
    const next = button?.nextElementSibling;
    if (next && /^(On|Off)$/.test(next.textContent?.trim() || ""))
      next.textContent = on ? "On" : "Off";
    const capability = button
      ?.closest('[data-name^="Capability"]')
      ?.querySelector("p")?.textContent;
    const role = button?.parentElement?.dataset.name?.split(":")[0];
    const setting = button
      ?.closest('[data-name^="Row -"]')
      ?.dataset.name?.replace("Row - ", "");
    setLabel(
      capability ? capability + " · " + role : setting || "Change setting",
    );
  }, [on]);
  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={on}
      data-switch="true"
      className={"design-toggle " + className + (on ? " on" : " off")}
      onClick={() => {
        const value = !on;
        setOn(value);
        writeJSON("tealeaf:toggle:" + id, value);
      }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt="" style={{ display: "block" }} />
      ) : (
        children
      )}
    </button>
  );
}
