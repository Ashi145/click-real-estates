# API Routes

These API route handlers (`auth`, `contact`, `properties`, `providers`) provide backend functionality (using Prisma and NextAuth) for full-stack Node.js / Docker / Vercel server deployments.

For GitHub Pages static hosting, Next.js requires static exports (`output: 'export'`), where server-side route handlers cannot be compiled into static HTML. The frontend pages of CLICK Real Estate Connectors are built with interactive client-side functionality and demo datasets to run seamlessly in static environments like GitHub Pages.

To run with full backend API support in a Node.js server environment:
1. Move the route folders back into `app/api/`
2. Remove `output: 'export'` from `next.config.mjs`
3. Configure `DATABASE_URL` and run `npm run db:push`
