# AGENTS.md

Instructions for AI coding agents (Claude Code and others) working in this repository. Read the whole file before changing code. Humans: see README.md.

## 1. What this repository is

Peacock is a small demo design system: design tokens in three tiers, three React components that use tokens only, and Storybook.

Stack: React 18, TypeScript (strict), CSS Modules with BEM class names, Vite, Storybook 8.

## 2. Commands

```
npm install
npm run storybook        # builds tokens, then Storybook on http://localhost:6006
npm run tokens           # tokens/*.json -> src/tokens/peacock.css and resolved.json
npm run check            # tokens + contrast check + raw-value lint + typecheck
npm run build-storybook  # static Storybook -> storybook-static/
```

Run `npm run check` before you open a pull request. It must pass.

## 3. Repository map

```
tokens/primitives.json        tier 1: raw values (teal-700 = #0f6468)
tokens/semantic.<theme>.json  tier 2: purpose names per theme (light, dark, rebrand)
tokens/component.json         tier 3: component parts that point at semantic tokens
scripts/                      token build, contrast check, raw-value lint
src/tokens/peacock.css        GENERATED. Never edit by hand.
src/components/<Name>/        <Name>.tsx, <Name>.module.css, <Name>.stories.tsx
src/foundations/              documentation stories
```

## 4. Rules that must not be broken

- Never write a raw color, pixel size, or font name in a component stylesheet. Use `--pk-` tokens. Structural values (`0`, `100%`, `1px`, `2px` borders and outlines) are fine. `npm run lint:tokens` enforces this.
- Components read component tokens first, then semantic tokens. Never reference a primitive (`--pk-teal-700`) from a component.
- Never edit `src/tokens/peacock.css` or `resolved.json`. Change `tokens/*.json` and run `npm run tokens`.
- Never add a primitive to fix one component. Map an existing semantic token, or propose a new semantic token in the pull request.
- Never weaken a check to make it pass: do not lower contrast minimums, skip pairs, or loosen the lint.

## 5. Tokens

- Naming: primitives `<hue>-<step>`; semantic `<role>-<variant>`; component `<component>-<variant>-<property>-<state>`.
- A new theme or brand is a new `semantic.<theme>.json`. A rebrand file lists only what changes.
- After any color change, `npm run check:contrast` must pass in every theme: 4.5:1 for text, 3:1 for control borders and focus rings.

## 6. Styling

- BEM in CSS Modules: `.tag` (block), `.input__field` (element), `.button_size_sm` (modifier). Use `styles.button` in TSX, never a string class name.
- State styles in this order: native pseudo-classes (`:hover`, `:focus-visible`, `:disabled`), then ARIA attributes, then a BEM modifier.
- Every interactive element has a visible `:focus-visible` style using `--pk-input-border-focus` or `--pk-focus-ring`.
- Wrap transitions in `@media (prefers-reduced-motion: reduce)` and turn them off there.

## 7. Accessibility

- Use semantic HTML first: `<button>`, `<label>`, `<input>`. Never a `<div>` with an `onClick`.
- Inputs always have a visible label. A placeholder is not a label.
- Link help and error text with `aria-describedby`; mark errors with `aria-invalid`.

## 8. Components

- A new component needs: `<Name>.tsx` with a one-line JSDoc summary, `<Name>.module.css`, `<Name>.stories.tsx` with the default and every state, and an export in `src/index.ts`.
- Check every new story in all three themes (Light, Dark, Rebrand demo) using the Theme toolbar.

## 9. Pull requests

- Say which tokens you added, changed, or deprecated, and why.
- Show the change in all three themes.
- A human reviews and owns every change, whoever or whatever wrote it.
