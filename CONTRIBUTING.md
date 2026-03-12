# Contributing to TGNext

Thanks for taking the time to contribute. We appreciate bug reports, feature ideas, and pull requests.

## Development Setup

1. Install Node.js (>= 18) and pnpm.
2. Install dependencies:
   - `pnpm install`
3. Start the dev server:
   - `pnpm dev`

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed. At minimum, set `CHANNEL`.

## Lint & Build

- Lint:
  - `pnpm lint`
- Build (Cloudflare Pages adapter):
  - `SERVER_ADAPTER=cloudflare_pages pnpm build`
- Preview:
  - `pnpm preview`

## Pull Request Guidelines

- Keep PRs focused and small when possible.
- Update docs if you change behavior or configuration.
- Ensure SSR works (no Node-only APIs in runtime code).
- Include screenshots for UI changes.

## Issue Reports

When filing a bug, please include:
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, deployment target)

Thanks again for contributing!
