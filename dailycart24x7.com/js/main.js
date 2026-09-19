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
    const name = String(data.get("Buyer name") || "").trim();
    const email = String(data.get("Buyer email") || "").trim();
    const phone = String(data.get("Phone / WhatsApp") || "").trim();
    const country = String(data.get("Destination country") || "").trim();
    const need = String(data.get("Requirement") || "").trim();
    const variety = String(data.get("Variety") || "").trim();
    const quantity = String(data.get("Quantity") || "").trim();
    const message = String(data.get("Other details") || "").trim();
    if (!name || !email || !phone || !country || !need || !variety || !quantity || !message) {
      note.textContent = "Please fill in every required field so we know who you are and what you need.";
      note.classList.remove("ok");
      return;
    }
    const subject = "Mango export enquiry from " + name + " — " + country;
    data.set("_replyto", email);
    data.set("_subject", subject);
    const replytoField = form.querySelector("#replyto");
    const subjectField = form.querySelector("[name=_subject]");
    if (replytoField) replytoField.value = email;
    if (subjectField) subjectField.value = subject;
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
      const delivered = response.ok && String(result.success) === "true";
      if (delivered) {
        note.textContent = "Enquiry sent to mohan.reddy02@gmail.com and support@dailycart24x7.com.";
        note.classList.add("ok");
        form.reset();
      } else {
        note.textContent = result.message || "Could not send. Email or WhatsApp us directly.";
      }
    } catch (error) {
      form.removeAttribute("data-form");
      form.submit();
    }
    button.disabled = false;
  });
}
