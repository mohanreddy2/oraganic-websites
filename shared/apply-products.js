(async function applyProducts() {
  const root = document.querySelector("[data-products]");
  if (!root) return;
  try {
    const response = await fetch("content.json", { cache: "no-store" });
    const content = response.ok ? await response.json() : {};
    const url = content.produceCsv || "produce.csv";
    const csv = await (await fetch(url, { cache: "no-store" })).text();
    const lines = csv.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;
    const header = splitCsvLine(lines[0]).map((value) => value.trim().toLowerCase());
    const items = lines.slice(1).map((line) => {
      const cols = splitCsvLine(line);
      const item = {};
      header.forEach((key, index) => {
        item[key] = (cols[index] || "").trim();
      });
      return item;
    }).filter((item) => item.name);
    if (!items.length) return;
    const fallbackPhone = String(content.whatsapp_phone || "919110759384").replace(/\D/g, "");
    root.innerHTML = items.map((item) => {
      const phone = String(item.phone || fallbackPhone).replace(/\D/g, "");
      const message = item.whatsapp || ("Hello, I want " + item.name + (item.price ? " (" + item.price + ")" : "") + " from " + window.location.hostname);
      const img = item.image ? "<img src=\"" + escapeHtml(item.image) + "\" alt=\"" + escapeHtml(item.alt || item.name) + "\">" : "";
      const price = item.price ? "<p class=\"price\">" + escapeHtml(item.price) + "</p>" : "";
      const extra = item.origin || item.packing
        ? "<ul class=\"meta\">" +
          (item.origin ? "<li><strong>Origin</strong> — " + escapeHtml(item.origin) + "</li>" : "") +
          (item.packing ? "<li><strong>Packing</strong> — " + escapeHtml(item.packing) + "</li>" : "") +
          "</ul>"
        : "";
      return "<article class=\"product\">" + img +
        "<div class=\"product-body\"><h3>" + escapeHtml(item.name) + "</h3>" +
        "<p>" + escapeHtml(item.description || "") + "</p>" + extra + price +
        "<a class=\"btn btn-primary\" href=\"https://wa.me/" + phone + "?text=" + encodeURIComponent(message) + "\" target=\"_blank\" rel=\"noopener\">WhatsApp this item</a></div></article>";
    }).join("");
  } catch (error) {
    return;
  }

  function splitCsvLine(line) {
    const cols = [];
    let cell = "";
    let quoted = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === "\"" && quoted && line[i + 1] === "\"") {
        cell += "\"";
        i += 1;
      } else if (ch === "\"") {
        quoted = !quoted;
      } else if (ch === "," && !quoted) {
        cols.push(cell);
        cell = "";
      } else {
        cell += ch;
      }
    }
    cols.push(cell);
    return cols;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
