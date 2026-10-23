import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { StockBadge } from './stock-badge';

const row = { flexDirection: 'row', gap: 8, flexWrap: 'wrap' } as const;

function Demo() {
  return (
    <View style={row}>
      <StockBadge stock={null} />
      <StockBadge stock={0} />
      <StockBadge stock={3} />
      <StockBadge stock={128} />
    </View>
  );
}

const meta = {
  title: 'Blocks/Product/StockBadge',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
