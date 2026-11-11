import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Search', placeholder: 'Search bills' },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Search by site, account, or meter number.' } };
export const Invalid: Story = { args: { invalid: true, defaultValue: '20411', hint: 'No site matches 20411.' } };
