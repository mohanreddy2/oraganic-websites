# Oraganic websites

Two static sites, no paid tools:

| Domain | Folder | What it is |
| --- | --- | --- |
| [oraganic.online](https://oraganic.online) | `oraganic.online/` | Organic food brand |
| [oraganic-ai.com](https://oraganic-ai.com) | `oraganic-ai.com/` | AI tools for organic growers |

Open either `index.html` in a browser to preview locally.

## Free stack

- HTML, CSS, and a little JavaScript
- [Google Fonts](https://fonts.google.com) (Fraunces, Nunito Sans, Syne, Manrope)
- [Unsplash](https://unsplash.com) photos
- Contact forms open the visitor’s email app (`mailto:`) — no Formspree account required

## Free hosting (pick one)

Create a free GitHub repo, then deploy **each folder as its own site**:

1. **[Cloudflare Pages](https://pages.cloudflare.com)** (recommended, free custom domains)
   - New project → connect GitHub → set root directory to `oraganic.online`
   - Repeat for `oraganic-ai.com`
   - In each project: Custom domains → add the matching domain
2. **[Netlify](https://www.netlify.com)** — same idea: two sites, two publish directories
3. **[GitHub Pages](https://pages.github.com)** — easiest if you split the folders into two repos later

## Point your domains

At your domain registrar, add records the host shows you. Typical Cloudflare Pages setup:

- `oraganic.online` → CNAME to `your-pages-project.pages.dev` (or their A records)
- `oraganic-ai.com` → CNAME to the second Pages project

Also create mailbox or forwarding for `hello@oraganic.online` and `hello@oraganic-ai.com` if you want the contact buttons to land in a real inbox (many registrars include free forwarding).
