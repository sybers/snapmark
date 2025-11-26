# SnapMark

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun --bun run dev
```

## Production

Build the application for production:

```bash
bun --bun run build
```

Locally preview production build:

```bash
bun --bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Setup on Render.com

Create a new *Web Service*.

Set Language to *Node*.

Set *Build Command* to:

```bash
bun install --frozen-lockfile && bun --bun run build
```

Set *Start Command* to:

```bash
bun --bun .output/server/index.mjs
```

Set *Auto Deploy* to *After CI Checks Pass*.

(optional) Set *Pull Request Previews* to *Automatic* to enable preview environments for PRs targetting the `main` branch.