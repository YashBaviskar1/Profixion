# Profixion

Profixion AI-Automated Social Media Audit engine

## Environment Configuration

Create a `.env` file at project root (or per service) with the following variables:

Backend:

- `PORT` — API port
- `ALLOWED_ORIGINS` — Comma-separated list of allowed origins for CORS (e.g., `https://app.example.com,https://admin.example.com`)
- `ALLOW_CREDENTIALS` — `true|false` to allow credentialed CORS requests
- `DISABLE_CSP` — Set to `1` to disable CSP (default enabled)
- `HSTS_PRELOAD` — `1` to include preload in HSTS when `NODE_ENV=production`
- `PUBLIC_URL` — Public base URL of the API (e.g., `https://api.example.com`)
- Provider keys: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `GEMINI_API_KEY`, `BRIGHTDATA_API_KEY`

Frontend:

- `VITE_API_BASE_URL` — API base URL (e.g., `https://api.example.com/api`)

See `.env.example` for a template.
