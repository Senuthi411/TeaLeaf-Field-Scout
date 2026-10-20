const imgContainer = "/assets/5bd6e137-eb24-4d52-88dc-7d1d1f4ab7d7.svg";
const imgContainer1 = "/assets/a113547e-4e17-43ed-bac7-999ed56c8c60.svg";
const imgContainer2 = "/assets/0d40cb5f-ed42-4ca9-b3f8-efc7df67a26a.svg";
const imgContainer3 = "/assets/53cb3109-48dc-4c1b-aeaf-1edcb122727e.svg";
const imgContainer4 = "/assets/0f7c37b0-d322-4125-b82c-6a45c07f8cca.svg";
const imgContainer5 = "/assets/aa8a6caf-01aa-4337-a0a9-d544e88de064.svg";
const imgContainer6 = "/assets/618f709d-4045-4a36-8c32-00d497f495c8.svg";
const imgContainer7 = "/assets/c2119799-5652-4caf-a8f1-d9777044e08a.svg";
const imgVector = "/assets/d304e3e0-c95b-4065-90ac-2071471556cd.svg";
const imgVector1 = "/assets/88bd9021-2e96-4b39-b6d4-294dacbff373.svg";
const imgVector2 = "/assets/c0157dfe-dc11-4365-9ceb-7459cf02de78.svg";
const imgVector3 = "/assets/56380cd2-32ed-4cae-acf5-2423e8ccda24.svg";
const imgVector4 = "/assets/b3905648-c7fd-4224-912c-3bbf5fe5cf53.svg";
const imgVector5 = "/assets/319dd6a8-b367-4a7f-93da-a06b5649ad51.svg";
const imgVector6 = "/assets/ad382c32-86f2-4d68-a5c1-68dc369482e4.svg";
export default function RuleBuilder() {
  return (
    <div
      className="tl-interactive-visual-logic-builder-workbench-embedded-can-cb99bc9"
      data-node-id="106:5792"
      data-name="Interactive Visual Logic Builder Workbench (Embedded Canvas)"
    >
      <div
        className="tl-workbench-header-3e51be2"
        data-node-id="106:5793"
        data-name="Workbench Header"
      >
        <div
          className="tl-container-ad50363"
          data-node-id="106:5794"
          data-name="Container"
        >
          <div
            className="tl-background-d29244f"
            data-node-id="106:5795"
            data-name="Background"
          >
            <div
              className="tl-container-24926b3"
              data-node-id="106:5796"
              data-name="Container"
            >
              <img
                alt=""
                className="tl-audit-element-8faf267"
                src={imgContainer}
              />
            </div>
            <div
              className="tl-container-39ca032"
              data-node-id="106:5798"
              data-name="Container"
            >
              <div
                className="tl-rulebuilder-element-f4672c9"
                data-node-id="106:5799"
              >
                <p className="tl-audit-element-bf919b5">
                  RULE COMPOSER: LIVE PREVIEW
                </p>
              </div>
            </div>
          </div>
          <div
            className="tl-container-39ca032"
            data-node-id="106:5800"
            data-name="Container"
          >
            <div className="tl-audit-element-c26cc5c" data-node-id="106:5801">
              <p className="tl-audit-element-bf919b5">{`Pathology Quarantine & Harvest Lockdown Protocol`}</p>
            </div>
          </div>
        </div>
        <div
          className="tl-export-verification-action-buttons-9eae890"
          data-node-id="106:5802"
          data-name="Container"
        >
          <div
            className="tl-container-39ca032"
            data-node-id="106:5803"
            data-name="Container"
          >
            <div className="tl-audit-element-47cfcc2" data-node-id="106:5804">
              <p className="tl-audit-element-bf919b5">
                EXEC_POLICY: ATOMIC_REALTIME
              </p>
            </div>
          </div>
          <button
            type="button"
            className="tl-button-2fd014f"
            data-node-id="106:5805"
            data-name="Button"
          >
            <div
              className="tl-container-b784803"
              data-node-id="106:5806"
              data-name="Container"
            >
              <img
                alt=""
                className="tl-audit-element-8faf267"
                src={imgContainer1}
              />
            </div>
          </button>
        </div>
      </div>
      <div
        className="scroll-region"
        role="region"
        aria-label="Rule Graph Body"
        tabIndex={0}
      >
        <div
          className="tl-rule-graph-body-86cbdfb"
          data-node-id="106:5808"
          data-name="Rule Graph Body"
        >
          <div
            className="tl-query-clause-left-7-cols-1dbce5e"
            data-node-id="106:5809"
            data-name="Query Clause (Left 7 Cols)"
          >
            <div
              className="tl-container-4c62e33"
              data-node-id="106:5810"
              data-name="IF Statement Node"
            >
              <div
                className="tl-container-df264a6"
                data-node-id="106:5811"
                data-name="Container"
              >
                <div
                  className="tl-background-8eeada7"
                  data-node-id="106:5812"
                  data-name="Background"
                >
                  <div
                    className="tl-rulebuilder-element-a40de78"
                    data-node-id="106:5813"
                  >
                    <p className="tl-audit-element-bf919b5">
                      IF (TRIGGER CONDITION)
                    </p>
                  </div>
                </div>
                <div
                  className="tl-container-39ca032"
                  data-node-id="106:5814"
                  data-name="Container"
                >
                  <div
                    className="tl-rulebuilder-element-0e87c21"
                    data-node-id="106:5815"
                  >
                    <p className="tl-audit-element-bf919b5">
                      Match any observation ingest packet meeting:
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="tl-background-7278afa"
                data-node-id="106:5816"
                data-name="Background"
              >
                <div
                  className="tl-container-fc2bbc1"
                  data-node-id="106:5817"
                  data-name="Condition Row 1"
                >
                  <div
                    className="tl-background-shadow-629c351"
                    data-node-id="106:5818"
                    data-name="Background+Shadow"
                  >
                    <div
                      className="tl-container-39ca032"
                      data-node-id="106:5819"
                      data-name="Container"
                    >
                      <div
                        className="tl-dashboard-element-e30a83f"
                        data-node-id="106:5820"
                      >
                        <p className="tl-audit-element-bf919b5">entity:</p>
                      </div>
                    </div>
                    <div
                      className="tl-container-39ca032"
                      data-node-id="106:5821"
                      data-name="Container"
                    >
                      <div
                        className="tl-estates-element-8fea385"
                        data-node-id="106:5822"
                      >
                        <p className="tl-audit-element-bf919b5">
                          Disease Pathology
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tl-background-shadow-cf7fc48"
                    data-node-id="106:5823"
                    data-name="Background+Shadow"
                  >
                    <div
                      className="tl-rulebuilder-element-7bd817c"
                      data-node-id="106:5824"
                    >
                      <p className="tl-audit-element-bf919b5">EQUALS</p>
                    </div>
                  </div>
                  <div
                    className="tl-background-shadow-3a5e959"
                    data-node-id="106:5825"
                    data-name="Background+Shadow"
                  >
                    <div
                      className="tl-background-32dd705"
                      data-node-id="106:5826"
                      data-name="Background"
                    />
                    <div
                      className="tl-container-39ca032"
                      data-node-id="106:5827"
                      data-name="Container"
                    >
                      <div
                        className="tl-rulebuilder-element-c1f9007"
                        data-node-id="106:5828"
                      >
                        <p className="tl-audit-element-bf919b5">
                          High OR Critical
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tl-button-margin-749465a"
                    data-node-id="106:5829"
                    data-name="Button:margin"
                  >
                    <button
                      type="button"
                      className="tl-button-2fd014f"
                      data-node-id="106:5830"
                      data-name="Button"
                    >
                      <div
                        className="tl-container-0082061"
                        data-node-id="106:5831"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="tl-audit-element-8faf267"
                          src={imgContainer2}
                        />
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  className="tl-logical-conjunction-divider-1e5c7d4"
                  data-node-id="106:5833"
                  data-name="Logical Conjunction Divider"
                >
                  <div
                    className="tl-background-e332a20"
                    data-node-id="106:5834"
                    data-name="Background"
                  >
                    <div
                      className="tl-rulebuilder-element-7bd817c"
                      data-node-id="106:5835"
                    >
                      <p className="tl-audit-element-bf919b5">AND</p>
                    </div>
                  </div>
                  <div
                    className="tl-horizontal-divider-73f047e"
                    data-node-id="106:5836"
                    data-name="Horizontal Divider"
                  />
                </div>
                <div
                  className="tl-condition-row-2-50882da"
                  data-node-id="106:5837"
                  data-name="Condition Row 2"
                >
                  <div
                    className="tl-background-shadow-ea77b33"
                    data-node-id="106:5838"
                    data-name="Background+Shadow"
                  >
                    <div
                      className="tl-container-39ca032"
                      data-node-id="106:5839"
                      data-name="Container"
                    >
                      <div
                        className="tl-dashboard-element-e30a83f"
                        data-node-id="106:5840"
                      >
                        <p className="tl-audit-element-bf919b5">spatial:</p>
                      </div>
                    </div>
                    <div
                      className="tl-container-39ca032"
                      data-node-id="106:5841"
                      data-name="Container"
                    >
                      <div
                        className="tl-rulebuilder-element-d9603c4"
                        data-node-id="106:5842"
                      >
                        <p className="tl-audit-element-bf919b5">
                          Target Division
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tl-background-shadow-797eab3"
                    data-node-id="106:5843"
                    data-name="Background+Shadow"
                  >
                    <div
                      className="tl-rulebuilder-element-7bd817c"
                      data-node-id="106:5844"
                    >
                      <p className="tl-audit-element-bf919b5">IN LIST</p>
                    </div>
                  </div>
                  <div
                    className="tl-container-6d758f3"
                    data-node-id="106:5845"
                    data-name="Container"
                  >
                    <div
                      className="tl-background-shadow-3025b50"
                      data-node-id="106:5846"
                      data-name="Background+Shadow"
                    >
                      <div
                        className="tl-container-5842660"
                        data-node-id="106:5847"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="tl-audit-element-8faf267"
                          src={imgContainer3}
                        />
                      </div>
                      <div
                        className="tl-estates-element-7f36f56"
                        data-node-id="106:5849"
                      >
                        <p className="tl-audit-element-bf919b5">Pedro Estate</p>
                      </div>
                    </div>
                    <div
                      className="tl-background-shadow-0ede11e"
                      data-node-id="106:5850"
                      data-name="Background+Shadow"
                    >
                      <div
                        className="tl-container-5842660"
                        data-node-id="106:5851"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="tl-audit-element-8faf267"
                          src={imgContainer3}
                        />
                      </div>
                      <div
                        className="tl-estates-element-7f36f56"
                        data-node-id="106:5853"
                      >
                        <p className="tl-audit-element-bf919b5">
                          Labookellie High-Ridge
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tl-button-margin-ad42537"
                    data-node-id="106:5854"
                    data-name="Button:margin"
                  >
                    <button
                      type="button"
                      className="tl-button-2fd014f"
                      data-node-id="106:5855"
                      data-name="Button"
                    >
                      <div
                        className="tl-container-0082061"
                        data-node-id="106:5856"
                        data-name="Container"
                      >
                        <img
                          alt=""
                          className="tl-audit-element-8faf267"
                          src={imgContainer2}
                        />
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  className="tl-margin-6f61d99"
                  data-node-id="106:5858"
                  data-name="Add Condition CTA"
                >
                  <button
                    type="button"
                    className="tl-button-5258188"
                    data-node-id="106:5859"
                    data-name="Button"
                  >
                    <div
                      className="tl-container-c74d3ef"
                      data-node-id="106:5860"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="tl-audit-element-8faf267"
                        src={imgContainer4}
                      />
                    </div>
                    <div
                      className="tl-container-9021357"
                      data-node-id="106:5862"
                      data-name="Container"
                    >
                      <div
                        className="tl-estates-element-3b32c48"
                        data-node-id="106:5863"
                      >
                        <p className="tl-audit-element-85758d7">
                          + Add Condition Clause
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div
              className="tl-margin-0c5598c"
              data-node-id="106:5864"
              data-name="THEN Action Node:margin"
            >
              <div
                className="tl-container-4c62e33"
                data-node-id="106:5865"
                data-name="THEN Action Node"
              >
                <div
                  className="tl-container-df264a6"
                  data-node-id="106:5866"
                  data-name="Container"
                >
                  <div
                    className="tl-background-52cae60"
                    data-node-id="106:5867"
                    data-name="Background"
                  >
                    <div
                      className="tl-rulebuilder-element-94fbe6d"
                      data-node-id="106:5868"
                    >
                      <p className="tl-audit-element-bf919b5">
                        THEN (DISPATCH DIRECTIVES)
                      </p>
                    </div>
                  </div>
                  <div
                    className="tl-container-39ca032"
                    data-node-id="106:5869"
                    data-name="Container"
                  >
                    <div
                      className="tl-rulebuilder-element-0e87c21"
                      data-node-id="106:5870"
                    >
                      <p className="tl-audit-element-bf919b5">
                        Execute parallel downstream operations:
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tl-container-62f39da"
                  data-node-id="106:5871"
                  data-name="Container"
                >
                  <div
                    className="tl-action-row-1-7079354"
                    data-node-id="106:5872"
                    data-name="Action Row 1"
                  >
                    <div
                      className="tl-container-ad50363"
                      data-node-id="106:5873"
                      data-name="Container"
                    >
                      <div
                        className="tl-background-e90f736"
                        data-node-id="106:5874"
                        data-name="Background"
                      >
                        <div
                          className="tl-container-b784803"
                          data-node-id="106:5875"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="tl-audit-element-8faf267"
                            src={imgContainer5}
                          />
                        </div>
                      </div>
                      <div
                        className="tl-container-39ca032"
                        data-node-id="106:5877"
                        data-name="Container"
                      >
                        <div
                          className="tl-heading-1-153c0a1"
                          data-node-id="106:5878"
                          data-name="Container"
                        >
                          <div
                            className="tl-audit-element-c26cc5c"
                            data-node-id="106:5879"
                          >
                            <p className="tl-audit-element-bf919b5">{`Immediate SMS & Push Gateway Dispatch`}</p>
                          </div>
                        </div>
                        <div
                          className="tl-heading-1-153c0a1"
                          data-node-id="106:5880"
                          data-name="Container"
                        >
                          <div
                            className="tl-audit-element-303c570"
                            data-node-id="106:5881"
                          >
                            <p className="tl-audit-element-bf919b5">{`Notify Nuwara Eliya Field Director & Pedro Sector Head`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tl-background-0e9fb2f"
                      data-node-id="106:5882"
                      data-name="Background"
                    >
                      <div
                        className="tl-estates-element-7f36f56"
                        data-node-id="106:5883"
                      >
                        <p className="tl-audit-element-bf919b5">P1-URGENT</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tl-action-row-2-675ae23"
                    data-node-id="106:5884"
                    data-name="Action Row 2"
                  >
                    <div
                      className="tl-container-ad50363"
                      data-node-id="106:5885"
                      data-name="Container"
                    >
                      <div
                        className="tl-background-f039150"
                        data-node-id="106:5886"
                        data-name="Background"
                      >
                        <div
                          className="tl-icon-c97c8fe"
                          data-node-id="106:5887"
                          data-name="Container"
                        >
                          <img
                            alt=""
                            className="tl-audit-element-8faf267"
                            src={imgContainer6}
                          />
                        </div>
                      </div>
                      <div
                        className="tl-container-39ca032"
                        data-node-id="106:5889"
                        data-name="Container"
                      >
                        <div
                          className="tl-heading-1-153c0a1"
                          data-node-id="106:5890"
                          data-name="Container"
                        >
                          <div
                            className="tl-audit-element-c26cc5c"
                            data-node-id="106:5891"
                          >
                            <p className="tl-audit-element-bf919b5">
                              Auto-Generate Rapid Field Verification Ticket
                            </p>
                          </div>
                        </div>
                        <div
                          className="tl-heading-1-153c0a1"
                          data-node-id="106:5892"
                          data-name="Container"
                        >
                          <div
                            className="tl-audit-element-4cf404b"
                            data-node-id="106:5893"
                          >
                            <p className="tl-audit-element-bf919b5">
                              Goes to the agronomist queue and must be reviewed
                              within 24 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tl-background-0e9fb2f"
                      data-node-id="106:5894"
                      data-name="Background"
                    >
                      <div
                        className="tl-estates-element-8fea385"
                        data-node-id="106:5895"
                      >
                        <p className="tl-audit-element-bf919b5">QUEUE_ASSIGN</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="tl-button-add-action-cta-fa35fde"
                    data-node-id="106:5896"
                    data-name="Button - Add Action CTA"
                  >
                    <div
                      className="tl-container-1609a91"
                      data-node-id="106:5897"
                      data-name="Container"
                    >
                      <img
                        alt=""
                        className="tl-audit-element-8faf267"
                        src={imgContainer7}
                      />
                    </div>
                    <div
                      className="tl-container-9021357"
                      data-node-id="106:5899"
                      data-name="Container"
                    >
                      <div
                        className="tl-rulebuilder-element-8def8a5"
                        data-node-id="106:5900"
                      >
                        <p className="tl-audit-element-85758d7">
                          + Add Automated Action
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tl-execution-diagram-spatial-scope-right-5-cols-31f763a"
            data-node-id="106:5901"
            data-name="Execution Diagram & Spatial Scope (Right 5 Cols)"
          >
            <div
              className="tl-container-24081ce"
              data-node-id="106:5902"
              data-name="Container"
            >
              <div
                className="tl-page-header-action-bar-c96fe10"
                data-node-id="106:5903"
                data-name="Container"
              >
                <div
                  className="tl-container-8b55e52"
                  data-node-id="106:5904"
                  data-name="Container"
                >
                  <div
                    className="tl-rulebuilder-element-00e1368"
                    data-node-id="106:5905"
                  >
                    <p className="tl-audit-element-c22b989">
                      SIMULATED SPATIAL BOUNDARY
                    </p>
                    <p className="tl-audit-element-bf919b5">SCOPE</p>
                  </div>
                </div>
                <div
                  className="tl-background-ca28d21"
                  data-node-id="106:5906"
                  data-name="Background"
                >
                  <div
                    className="tl-rulebuilder-element-9afb04c"
                    data-node-id="106:5907"
                  >
                    <p className="tl-audit-element-c22b989">2 Divisions</p>
                    <p className="tl-audit-element-bf919b5">Affected</p>
                  </div>
                </div>
              </div>
              <div
                className="tl-mini-svg-topology-vector-map-overlay-a76e700"
                data-node-id="106:5908"
                data-name="Mini SVG Topology Vector Map Overlay"
              >
                <div
                  className="tl-svg-534e195"
                  data-node-id="106:5909"
                  data-name="SVG"
                >
                  <div
                    className="tl-vector-8e0e7c9"
                    data-node-id="106:5910"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-889a051">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector}
                      />
                    </div>
                  </div>
                  <div
                    className="tl-vector-3532837"
                    data-node-id="106:5911"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-94d5743">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector1}
                      />
                    </div>
                  </div>
                  <div
                    className="tl-vector-d64bf00"
                    data-node-id="106:5912"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-283d52c">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector2}
                      />
                    </div>
                  </div>
                  <div
                    className="tl-vector-95f28ca"
                    data-node-id="106:5913"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-5659686">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector3}
                      />
                    </div>
                  </div>
                  <div
                    className="tl-text-50545e8"
                    data-node-id="106:5914"
                    data-name="Text"
                  >
                    <div
                      className="tl-rulebuilder-element-543f08c"
                      data-node-id="106:5915"
                    >
                      <p className="tl-mapping-element-32bd4c7">PEDRO #04</p>
                    </div>
                  </div>
                  <div
                    className="tl-vector-e1577c2"
                    data-node-id="106:5916"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-7bcaf1b">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector4}
                      />
                    </div>
                  </div>
                  <div
                    className="tl-text-777228a"
                    data-node-id="106:5917"
                    data-name="Text"
                  >
                    <div
                      className="tl-rulebuilder-element-a8f6b6b"
                      data-node-id="106:5918"
                    >
                      <p className="tl-mapping-element-32bd4c7">
                        LABOOKELLIE #12
                      </p>
                    </div>
                  </div>
                  <div
                    className="tl-vector-a021b2f"
                    data-node-id="106:5919"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-fceb263">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector5}
                      />
                    </div>
                  </div>
                  <div
                    className="tl-vector-aacd36f"
                    data-node-id="106:5920"
                    data-name="Vector"
                  >
                    <div className="tl-rulebuilder-element-323fcff">
                      <img
                        alt=""
                        className="tl-audit-element-acc3667"
                        src={imgVector6}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tl-overlay-9f32deb"
                  data-node-id="106:5921"
                  data-name="Overlay"
                >
                  <div
                    className="tl-rulebuilder-element-0e87c21"
                    data-node-id="106:5922"
                  >
                    <p className="tl-audit-element-76aad9c">
                      GRID: 6.974° N, 80.782° E
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="tl-user-distribution-bar-011d443"
                data-node-id="106:5923"
                data-name="Rule Parameters Mini Table"
              >
                <div
                  className="tl-container-33a96cd"
                  data-node-id="106:5924"
                  data-name="Container"
                >
                  <div
                    className="tl-container-42982ff"
                    data-node-id="106:5925"
                    data-name="Container"
                  >
                    <div
                      className="tl-audit-element-303c570"
                      data-node-id="106:5926"
                    >
                      <p className="tl-audit-element-bf919b5">
                        Evaluation Engine:
                      </p>
                    </div>
                  </div>
                  <div
                    className="tl-container-42982ff"
                    data-node-id="106:5927"
                    data-name="Container"
                  >
                    <div
                      className="tl-estates-element-193b91a"
                      data-node-id="106:5928"
                    >
                      <p className="tl-audit-element-bf919b5">{`Edge Sensor Influx & Sync Gateway`}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="tl-container-33a96cd"
                  data-node-id="106:5929"
                  data-name="Container"
                >
                  <div
                    className="tl-container-42982ff"
                    data-node-id="106:5930"
                    data-name="Container"
                  >
                    <div
                      className="tl-audit-element-303c570"
                      data-node-id="106:5931"
                    >
                      <p className="tl-audit-element-bf919b5">
                        Debounce Window:
                      </p>
                    </div>
                  </div>
                  <div
                    className="tl-container-42982ff"
                    data-node-id="106:5932"
                    data-name="Container"
                  >
                    <div
                      className="tl-estates-element-193b91a"
                      data-node-id="106:5933"
                    >
                      <p className="tl-audit-element-bf919b5">
                        300 Seconds (per block ID)
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tl-container-33a96cd"
                  data-node-id="106:5934"
                  data-name="Container"
                >
                  <div
                    className="tl-container-42982ff"
                    data-node-id="106:5935"
                    data-name="Container"
                  >
                    <div
                      className="tl-audit-element-303c570"
                      data-node-id="106:5936"
                    >
                      <p className="tl-audit-element-bf919b5">Audit Policy:</p>
                    </div>
                  </div>
                  <div
                    className="tl-container-42982ff"
                    data-node-id="106:5937"
                    data-name="Container"
                  >
                    <div
                      className="tl-estates-element-193b91a"
                      data-node-id="106:5938"
                    >
                      <p className="tl-audit-element-bf919b5">
                        Strict Write to Immutable Ledger
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tl-container-ab0bdbe"
              data-node-id="106:5939"
              data-name="Container"
            >
              <button
                type="button"
                className="tl-button-5873ba5"
                data-node-id="106:5940"
                data-name="Button"
              >
                <div
                  className="tl-audit-element-8e4ed3c"
                  data-node-id="106:5941"
                >
                  <p className="tl-audit-element-bf919b5">Reset Draft</p>
                </div>
              </button>
              <button
                type="button"
                className="tl-button-87f7d32"
                data-node-id="106:5942"
                data-name="Button"
              >
                <div
                  className="tl-audit-element-ba02fde"
                  data-node-id="106:5943"
                >
                  <p className="tl-audit-element-bf919b5">{`Commit & Activate Rule`}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
