const { chromium, expect } = require("@playwright/test");
const fs = require("fs");
const base = (
  process.argv[2] ||
  process.env.TEALEAF_TEST_URL ||
  "http://127.0.0.1:5173"
).replace(/\/$/, "");
const SESSION = "tealeaf:mock-auth:v1";
const routes = [
  "dashboard",
  "users",
  "roles",
  "estates",
  "divisions",
  "mapping",
  "features",
  "rules",
  "workflows",
  "audit",
  "settings",
];
(async () => {
  let browser;
  try {
    browser = await chromium
      .launch({ headless: true })
      .catch(() => chromium.launch({ channel: "msedge", headless: true }));
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      acceptDownloads: true,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    fs.mkdirSync("artifacts/verification", { recursive: true });
    const report = { checks: [], routes: [], viewports: [], errors };
    const check = (name) => {
      report.checks.push(name);
      console.log("PASS:", name);
    };
    const login = async (remember = false) => {
      await page.goto(base + "/login");
      await page.getByLabel("Work Identity / Email").fill("admin@tealeaf.com");
      await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
      if (remember) await page.getByLabel("Remember me for 30 days").check();
      await page
        .getByRole("button", { name: "Sign In to Admin Console" })
        .click();
      await expect(page).toHaveURL(base + "/admin/dashboard");
      await page.waitForSelector('.design-view [data-name="Main"]');
    };
    await page.goto(base + "/admin/dashboard");
    await expect(page).toHaveURL(base + "/login");
    await expect(
      page.getByRole("button", { name: /hardware security key/ }),
    ).toBeDisabled();
    await page.screenshot({
      path: "artifacts/verification/login.png",
      fullPage: true,
    });
    check("Login loads and unauthenticated admin routes redirect");
    await page
      .getByRole("button", { name: "Sign In to Admin Console" })
      .click();
    await expect(page.locator("#email-error")).toBeVisible();
    await page.getByLabel("Work Identity / Email").fill("admin@tealeaf.com");
    await page.getByLabel("Password", { exact: true }).fill("weak");
    await page
      .getByRole("button", { name: "Sign In to Admin Console" })
      .click();
    await expect(page.locator("#password-error")).toBeVisible();
    check("Required fields and all password-policy feedback");
    await page.getByLabel("Password", { exact: true }).fill("Wrong@12345");
    await page.getByRole("button", { name: "Show password" }).click();
    await expect(page.locator("#password")).toHaveAttribute("type", "text");
    await page.getByRole("button", { name: "Hide password" }).click();
    await page
      .getByRole("button", { name: "Sign In to Admin Console" })
      .click();
    await expect(page.getByRole("alert")).toContainText(
      "Incorrect email or password",
    );
    check("Password visibility and invalid credentials");
    await page.getByLabel("Password", { exact: true }).fill("Admin@12345");
    const signing = page
      .getByRole("button", { name: "Sign In to Admin Console" })
      .click();
    await expect(
      page.getByRole("button", { name: "Signing in…" }),
    ).toBeDisabled();
    await signing;
    await expect(page).toHaveURL(base + "/admin/dashboard");
    await page.waitForSelector('.design-view [data-name="Main"]');
    check("Valid credentials, loading state and dashboard redirect");
    await page.reload();
    await page.waitForSelector('.design-view [data-name="Main"]');
    await expect(page).toHaveURL(base + "/admin/dashboard");
    const session = await page.evaluate(
      (key) => ({
        local: localStorage.getItem(key),
        session: sessionStorage.getItem(key),
      }),
      SESSION,
    );
    if (session.local || !session.session)
      throw Error("Non-remembered session used persistent storage");
    const tab = await context.newPage();
    await tab.goto(base + "/admin/dashboard");
    await expect(tab).toHaveURL(base + "/login");
    await tab.close();
    check(
      "Refresh restores the mock session; non-remembered session is tab-scoped",
    );
    for (const route of routes) {
      await page.goto(base + "/admin/" + route);
      await page.waitForSelector(".design-view > *");
      await page.waitForLoadState("networkidle");
      const assets = await page
        .locator("img:visible")
        .evaluateAll((images) =>
          images.map((image) => ({
            src: image.getAttribute("src"),
            loaded: image.complete && image.naturalWidth > 0,
            width: image.getBoundingClientRect().width,
            height: image.getBoundingClientRect().height,
          })),
        );
      const bad = assets.filter(
        (image) => !image.loaded || image.width <= 0 || image.height <= 0,
      );
      if (bad.length)
        throw Error(route + " contains broken images: " + JSON.stringify(bad));
      report.routes.push({ route, images: assets.length });
      if (["dashboard", "users", "roles", "settings"].includes(route))
        await page.screenshot({
          path: "artifacts/verification/" + route + ".png",
          fullPage: true,
        });
    }
    check("All existing admin routes load with no broken visible images");
    await page.getByRole("link", { name: "Users", exact: true }).click();
    await expect(page).toHaveURL(base + "/admin/users");
    await page.getByLabel("Search users").fill("Kasun");
    await expect(page.locator(".users-table tbody tr")).toHaveCount(1);
    await expect(page.locator(".users-table tbody")).toContainText(
      "Kasun Bandara",
    );
    await page.getByLabel("Search users").fill("");
    await page.getByRole("button", { name: "Agronomist", exact: true }).click();
    await expect(page.locator(".users-table tbody tr")).toHaveCount(1);
    await page.getByRole("button", { name: "All", exact: true }).click();
    check("Sidebar navigation, user search and role filters");
    await page.getByRole("button", { name: "Add New User" }).click();
    await page.getByLabel("Full name", { exact: true }).fill("QA Scout");
    await page
      .getByLabel("Work email", { exact: true })
      .fill("qa.scout@example.com");
    await page.getByRole("button", { name: "Save user" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await page.getByLabel("Search users").fill("QA Scout");
    await expect(page.locator(".users-table tbody")).toContainText(
      "qa.scout@example.com",
    );
    await page.reload();
    await page.getByLabel("Search users").fill("QA Scout");
    await expect(page.locator(".users-table tbody")).toContainText("QA Scout");
    await page
      .getByRole("button", { name: "Edit QA Scout", exact: true })
      .click();
    await page
      .getByLabel("Full name", { exact: true })
      .fill("QA Scout Updated");
    await page.getByRole("button", { name: "Save user" }).click();
    await expect(page.locator(".users-table tbody")).toContainText(
      "QA Scout Updated",
    );
    check("Validated user creation, edit and persistence");
    await page
      .getByRole("button", { name: "Suspend QA Scout Updated", exact: true })
      .click();
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
    await expect(page.locator(".users-table tbody")).toContainText("Suspended");
    await page
      .getByRole("button", { name: "Delete QA Scout Updated", exact: true })
      .click();
    await page.getByRole("button", { name: "Confirm", exact: true }).click();
    await expect(page.locator(".users-table tbody")).toContainText(
      "No users match",
    );
    await page.getByLabel("Search users").fill("");
    const downloaded = page.waitForEvent("download");
    await page.getByRole("button", { name: "Export results" }).click();
    const download = await downloaded;
    await download.saveAs("artifacts/verification/users.csv");
    await page
      .getByLabel("Import users CSV")
      .setInputFiles({
        name: "users.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(
          "name,email,role,estate\nImported Scout,imported@example.com,Field Worker,Pedro Estate",
        ),
      });
    await page.getByLabel("Search users").fill("Imported Scout");
    await expect(page.locator(".users-table tbody")).toContainText(
      "imported@example.com",
    );
    check("User suspension/deletion and native CSV export/import");
    await page.goto(base + "/admin/settings");
    const timeout = page.getByRole("spinbutton", {
      name: "Admin session timeout",
    });
    await timeout.fill("45");
    const mfa = page.getByRole("switch", {
        name: "Require MFA for all admin roles",
      }),
      old = await mfa.getAttribute("aria-checked");
    await mfa.click();
    await page.getByRole("button", { name: "Save settings" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Settings saved successfully",
    );
    await page.reload();
    await expect(
      page.getByRole("spinbutton", { name: "Admin session timeout" }),
    ).toHaveValue("45");
    await expect(
      page.getByRole("switch", { name: "Require MFA for all admin roles" }),
    ).toHaveAttribute("aria-checked", old === "true" ? "false" : "true");
    await page.getByRole("tab", { name: "Notifications", exact: true }).click();
    await expect(
      page.getByRole("textbox", { name: "Escalation email" }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "Security", exact: true }).click();
    await page
      .getByRole("spinbutton", { name: "Admin session timeout" })
      .fill("60");
    await page.getByRole("button", { name: "Discard changes" }).click();
    await expect(
      page.getByRole("spinbutton", { name: "Admin session timeout" }),
    ).toHaveValue("45");
    check("Settings validation, tabs, save, refresh and discard");
    await page.goto(base + "/admin/roles");
    const permission = page.getByRole("switch").first(),
      prior = await permission.getAttribute("aria-checked");
    await permission.click();
    await page.reload();
    await expect(page.getByRole("switch").first()).toHaveAttribute(
      "aria-checked",
      prior === "true" ? "false" : "true",
    );
    check("Existing permission toggles remain functional");
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      for (const route of ["dashboard", "users", "settings"]) {
        await page.goto(base + "/admin/" + route);
        await page.waitForSelector(".design-view > *");
        await page.waitForLoadState("networkidle");
        const sizing = await page.evaluate(() => ({
          viewport: innerWidth,
          document: document.documentElement.scrollWidth,
        }));
        if (sizing.document > sizing.viewport + 1)
          throw Error(route + " causes page overflow at " + width);
        report.viewports.push({ route, width });
        await page.screenshot({
          path: "artifacts/verification/" + route + "-" + width + ".png",
          fullPage: true,
        });
      }
      if (width === 390) {
        await page.getByRole("button", { name: "Toggle navigation" }).click();
        await page.getByRole("link", { name: "Users", exact: true }).click();
        await expect(page).toHaveURL(base + "/admin/users");
      }
    }
    check("Desktop, tablet, mobile layouts and mobile sidebar");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole("button", { name: "Logout", exact: true }).click();
    await expect(page).toHaveURL(base + "/login");
    await page.goto(base + "/admin/dashboard");
    await expect(page).toHaveURL(base + "/login");
    await page.evaluate(() => sessionStorage.setItem("tealeaf:demo", "true"));
    await page.goto(base + "/admin/dashboard");
    await expect(page).toHaveURL(base + "/login");
    check(
      "Logout clears the session; the previous demo flag cannot bypass protection",
    );
    await login(true);
    const saved = await context.storageState();
    const persisted = await browser.newContext({ storageState: saved });
    const persistedPage = await persisted.newPage();
    await persistedPage.goto(base + "/admin/dashboard");
    await persistedPage.waitForSelector('.design-view [data-name="Main"]');
    check("Remember Me restores the mock session in a fresh browser context");
    await persisted.close();
    await page.getByRole("button", { name: "Logout", exact: true }).click();
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await page
      .getByRole("textbox", { name: "Work email", exact: true })
      .fill("admin@tealeaf.com");
    await page.getByRole("button", { name: "Send reset link" }).click();
    await expect(page.getByRole("status")).toContainText(
      "If an account exists",
    );
    check("Forgot-password development flow");
    await page.goto(base + "/missing-page");
    await expect(page.getByText("404 · PAGE NOT FOUND")).toBeVisible();
    check("Not Found route");
    if (errors.length) throw Error(errors.join("\n"));
    fs.writeFileSync(
      "artifacts/verification/report.json",
      JSON.stringify(report, null, 2),
    );
    console.log("All " + report.checks.length + " browser checks passed.");
  } finally {
    await browser?.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
