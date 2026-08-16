const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu]");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

const form = document.querySelector("[data-form]");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    const button = form.querySelector("[type=submit]");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      note.textContent = "Please fill in every field.";
      note.classList.remove("ok");
      return;
    }
    button.disabled = true;
    note.textContent = "Sending…";
    note.classList.remove("ok");
    try {
      const response = await fetch("https://formsubmit.co/ajax/mohan.reddy02@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      });
      const result = await response.json();
      if (response.ok) {
        note.textContent = "Message sent to mohan.reddy02@gmail.com and support@dailycart24x7.com.";
        note.classList.add("ok");
        form.reset();
      } else {
        note.textContent = result.message || "Could not send. Email us directly.";
      }
    } catch (error) {
      form.removeAttribute("data-form");
      form.submit();
    }
    button.disabled = false;
  });
}
