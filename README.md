# Oraganic websites

Five static sites, no paid tools:

| Domain | Folder | What it is |
| --- | --- | --- |
| [oraganic.online](https://oraganic.online) | `oraganic.online/` | Organic food brand |
| [oraganic-ai.com](https://oraganic-ai.com) | `oraganic-ai.com/` | AI tools for organic growers |
| [dailycart24x7.com](https://dailycart24x7.com) | `dailycart24x7.com/` | Mango export from India |
| [idailycart.com](https://idailycart.com) | `idailycart.com/` | Indian mango product catalogue |
| [thanks2all.org](https://thanks2all.org) | `thanks2all.org/` | Personal gratitude diary |

Open any `index.html` in a browser to preview locally.

## Free stack

- HTML, CSS, and a little JavaScript
- [Google Fonts](https://fonts.google.com) (Fraunces, Nunito Sans, Syne, Manrope)
- [Unsplash](https://unsplash.com) photos
- Contact forms open the visitor’s email app (`mailto:`) — no Formspree account required

## Live repos

| Site | GitHub | Pages |
| --- | --- | --- |
| Source (all sites) | https://github.com/mohanreddy2/oraganic-websites | — |
| oraganic.online | https://github.com/mohanreddy2/oraganic-online | https://mohanreddy2.github.io/oraganic-online/ |
| oraganic-ai.com | https://github.com/mohanreddy2/oraganic-ai | https://mohanreddy2.github.io/oraganic-ai/ |
| dailycart24x7.com | https://github.com/mohanreddy2/dailycart24x7 | https://mohanreddy2.github.io/dailycart24x7/ |
| idailycart.com | https://github.com/mohanreddy2/idailycart | https://mohanreddy2.github.io/idailycart/ |
| thanks2all.org | https://github.com/mohanreddy2/thanks2all | https://mohanreddy2.github.io/thanks2all/ |

## Point your domains (required)

At the registrar for each domain, add these **A** records for `@` (the root domain):

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Add a **CNAME** for `www` → `mohanreddy2.github.io`

Contact forms send to `mohan.reddy02@gmail.com` and CC `support@dailycart24x7.com` via free [FormSubmit](https://formsubmit.co). After the first test send, open Gmail and click the FormSubmit confirmation link (check Spam). WhatsApp: `+65 9062 8025` and `+91 91107 59384`.

After DNS updates (often 5–30 minutes), GitHub will issue free HTTPS certificates. In each repo: Settings → Pages → check **Enforce HTTPS** when it becomes available.

## Update content without editing HTML

**Admin panel (use this every day):** [https://mohanreddy2.github.io/oraganic-admin/](https://mohanreddy2.github.io/oraganic-admin/) — this address is HTTPS. Sign in with a GitHub personal access token (Contents: Read and write on `oraganic-websites`). Edit homepage text for every site, then save. A GitHub Action publishes the live domains. The old [thanks2all.org/admin](http://thanks2all.org/admin/) link sends you here.

**Google Sheet (daily notes / small text):**

1. Create a Google Sheet and import `content/google-sheet-template.csv` (columns `key,value`) or `content/diary-sheet-template.csv` (`Date,Title,Note`).
2. File → Share → Publish to web → CSV.
3. In the admin, paste that CSV URL into **Google Sheet CSV URL** and save.

The homepage reads `content.json` first, then overlays any keys from the Sheet. The thanks2all diary uses a Date/Title/Note sheet when that URL is set.
