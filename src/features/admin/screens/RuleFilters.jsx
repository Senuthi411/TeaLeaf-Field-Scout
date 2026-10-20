const imgIcon = "/assets/d7bbf7a1-c72d-4e82-91d8-857bce830d96.svg";
export default function RuleFilters() {
  return (
    <div
      className="tl-rule-repository-filter-control-strip-267cf4c"
      data-node-id="106:5944"
      data-name="Rule Repository Filter & Control Strip"
    >
      <div
        className="tl-container-38845e2"
        data-node-id="106:5945"
        data-name="Container"
      >
        <div
          className="tl-container-1634c14"
          data-node-id="106:5946"
          data-name="Container"
        >
          <input
            className="tl-input-effa649 native-input"
            data-node-id="106:5947"
            data-name="Input"
            aria-label="Search rules, keywords, actions..."
            type="text"
            placeholder="Search rules, keywords, actions..."
          />
          <div
            className="tl-container-1267c73"
            data-node-id="106:5950"
            data-name="Container"
          >
            <div
              className="tl-icon-862eeac"
              data-node-id="106:5951"
              data-name="Icon"
            >
              <img alt="" className="tl-audit-element-8faf267" src={imgIcon} />
            </div>
          </div>
        </div>
        <div
          className="tl-background-fc32661"
          data-node-id="106:5952"
          data-name="Background"
        >
          <button
            type="button"
            className="tl-button-333a1a3"
            data-node-id="106:5953"
            data-name="Button"
          >
            <div
              className="tl-dashboard-element-d54baca"
              data-node-id="106:5954"
            >
              <p className="tl-audit-element-85758d7">All Rules (14)</p>
            </div>
          </button>
          <button
            type="button"
            className="tl-button-eb8db8e"
            data-node-id="106:5955"
            data-name="Button"
          >
            <div
              className="tl-dashboard-element-442d873"
              data-node-id="106:5956"
            >
              <p className="tl-audit-element-85758d7">Severity (6)</p>
            </div>
          </button>
          <button
            type="button"
            className="tl-button-eb8db8e"
            data-node-id="106:5957"
            data-name="Button"
          >
            <div
              className="tl-dashboard-element-442d873"
              data-node-id="106:5958"
            >
              <p className="tl-audit-element-85758d7">Spatial GPS (4)</p>
            </div>
          </button>
          <button
            type="button"
            className="tl-button-eb8db8e"
            data-node-id="106:5959"
            data-name="Button"
          >
            <div
              className="tl-dashboard-element-442d873"
              data-node-id="106:5960"
            >
              <p className="tl-audit-element-85758d7">{`SLA & Sync (4)`}</p>
            </div>
          </button>
        </div>
      </div>
      <div
        className="tl-export-verification-action-buttons-9eae890"
        data-node-id="106:5961"
        data-name="Container"
      >
        <div
          className="tl-container-68b81fd"
          data-node-id="106:5962"
          data-name="Container"
        >
          <div className="tl-audit-element-303c570" data-node-id="106:5963">
            <p className="tl-audit-element-c22b989">Filter</p>
            <p className="tl-audit-element-bf919b5">Status:</p>
          </div>
        </div>
        <div
          className="tl-background-742e4b5"
          data-node-id="106:5964"
          data-name="Background"
        >
          <div
            className="tl-background-c829cc7"
            data-node-id="106:5965"
            data-name="Background"
          />
          <div
            className="tl-rulefilters-element-69a4e88"
            data-node-id="106:5966"
          >
            <p className="tl-audit-element-c22b989">12</p>
            <p className="tl-audit-element-bf919b5">Active</p>
          </div>
        </div>
        <div
          className="tl-background-9db21f2"
          data-node-id="106:5967"
          data-name="Background"
        >
          <div className="tl-features-element-eab2081" data-node-id="106:5968">
            <p className="tl-audit-element-c22b989">2</p>
            <p className="tl-audit-element-bf919b5">Paused</p>
          </div>
        </div>
      </div>
    </div>
  );
}
