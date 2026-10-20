import test from "node:test";
import assert from "node:assert/strict";
import {
  passwordRules,
  validateLogin,
  isValidEmail,
} from "../../src/utils/validation.js";
test("accepts the requested development password policy", () => {
  assert.deepEqual(
    validateLogin({ email: "admin@tealeaf.com", password: "Admin@12345" }),
    {},
  );
});
test("reports blank and malformed email addresses", () => {
  assert.ok(validateLogin({ email: "", password: "" }).email);
  assert.ok(validateLogin({ email: "admin", password: "Admin@12345" }).email);
  assert.equal(isValidEmail(" admin@tealeaf.com "), true);
});
for (const [rule, password] of [
  ["length", "Aa1!"],
  ["uppercase", "admin@12345"],
  ["lowercase", "ADMIN@12345"],
  ["number", "Admin@abcd"],
  ["special", "Admin12345"],
])
  test("requires " + rule, () => {
    assert.equal(
      passwordRules.find((item) => item.id === rule).test(password),
      false,
    );
    assert.ok(validateLogin({ email: "admin@tealeaf.com", password }).password);
  });
test("spaces do not satisfy the special character requirement", () => {
  assert.equal(
    passwordRules.find((item) => item.id === "special").test("Admin 12345"),
    false,
  );
});
