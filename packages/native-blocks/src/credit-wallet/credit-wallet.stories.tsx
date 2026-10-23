import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CreditWallet } from './credit-wallet';

const meta = {
  title: 'Blocks/Dashboard/CreditWallet',
  component: CreditWallet,
  args: {
    balance: 86,
    perGeneration: 2,
    todayUsed: 7,
    dailyLimit: 10,
    expiring: { amount: 20, date: '10월 31일' },
    onBuy: () => {},
    onHistory: () => {},
  },
} satisfies Meta<typeof CreditWallet>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
export const LimitReached: StoryObj<typeof meta> = {
  args: { balance: 3, todayUsed: 10, expiring: undefined },
};
