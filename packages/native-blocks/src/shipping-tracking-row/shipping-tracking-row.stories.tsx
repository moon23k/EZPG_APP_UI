import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ShippingTrackingRow } from './shipping-tracking-row';

const meta = {
  title: 'Blocks/Orders/ShippingTrackingRow',
  component: ShippingTrackingRow,
  args: {
    carrier: 'CJ대한통운',
    trackingNumber: '6234-1029-8812',
    step: 'inTransit',
    updatedLabel: '10월 23일 09:12 · 성수 대리점',
    onCopy: () => {},
  },
} satisfies Meta<typeof ShippingTrackingRow>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
export const Delivered: StoryObj<typeof meta> = {
  args: { step: 'delivered', updatedLabel: '10월 24일 13:40 · 문 앞' },
};
