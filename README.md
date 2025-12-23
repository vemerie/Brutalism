# Brutalism Dashboard

Brutalism is a modular admin dashboard built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons. It ships with marketing analytics widgets, email tooling, and shared UI primitives to accelerate feature work across modules.

## Tech Stack

- **React + TypeScript** powered by Vite for rapid HMR and modern build tooling.
- **Tailwind CSS** and custom UI components (cards, sidebar, chart primitives) for consistent styling.
- **Recharts** for marketing visualisations.
- **React Query** for API data fetching, caching, and pagination management.

## Project Structure

```
brutalism/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── app-header.tsx   # Sticky top navigation with search and user menu
│   │   ├── app-sidebar.tsx  # Collapsible sidebar with upgrade CTA
│   │   ├── app-pagination.tsx
│   │   └── ui/              # Reusable primitives (card, chart, sidebar, etc.)
│   ├── contexts/
│   │   └── AuthContext.ts   # Global auth state + helpers
│   ├── hooks/
│   │   └── useAuth.ts       # Convenience hook for consuming AuthContext
│   ├── providers/
│   │   └── AuthProvider.tsx # Wraps the app with auth state & query providers
│   ├── pages/
│   │   ├── authentication/  # Auth flows, interfaces, and queries
│   │   └── modules/
│   │       ├── apps/
│   │       │   └── email/   # Email inbox UI, interfaces, mock data, and queries
│   │       └── marketting/  # Marketing dashboards (cards, charts, platform budgets)
│   ├── lib/
│   │   └── utils.ts         # Utility helpers (e.g., class name merger)
│   └── index.css            # Tailwind setup and design tokens
├── package.json
└── vite.config.ts
```

Each module keeps its own components, interfaces, and server queries so that pages stay feature-scoped. Shared UI lives in `src/components`, while domain logic (contexts, hooks, providers) is grouped at the top level for reusability.

## Performance Optimizations

1. **Data Fetching & Caching with React Query**  
   - Email inbox requests are handled via `useEmailsQuery`, which memoises responses, deduplicates in-flight requests, and exposes pagination metadata.
   - Query params (page, limit, search) are kept in state and passed as part of the query key. This means React Query only refetches when these values change, preventing unnecessary network chatter.

2. **Controlled Pagination Component**  
   - `app-pagination.tsx` computes page bounds (start/end markers) on the fly and disables navigation when the user is already at the edges. This reduces accidental rerenders and protects the API from invalid requests.
   - Pagination callbacks bubble up to the inbox page, ensuring the same component can be reused anywhere by simply providing `total`, `page`, `limit`, and `onPageChange`.

3. **Bounded Layout & Sticky Header**  
   - The main layout wraps content inside a `max-w-7xl` container with responsive padding and uses a sticky header. This approach avoids expensive layout shifts on large monitors and keeps header actions accessible without forcing full page reflows.
   - Lazy loaded every page for better first time render.

4. **Optimised Inbox Rendering**  
   - Email previews are truncated to 50 characters before rendering. This prevents oversized DOM nodes and keeps the list performant on lower-powered devices.
   - Selection and star toggling rely on `Set` operations so only the affected rows update, reducing unnecessary state churn across the message list.

These optimisations, layered with Vite’s fast dev server and Tailwind’s JIT pipeline, keep the dashboard responsive while the codebase scales with new modules.

## Other Considerations to improve code base
- Unit Testing
- Playwright testing
- Linting, Prettier and Husky-Precommit hooks configuration

## Scripts

```bash
npm install   # Install dependencies
npm run dev   # Start Vite dev server with HMR
npm run build # Type-check and create a production build
npm run preview # Preview the production build locally
```

