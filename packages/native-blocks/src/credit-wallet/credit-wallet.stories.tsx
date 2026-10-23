import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CreditWallet } from './credit-wallet';

const meta = {
  title: 'Blocks/Dashboard/CreditWallet',
  component: CreditWallet,
  args: {
    balance: 86,
    expiring: 20,
    todayUsed: 7,
    dailyLimit: 10,
    onBuy: () => {},
    onHistory: () => {},
  },
} satisfies Meta<typeof CreditWallet>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
export const NoExpiring: StoryObj<typeof meta> = {
  args: { balance: 240, expiring: undefined, todayUsed: 2 },
};
export const LimitReached: StoryObj<typeof meta> = {
  args: { balance: 3, expiring: undefined, todayUsed: 10 },
};
