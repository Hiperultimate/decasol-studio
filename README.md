# Decasol Starter (Bun) - Minimal

This is a starter monorepo for **Decasol Studio**:
- CLI (TypeScript)
- Server (Fastify + WebSocket)
- Studio (Next.js + Tailwind + shadcn)

## Requirements
- [Bun](https://bun.sh) installed.

## Install
From repo root:
```bash
bun install
```

## Run (development)
Open three terminals, or run these commands separately:

Terminal 1 — Server:
```bash
cd server
bun run dev
```

Terminal 2 — Studio (frontend):
```bash
cd studio
bun run dev
# open http://localhost:5173
```

Terminal 3 — CLI (optional):
```bash
cd cli
bun run dev
# then run: node src/index.ts start
# or run the script directly to spawn server + studio
```

Notes:
- CLI is a simple starter that spawns server + studio in development mode.
- No Docker or solana-test-validator included.
- The frontend uses shadcn UI scaffolding placeholders and Tailwind config included.
