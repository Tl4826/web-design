# Part 2 — Acme financial dashboard

Learning implementation based on [Next.js Dashboard App](https://nextjs.org/learn/dashboard-app). This implementation uses JavaScript rather than the official starter's TypeScript and a custom responsive interface. It covers nested App Router layouts, server components, PostgreSQL, loading and error states, streaming with Suspense, URL search and pagination, validated Server Actions, CRUD, authentication and metadata. No live database or deployment is provisioned yet.

## Setup (Node.js 22)
1. Create an empty PostgreSQL database for this lab (local or hosted).
2. Copy .env.example to .env.local. Fill in POSTGRES_URL, DEMO_EMAIL and DEMO_PASSWORD (8–72 characters). Generate a random AUTH_SECRET with node -e "console.log(require('crypto').randomBytes(32).toString('base64'))". Never commit .env.local.
3. Run:
```sh
npm install
npm run seed
npm run dev
```
4. Open http://localhost:3000, log in with your demo credentials.
5. Run npm run build and npm run start to check production.

## Manual checks
- Public homepage, login and logout.
- Unauthenticated dashboard access redirects to login.
- Dashboard totals match invoices; revenue only includes paid invoices.
- Search by customer, email or status; navigate between pages.
- Create/edit/delete an invoice; check invalid input and missing invoice route.
- Confirm database errors are handled and mobile layout remains usable.
- Keep all environment secrets outside GitHub.

Sample customers and invoices are fictional. The database seed script is repeatable and does not overwrite existing invoices. The dashboard is a learning app, not a production accounting system. Build, database integration, end-to-end checks and deployment remain to be verified. The interactive lesson completion is not claimed.
