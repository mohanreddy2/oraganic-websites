(async function addDailyCartSocial() {
  const defaults = {
    support_email: "support@dailycart24x7.com",
    youtube: "https://www.youtube.com/@dailycart24x76",
    facebook: "https://www.facebook.com/dailycart.groceries.3/",
    instagram: "https://www.instagram.com/dailycart247x365/",
    x: "https://x.com/dailycart24x7"
  };
  let social = { ...defaults };
  try {
    const urls = ["content.json", "https://dailycart24x7.com/content.json"];
    for (const url of urls) {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;
      const data = await response.json();
      Object.entries(data).forEach(([key, value]) => {
        if (value != null && String(value).trim() !== "") social[key] = value;
      });
    }
  } catch (error) {
    social = { ...defaults, ...social };
  }

  const nav = document.querySelector("[data-nav]");
  if (nav && !nav.querySelector("[data-feeds]")) {
    const link = document.createElement("a");
    link.href = "https://dailycart24x7.com/feeds.html";
    link.dataset.feeds = "1";
    link.textContent = "Updates";
    nav.appendChild(link);
  }

  const footer = document.querySelector(".footer-inner");
  if (!footer || footer.querySelector(".social")) return;
  const row = document.createElement("p");
  row.className = "social";
  row.innerHTML = [
    ["mailto:" + social.support_email.replace(/^mailto:/, ""), "Email"],
    [social.youtube, "YouTube"],
    [social.facebook, "Facebook"],
    [social.instagram, "Instagram"],
    [social.x, "X"]
  ].map(([href, label]) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`).join(" · ");
  footer.appendChild(row);
})();
