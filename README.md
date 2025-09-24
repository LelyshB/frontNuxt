# frontNuxt

## Migration log

### Batch 1 refresh
- Polished the header navigation underline so the gradient bar scales from the center on hover/active with responsive widths and motion-reduced fallbacks.
- Tightened the zodiac badge hover treatment with programmable sheen animations, icon pop tweaks, and delay-aware IntersectionObserver usage.
- Kept the compatibility and deck teasers aligned with the React reference interactions (no new design tokens were required for this slice).

## Development
- Tailwind CSS v4 is wired through the `@tailwindcss/vite` plugin; global styles live in `assets/css/index.css` with `@theme` tokens.
- Run `pnpm install` once, then `pnpm run dev` for local development. Type safety is provided via `pnpm run typecheck` and builds through `pnpm run build`.
