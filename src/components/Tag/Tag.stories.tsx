import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = { title: 'Components/Tag', component: Tag, args: { children: 'Due soon' } } satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
