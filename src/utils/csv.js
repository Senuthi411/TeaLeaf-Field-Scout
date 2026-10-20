export function parseCSV(text) {
  const rows = [];
  let row = [],
    field = "",
    quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let index = 0; index < input.length; index++) {
    const ch = input[index];
    if (ch === '"') {
      if (quoted && input[index + 1] === '"') {
        field += '"';
        index++;
      } else quoted = !quoted;
    } else if (ch === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && input[index + 1] === "\n") index++;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else field += ch;
  }
  if (quoted) throw new Error("The CSV contains an unclosed quoted field.");
  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  if (rows.length < 2)
    throw new Error("The CSV must contain a header and at least one user.");
  const headers = rows.shift().map((value) => value.trim().toLowerCase());
  if (new Set(headers).size !== headers.length)
    throw new Error("CSV column names must be unique.");
  for (const key of ["name", "email", "role"])
    if (!headers.includes(key)) throw new Error("Missing CSV column: " + key);
  return rows.map((values, index) => {
    if (values.length !== headers.length)
      throw new Error("Unexpected column count on row " + (index + 2));
    return Object.fromEntries(
      headers.map((header, column) => [header, values[column].trim()]),
    );
  });
}
export function toCSV(records, keys) {
  const escape = (value) => {
    let text = String(value ?? "");
    if (/^[=+\-@]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  return [
    keys.join(","),
    ...records.map((record) =>
      keys.map((key) => escape(record[key])).join(","),
    ),
  ].join("\r\n");
}
export function downloadFile(content, name, type = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
