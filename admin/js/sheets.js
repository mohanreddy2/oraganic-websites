(function () {
  const SHEETS_HOME = "https://docs.google.com/spreadsheets/u/0/?pli=1";
  const FORMS_HOME = "https://docs.google.com/forms/u/0/?pli=1";
  const THANKS_SHEET = "https://docs.google.com/spreadsheets/d/16XhpxOM8gTdGzsswF94_RHHLHHhct6wz12aKENmKyp8/edit?gid=1719519638#gid=1719519638";
  const RAW = "https://raw.githubusercontent.com/mohanreddy2/oraganic-websites/main/";

  const SITES = [
    {
      id: "logins",
      name: "My logins",
      cms: "./index.html#/collections/logins",
      live: "./keys.html",
      content: RAW + "content/credentials.json",
      defaultSheet: "https://docs.google.com/spreadsheets/d/15IC7QKFiopTQdXByLns9qz5v62nL3FkxKrINJXEGZVI/edit",
      note: "One private Google Sheet: every password, token, and admin URL. Do not publish it."
    },
    {
      id: "thanks2all",
      name: "thanks2all.org",
      cms: "./index.html#/collections/thanks2all",
      live: "https://thanks2all.org/",
      content: RAW + "thanks2all.org/content.json",
      defaultSheet: THANKS_SHEET,
      note: "Diary notes and homepage. Use this sheet when you update thanks2all."
    },
    {
      id: "dailycart",
      name: "dailycart24x7.com",
      cms: "./index.html#/collections/dailycart",
      live: "https://dailycart24x7.com/",
      content: RAW + "dailycart24x7.com/content.json",
      note: "Mango export homepage text."
    },
    {
      id: "idailycart",
      name: "idailycart.com",
      cms: "./index.html#/collections/idailycart",
      live: "https://idailycart.com/",
      content: RAW + "idailycart.com/content.json",
      note: "Indian mango catalogue homepage."
    },
    {
      id: "oraganic",
      name: "oraganic.online",
      cms: "./index.html#/collections/oraganic",
      live: "https://oraganic.online/",
      content: RAW + "oraganic.online/content.json",
      note: "Organic food homepage."
    },
    {
      id: "oraganic_ai",
      name: "oraganic-ai.com",
      cms: "./index.html#/collections/oraganic_ai",
      live: "https://oraganic-ai.com/",
      content: RAW + "oraganic-ai.com/content.json",
      note: "AI tools homepage."
    },
    {
      id: "alfa_garden",
      name: "alfa-garden.com",
      cms: "./index.html#/collections/alfa_garden",
      live: "https://alfa-garden.com/",
      content: RAW + "alfa-garden.com/content.json",
      note: "KR Puram shop homepage."
    }
  ];

  function extractUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const fromIframe = raw.match(/\bsrc=["']([^"']+)["']/i);
    return (fromIframe && fromIframe[1]) || raw;
  }

  function safeHttpUrl(value) {
    const raw = extractUrl(value);
    if (!raw) return "";
    try {
      const parsed = new URL(raw, window.location.href);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.href;
    } catch (error) {
      return "";
    }
    return "";
  }

  function canEmbedSheet(url) {
    return /\/pubhtml/i.test(url) || /\/spreadsheets\/d\/e\/[^/]+\/pub/i.test(url);
  }

  function sheetShareUrl(site, config) {
    return safeHttpUrl(config && config.sheetShare) ||
      (site && site.defaultSheet) ||
      SHEETS_HOME;
  }

  function sheetEmbedUrl(config) {
    const embed = safeHttpUrl(config && config.sheetEmbed);
    if (embed && canEmbedSheet(embed)) return embed;
    const csv = safeHttpUrl(config && config.sheetCsv);
    const published = csv.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/([^/?]+)\/pub/i);
    if (published) {
      return "https://docs.google.com/spreadsheets/d/e/" + published[1] + "/pubhtml?widget=true&headers=false";
    }
    return "";
  }

  function formShareUrl(config) {
    return safeHttpUrl(config && config.formShare) || FORMS_HOME;
  }

  function currentSite() {
    const hash = window.location.hash || "";
    return SITES.find((site) => hash.indexOf("/collections/" + site.id) >= 0) || SITES[0];
  }

  async function loadConfig(site) {
    if (!site.content) return {};
    try {
      const response = await fetch(site.content, { cache: "no-store" });
      if (!response.ok) return {};
      return await response.json();
    } catch (error) {
      return {};
    }
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.slice(0, 2) === "on") node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value);
    });
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function button(label, href, className) {
    const external = href.indexOf("http") === 0;
    return el("a", {
      class: "sheet-btn" + (className ? " " + className : ""),
      href: href,
      target: external ? "_blank" : "_self",
      rel: "noopener noreferrer",
      text: label
    });
  }

  function keepNode(node) {
    if (!node) return;
    if (node.parentNode !== document.body) document.body.appendChild(node);
  }

  function sheetViewer(site, config) {
    const share = sheetShareUrl(site, config);
    const embed = sheetEmbedUrl(config);
    const connected = /docs\.google\.com\/spreadsheets\/d\//i.test(share);
    const box = el("div", { class: embed ? "" : "sheet-empty" });
    box.appendChild(el("h2", { text: site.name }));
    box.appendChild(el("p", {
      class: "lead",
      text: site.id === "logins" && !connected
        ? "Download the CSV, import it into a private Google Sheet, fill your passwords, then paste the share link in My logins."
        : connected
        ? "Your Google Sheet is ready. Open it, update the rows, then come back and save the website."
        : "No sheet link yet. Open Google Sheets, copy Share, paste it in this site’s admin, and save."
    }));
    const actions = el("div", { class: "sheet-bar-actions" }, [
      button(site.id === "logins" && !connected ? "Set up my logins sheet" : (connected ? "Open and use this sheet" : "Open Google Sheets"), share),
      button("Edit " + site.name, site.cms, "ghost"),
      button("Open live site", site.live, "ghost")
    ]);
    box.appendChild(actions);
    if (embed) {
      box.appendChild(el("iframe", {
        class: "sheet-frame",
        title: site.name + " Google Sheet",
        src: embed
      }));
    }
    return box;
  }

  async function fillToolbar(bar) {
    const site = currentSite();
    const config = await loadConfig(site);
    const share = sheetShareUrl(site, config);
    const actions = bar.querySelector(".sheet-bar-actions");
    if (!actions) return;
    actions.innerHTML = "";
    actions.appendChild(button("Use my sheet", share));
    actions.appendChild(button("My logins", "./keys.html", "ghost"));
    actions.appendChild(button("My Forms", formShareUrl(config), "ghost"));
    actions.appendChild(button("See all sheets", "./sheets.html?site=" + site.id, "ghost"));
    actions.appendChild(button("Edit " + site.name, site.cms, "ghost"));
    actions.appendChild(el("button", {
      class: "sheet-btn",
      type: "button",
      text: "Show sheet",
      onclick: function () {
        const panel = document.getElementById("sheet-panel");
        if (panel) panel.classList.toggle("open");
      }
    }));
  }

  function mountToolbar() {
    let bar = document.getElementById("sheet-bar");
    if (!bar) {
      document.body.classList.add("has-sheet-bar");
      bar = el("div", { id: "sheet-bar", class: "sheet-bar" }, [
        el("p", { text: "When you update a site, use your Google Sheet. My logins holds every password." }),
        el("div", { class: "sheet-bar-actions" })
      ]);
      document.body.appendChild(bar);
      setInterval(function () { keepNode(bar); }, 1500);
    }
    fillToolbar(bar);
  }

  function renderPanel(panel, site, config) {
    panel.innerHTML = "";
    panel.appendChild(el("header", {}, [
      el("h2", { text: "Use my sheets" }),
      el("p", { text: "Open the Google Sheet for the site you are updating." })
    ]));
    const body = el("div", { class: "sheet-panel-body" });
    body.appendChild(sheetViewer(site, config));
    body.appendChild(el("div", { class: "sheet-list" }, SITES.map(function (item) {
      return el("article", { class: "sheet-card" + (item.id === site.id ? " active" : "") }, [
        el("h3", { text: item.name }),
        el("p", { text: item.note }),
        button("Edit site", item.cms),
        button("Open live", item.live, "ghost")
      ]);
    })));
    panel.appendChild(body);
    panel.appendChild(el("footer", {}, [
      el("div", { class: "sheet-bar-actions" }, [
        button("See all sheets", "./sheets.html?site=" + site.id),
        el("button", {
          class: "sheet-btn ghost",
          type: "button",
          text: "Close",
          onclick: function () { panel.classList.remove("open"); }
        })
      ])
    ]));
  }

  async function mountPanel() {
    let panel = document.getElementById("sheet-panel");
    if (!panel) {
      panel = el("aside", { id: "sheet-panel", class: "sheet-panel" });
      document.body.appendChild(panel);
      setInterval(function () { keepNode(panel); }, 1500);
    }
    const site = currentSite();
    renderPanel(panel, site, await loadConfig(site));
  }

  function selectedSiteId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("site") || "logins";
  }

  async function mountBoard() {
    const root = document.getElementById("sheets-board");
    if (!root) return;
    try {
      const selected = SITES.find((site) => site.id === selectedSiteId()) || SITES[0];
      const configs = {};
      await Promise.all(SITES.map(async function (site) {
        configs[site.id] = await loadConfig(site);
      }));
      root.innerHTML = "";
      const wrap = el("div", { class: "wrap" });
      wrap.appendChild(el("div", { class: "sheet-board-top" }, [
        el("div", {}, [
          el("p", { class: "lead", text: "Update a site, then check it in your Google Sheet." }),
          el("h1", { text: "My Google Sheets" })
        ]),
        el("div", { class: "sheet-bar-actions" }, [
          button("Open Google Sheets", sheetShareUrl(selected, configs[selected.id] || {})),
          button("Open Forms", FORMS_HOME, "ghost"),
          button("Open admin", "./index.html#/collections/" + selected.id, "ghost")
        ])
      ]));
      const list = el("div", { class: "sheet-list" });
      SITES.forEach(function (site) {
        const siteConfig = configs[site.id] || {};
        list.appendChild(el("article", { class: "sheet-card" + (site.id === selected.id ? " active" : "") }, [
          el("h3", { text: site.name }),
          el("p", { text: site.note }),
          button(site.id === selected.id ? "Viewing sheet" : "Use this sheet", "./sheets.html?site=" + site.id),
          button("Edit in admin", site.cms, "ghost"),
          button("Open live", site.live, "ghost"),
          button("Open sheet", sheetShareUrl(site, siteConfig), "ghost")
        ]));
      });
      wrap.appendChild(el("div", { class: "sheet-grid" }, [
        list,
        sheetViewer(selected, configs[selected.id] || {})
      ]));
      root.appendChild(wrap);
    } catch (error) {
      root.innerHTML = "<div class=\"wrap\"><p class=\"lead\">Could not load sheet links. Open Google Sheets from the button below.</p><p><a class=\"sheet-btn\" href=\"" + THANKS_SHEET + "\" target=\"_blank\" rel=\"noopener noreferrer\">Open and use this sheet</a></p></div>";
    }
  }

  async function refreshAdmin() {
    mountToolbar();
    await mountPanel();
  }

  function start() {
    if (document.getElementById("sheets-board")) {
      mountBoard();
      return;
    }
    refreshAdmin();
    window.addEventListener("hashchange", refreshAdmin);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
