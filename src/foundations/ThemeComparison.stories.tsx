import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Tag } from '../components/Tag/Tag';

const themes = [
  { id: 'light', label: 'Light', note: 'action-primary points at teal-700' },
  { id: 'dark', label: 'Dark', note: 'action-primary points at teal-300' },
  { id: 'rebrand', label: 'Rebrand demo', note: 'action-primary points at plum-700' },
];

function Comparison() {
  return (
    <div style={{ fontFamily: 'var(--pk-font-sans)' }}>
      <h1 style={{ fontFamily: 'var(--pk-font-display)', margin: 0 }}>Same components, three token mappings</h1>
      <p style={{ color: 'var(--pk-text-muted)' }}>Each panel sets only data-theme. The components and their component tokens never change.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--pk-space-6)' }}>
        {themes.map((t) => (
          <section
            key={t.id}
            data-theme={t.id}
            style={{
              background: 'var(--pk-surface-page)',
              color: 'var(--pk-text-primary)',
              border: '1px solid var(--pk-border-subtle)',
              borderRadius: 'var(--pk-radius-lg)',
              padding: 'var(--pk-space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--pk-space-4)',
              minWidth: 260,
            }}
          >
            <div>
              <strong>{t.label}</strong>
              <div style={{ color: 'var(--pk-text-muted)', fontSize: 'var(--pk-font-size-caption)' }}>{t.note}</div>
            </div>
            <div><Button>Pay invoice</Button></div>
            <Input label="Search" placeholder="Search bills" />
            <div><Tag>Due soon</Tag></div>
          </section>
        ))}
      </div>
    </div>
  );
}

const meta = { title: 'Foundations/Theme comparison', component: Comparison } satisfies Meta<typeof Comparison>;
export default meta;
export const AllThemes: StoryObj<typeof meta> = {};
