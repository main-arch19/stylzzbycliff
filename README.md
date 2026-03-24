# STYLZZBYCLIFF — The Barber

Premium barbershop website built with React + Vite.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

## Project Structure

```
stylzzbycliff/
├── public/
│   └── logo.jpg              ← Your logo (referenced in the site)
├── src/
│   ├── Barbershop.jsx         ← Main website component (all your content lives here)
│   ├── App.jsx                ← App wrapper
│   └── main.jsx               ← React entry point
├── index.html                 ← HTML shell
├── vite.config.js             ← Vite configuration
├── package.json               ← Dependencies & scripts
└── README.md
```

## How to Edit

All your business info, services, prices, and content are in **`src/Barbershop.jsx`** at the top of the file:

- `BARBER` — Your name, booking link, Instagram, phone, address, hours
- `SERVICES` — Your hair & grooming services with prices
- `MEMBERSHIP_TIERS` — Membership plan options and pricing
- `PRODUCTS` — Shop items
- `REVIEWS` — Client reviews
- `INSTAGRAM_POSTS` — Gallery placeholders (replace gradients with real images)

## Deployment

After running `npm run build`, the `dist/` folder contains your production-ready site. Deploy it to:

- **Netlify** — Drag & drop the `dist` folder
- **Vercel** — Connect your GitHub repo, it auto-detects Vite
- **GitHub Pages** — Push the `dist` folder
- **Any web host** — Upload the `dist` folder contents

## Customization Tips

- **Booking Link**: Update `bookingLink` in the `BARBER` object to your actual booking URL
- **Instagram**: Update `instagram` in the `BARBER` object to your real IG profile
- **Logo**: Replace `public/logo.jpg` with an updated logo if needed
- **Colors**: Edit the CSS variables in the `:root` block inside `Barbershop.jsx`
- **Fonts**: The site uses Bebas Neue + Barlow from Google Fonts
