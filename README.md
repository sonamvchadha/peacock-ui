# Peacock UI

A small demo design system by [Sonam Chadha](https://sonamchadha.com). It shows how I structure design tokens so one system can serve light mode, dark mode, and a full rebrand without changing a single component, and how I set up a repository so AI coding tools like Claude Code stay inside the system.

The brand, colors, and names are invented for this demo.

## The idea in one table

| Tier | Example | Changes when |
| --- | --- | --- |
| 1. Primitives | `--pk-teal-700: #0f6468` | Rarely. The raw palette. |
| 2. Semantic | `--pk-action-primary: var(--pk-teal-700)` | Per theme or brand. |
| 3. Component | `--pk-button-primary-bg: var(--pk-action-primary)` | When one component needs its own dial. |

Components only read tier 3 and tier 2. So:

- **Dark mode** is a second semantic mapping (`tokens/semantic.dark.json`).
- **A rebrand** is a third mapping that lists only what changes (`tokens/semantic.rebrand.json`, 5 tokens).
- **No component code changes** for either.

## The pipeline

```
Figma variables  ->  tokens/*.json  ->  npm run tokens  ->  src/tokens/peacock.css
                                                                   |
                    Storybook  <-  React components (CSS Modules, tokens only)
```

- **Figma** ([Peacock Design System file](https://www.figma.com/design/ZoqASrFQycvWmV4xwGhuE1)): the same three tiers as variable collections (Primitives, Semantic with Light / Dark / Rebrand modes, Component), each variable with its CSS name as code syntax, plus Button, Input, and Tag bound to variables.
- **Tokens:** `scripts/build-tokens.mjs` turns the JSON into CSS variables per theme, checks that every reference exists, and writes resolved values. Style Dictionary does the same at scale.
- **Generated files:** `src/tokens/` is built from `/tokens` on every run and is not committed.
- **Checks:** `npm run check` builds tokens, verifies WCAG 2.1 AA contrast for text, controls, and focus rings in every theme, fails on any raw color or pixel value in a component stylesheet, and type-checks.

## Working with Claude Code

`CLAUDE.md` points to `AGENTS.md`, the rulebook any AI coding agent follows here: tokens only, never reference a primitive from a component, never edit generated files, never weaken a check, visible focus styles, reduced motion. The checks back the rules up, so AI output that breaks the system fails before review.

## Run it

```
npm install
npm run storybook
```

Use the **Theme** toolbar to switch between Light, Dark, and Rebrand demo. See **Foundations / Theme comparison** for all three side by side, and **Foundations / Token chain** for how each component token resolves per theme.
