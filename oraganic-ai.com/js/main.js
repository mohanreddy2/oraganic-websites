const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu]");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

const form = document.querySelector("[data-form]");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || data.get("farm") || "").trim();
    if (!name || !email || !message) {
      note.textContent = "Please fill in every field.";
      note.classList.remove("ok");
      return;
    }
    const subject = encodeURIComponent("Oraganic AI request from " + name);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
    window.location.href = "mailto:hello@oraganic-ai.com?subject=" + subject + "&body=" + body;
    note.textContent = "Opening your email app to send the request.";
    note.classList.add("ok");
    form.reset();
  });
}
