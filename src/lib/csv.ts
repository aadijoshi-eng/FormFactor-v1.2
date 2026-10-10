export function serializeCsv(
  rows: ReadonlyArray<ReadonlyArray<string | number | null | undefined>>,
) {
  return (
    "\uFEFF" +
    rows
      .map((row) =>
        row
          .map((value) => {
            const text = value == null ? "" : String(value);

            const safe =
              typeof value === "string" && /^[\s]*[=+@-]/.test(text)
                ? "'" + text
                : text;
            return `"${safe.replaceAll('"', '""')}"`;
          })
          .join(","),
      )
      .join("\r\n") +
    "\r\n"
  );
}

export function downloadCsv(
  filename: string,
  rows: ReadonlyArray<ReadonlyArray<string | number | null | undefined>>,
) {
  const url = URL.createObjectURL(
    new Blob([serializeCsv(rows)], { type: "text/csv;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
