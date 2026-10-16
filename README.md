# Somali Jobs

A clean, minimal job board for finding work across Somalia and beyond. Browse open roles, save favorites, and apply — all with pay shown upfront.

## Features

- **Job browsing** — 9 featured positions with filtering by type, location, and keyword search
- **Save for later** — Keep a shortlist in your browser with no account needed (localStorage)
- **Apply in a minute** — Simple name + email application modal
- **Company directory** — 6 verified employers with follow functionality
- **Responsive design** — Mobile-friendly with a collapsible navigation menu
- **Fast & lightweight** — Zero dependencies, vanilla HTML/CSS/JS

## Tech Stack

| Layer     | Tech                          |
| --------- | ----------------------------- |
| Markup    | HTML5                         |
| Styling   | CSS3 (custom properties)      |
| Scripting | Vanilla JavaScript (ES6+)     |
| Font      | Inter (Google Fonts)          |
| Storage   | localStorage                 |

## Getting Started

No build step or server required. Open `index.html` in any modern browser.

```bash
# Clone the repository
git clone <repo-url>

# Open in browser
start index.html        # Windows
open index.html        # macOS
xdg-open index.html    # Linux
```

Or serve locally with any static server:

```bash
npx serve .
python -m http.server 3000
```

## Project Structure

```
├── index.html          # Home page — hero, search, features, categories
├── jobs.html            # Job listing — filter, sort, save, apply
├── companies.html      # Company directory — browse and follow employers
├── styles.css          # All styles (single stylesheet)
├── app.js              # All logic (jobs data, filters, saved, modal)
└── images/             # Local fallback images
    ├── hero-team.jpg
    ├── cat-study.jpg
    ├── cat-office.jpg
    ├── cat-flex.jpg
    └── companies-team.jpg
```

## Usage

1. **Search** — Type a keyword, pick a location or job type on the home page
2. **Filter** — Narrow results on the jobs page using chips (All, Full-time, Part-time, Internship, Contract)
3. **Sort** — Toggle between "Newest first" and "Highest pay"
4. **Save** — Click "Save" on any job to add it to your shortlist (persists in localStorage)
5. **Apply** — Click "Apply" and fill in your name + email

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses standard ES6+ JavaScript and CSS custom properties — no transpilation needed.

## License

MIT
