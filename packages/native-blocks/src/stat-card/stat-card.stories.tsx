import { Sparkline } from '@ezpg/native-ui/charts';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { StatCard } from './stat-card';

function Demo() {
  return (
    <Section title="증가 · 감소 · 변동 없음 · 이전 값 없음">
      <StatCard
        label="이번 주 매출"
        value="191만원"
        change={12.4}
        chart={<Sparkline data={[18, 24, 9, 31, 27, 42, 38]} />}
      />
      <StatCard label="주문" value="42건" change={-8.1} />
      <StatCard label="재방문 고객" value="17명" change={0} />
      <StatCard label="리뷰" value="5건" change={null} />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Dashboard/StatCard',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
