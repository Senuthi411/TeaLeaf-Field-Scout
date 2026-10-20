import test from "node:test";
import assert from "node:assert/strict";
import { parseCSV, toCSV } from "../../src/utils/csv.js";
test("reads user CSV with a byte-order mark and quoted commas", () => {
  const rows = parseCSV(
    '\uFEFFname,email,role\r\n"Perera, Nimal",nimal@example.com,Field Worker\r\n',
  );
  assert.equal(rows[0].name, "Perera, Nimal");
});
test("supports escaped quotes and multiline values", () => {
  const rows = parseCSV(
    'name,email,role\n"Scout ""A""\nNorth",a@example.com,Field Officer',
  );
  assert.equal(rows[0].name, 'Scout "A"\nNorth');
});
test("rejects broken rows and missing mandatory headers", () => {
  assert.throws(
    () => parseCSV("name,email\nA,a@example.com"),
    /Missing CSV column/,
  );
  assert.throws(
    () => parseCSV('name,email,role\n"Bad,a@example.com,Admin'),
    /unclosed/,
  );
  assert.throws(
    () => parseCSV("name,email,role\nBad,a@example.com"),
    /column count/,
  );
});
test("exports quoted content and neutralizes spreadsheet formulas", () => {
  const csv = toCSV(
    [{ name: "=SUM(1,2)", email: "x@example.com", role: "Field Worker" }],
    ["name", "email", "role"],
  );
  assert.ok(csv.includes(String.fromCharCode(39) + "=SUM(1,2)"));
});
