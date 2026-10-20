const imgContainer = "/assets/1f927b49-c898-4f5a-bd24-5be100d24440.svg";
const imgContainer1 = "/assets/fd62caf0-530e-47bf-9cfd-dae3e2bb482a.svg";
export default function RoleActions() {
  return (
    <div
      className="tl-sticky-bottom-action-bar-with-pending-changes-alert-02e433f"
      data-node-id="106:2859"
      data-name="Sticky Bottom Action Bar with Pending Changes Alert"
    >
      <div
        className="tl-sticky-bottom-action-bar-with-pending-changes-alert-sha-57db2d3"
        data-node-id="106:2860"
        data-name="Sticky Bottom Action Bar with Pending Changes Alert:shadow"
      />
      <div
        className="tl-container-ad50363"
        data-node-id="106:2861"
        data-name="Container"
      >
        <div
          className="tl-overlay-33c595f"
          data-node-id="106:2862"
          data-name="Overlay"
        >
          <div
            className="tl-container-a08ed07"
            data-node-id="106:2863"
            data-name="Container"
          >
            <img
              alt=""
              className="tl-audit-element-8faf267"
              src={imgContainer}
            />
          </div>
          <div
            className="tl-container-709632b"
            data-node-id="106:2865"
            data-name="Container"
          >
            <div
              className="tl-roleactions-element-5321ef8"
              data-node-id="106:2866"
            >
              <p className="tl-audit-element-c22b989">2 unsaved permission</p>
              <p className="tl-audit-element-bf919b5">changes</p>
            </div>
          </div>
        </div>
        <a
          className="tl-container-04defe4"
          data-node-id="106:2867"
          data-name="Container"
        >
          <div
            className="tl-roleactions-element-e66d672"
            data-node-id="106:2868"
          >
            <p className="tl-audit-element-bf919b5">
              Changes stay as a draft until you sign and publish them.
            </p>
          </div>
        </a>
      </div>
      <div
        className="tl-container-ad50363"
        data-node-id="106:2869"
        data-name="Container"
      >
        <button
          type="button"
          className="tl-button-6e14887"
          data-node-id="106:2870"
          data-name="Button"
        >
          <div
            className="tl-roleactions-element-bb07d40"
            data-node-id="106:2871"
          >
            <p className="tl-audit-element-1bcf9b7">Reset to</p>
            <p className="tl-audit-element-efcc9af">Defaults</p>
          </div>
        </button>
        <button
          type="button"
          className="tl-button-d7c99b6"
          data-node-id="106:2872"
          data-name="Button"
        >
          <div
            className="tl-container-e933cd6"
            data-node-id="106:2873"
            data-name="Container"
          >
            <img
              alt=""
              className="tl-audit-element-8faf267"
              src={imgContainer1}
            />
          </div>
          <div
            className="tl-container-616ee1b"
            data-node-id="106:2875"
            data-name="Container"
          >
            <div
              className="tl-roleactions-element-531f5ab"
              data-node-id="106:2876"
            >
              <p className="tl-audit-element-1bcf9b7">{`Save & Publish`}</p>
              <p className="tl-audit-element-efcc9af">Permissions</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
