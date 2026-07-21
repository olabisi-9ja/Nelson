# Nelson — Luxury Footwear Flagship

A cinematic e-commerce and commission experience for Nelson, a Nigerian bespoke luxury shoemaker.

## Features

- Cinematic storefront with collections, journal, film, masterclass, and craftsmanship storytelling.
- Full e-commerce flow: add to bag, cart drawer, checkout, order management.
- Bespoke commission journey with measurements, customization, timeline, and deposit.
- Interactive product configurator with live SVG preview and 360° drag-to-rotate viewer.
- AI concierge chat, AI size/leather recommendation assistants.
- Client dashboard with order history and production tracker.
- Admin dashboard with CRUD for products, commissions, orders, customers, journal, analytics, and role-based tabs.
- Supabase scaffolding with graceful localStorage fallback.

## Running locally

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` and add your Supabase, Stripe, and Paystack keys to enable live backend, payments, and storage.

## Demo accounts

- `admin@nelson.com` — full admin access
- `manager@nelson.com` — manager access
- `artisan@nelson.com` — production access
- `client@nelson.com` — customer dashboard
- `vip@nelson.com` — private client dashboard

Any password longer than 3 characters works in demo mode.
