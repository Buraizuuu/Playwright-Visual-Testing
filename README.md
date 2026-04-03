

# Playwright Test Automation Setup

## 1. Install dependencies
1. `npm install`
2. `npm init playwright@latest` (if not already set up)

## 2. Environment configuration
This project supports multiple environments via environment-specific `.env` files in the `env/` folder. The `ENV` variable controls which file is loaded (defaults to `local`).

### Environment files
Create these files in `env/` folder:

**`env/.env.local`** (default):
```
BASE_URL=http://localhost:3000
MY_USERNAME=local_user
MY_PASSWORD=local_pass
API_KEY=local_key
```

**`env/.env.staging`**:
```
BASE_URL=https://demoqa.com/books
MY_USERNAME=staging_user
MY_PASSWORD=staging_pass
API_KEY=staging_key
```

### Required keys (validated by `utils/validateEnv.ts`):
- `BASE_URL`
- `MY_USERNAME`
- `MY_PASSWORD`
- `API_KEY`

### Optional CI variable:
- `CI=true` (for CI-specific Playwright behavior: `retries=2`, `workers=1` in `playwright.config.ts`)

## 3. Config usage
- `playwright.config.ts` loads `env/.env.${ENV}` (ENV defaults to "local")
- `config/env.ts` exports `ENV` from process env data
- `pages/demo.page.ts` uses `ENV.BASE_URL` in `goto()`
- Environment validation runs after loading the correct `.env` file

## 4. Run tests
- `npx playwright test` (uses default "local" environment)
- `$env:ENV="staging"; npx playwright test` (PowerShell: run with staging env)
- `ENV=staging npx playwright test` (bash: run with staging env)
- `npx playwright test tests/google.spec.ts` (run a specific test)

## 5. Reports
- HTML report: `npx playwright show-report` (default output in `playwright-report/`)
