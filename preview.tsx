import type { Preview } from '@storybook/react';
import '../src/tokens/peacock.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Peacock theme (semantic token mapping)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'rebrand', title: 'Rebrand demo' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return (
        <div style={{ background: 'var(--pk-surface-page)', color: 'var(--pk-text-primary)', padding: 'var(--pk-space-6)', minHeight: '100vh', boxSizing: 'border-box' }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
};
export default preview;
