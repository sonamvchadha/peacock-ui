import type { Meta, StoryObj } from '@storybook/react';
import resolved from '../tokens/resolved.json';

const chain = [
  ['--pk-button-primary-bg', '--pk-action-primary'],
  ['--pk-button-primary-text', '--pk-action-on-primary'],
  ['--pk-input-border-focus', '--pk-focus-ring'],
  ['--pk-tag-bg', '--pk-surface-accent'],
  ['--pk-tag-text', '--pk-text-accent'],
] as const;
const themes = ['light', 'dark', 'rebrand'] as const;
type Resolved = Record<(typeof themes)[number], Record<string, string>>;
const r = resolved as Resolved;

const cell = { padding: 'var(--pk-space-2) var(--pk-space-3)', borderBottom: '1px solid var(--pk-border-subtle)', textAlign: 'left' as const };

function TokenChain() {
  return (
    <div style={{ fontFamily: 'var(--pk-font-sans)', overflowX: 'auto' }}>
      <h1 style={{ fontFamily: 'var(--pk-font-display)', margin: 0 }}>Component to semantic to value</h1>
      <p style={{ color: 'var(--pk-text-muted)' }}>Components read component tokens. Component tokens read semantic tokens. Only the semantic tier changes per theme.</p>
      <table style={{ borderCollapse: 'collapse', fontSize: 'var(--pk-font-size-label)' }}>
        <thead>
          <tr>
            <th style={cell}>Component token</th>
            <th style={cell}>Semantic token</th>
            {themes.map((t) => <th key={t} style={cell}>{t}</th>)}
          </tr>
        </thead>
        <tbody>
          {chain.map(([c, s]) => (
            <tr key={c}>
              <td style={cell}><code>{c}</code></td>
              <td style={cell}><code>{s}</code></td>
              {themes.map((t) => (
                <td key={t} style={cell}>
                  <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 'var(--pk-radius-sm)', background: r[t][c], border: '1px solid var(--pk-border-control)', verticalAlign: 'middle', marginRight: 6 }} />
                  <code>{r[t][c]}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const meta = { title: 'Foundations/Token chain', component: TokenChain } satisfies Meta<typeof TokenChain>;
export default meta;
export const Chain: StoryObj<typeof meta> = {};
