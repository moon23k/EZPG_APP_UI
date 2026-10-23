import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../__stories__/helpers';
import { SalesChart, type SalesPeriod } from './sales-chart';

const week = [
  '10/17',
  '10/18',
  '10/19',
  '10/20',
  '10/21',
  '10/22',
  '10/23',
].map((label, i) => ({
  label,
  value: [182000, 240000, 96000, 310000, 275000, 420000, 388000][i]!,
}));
const month = Array.from({ length: 30 }, (_, i) => ({
  label: `${i + 1}일`,
  value: Math.round(200000 + Math.sin(i / 3) * 120000 + i * 6000),
}));

function Demo() {
  const [period, setPeriod] = useState<SalesPeriod>('week');
  const data = period === 'week' ? week : month;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <>
      <Section title="기본">
        <SalesChart
          period={period}
          onPeriodChange={setPeriod}
          data={data}
          total={total}
          previousTotal={total * 0.88}
          refundTotal={42000}
        />
      </Section>
      <Section title="불러오는 중 · 매출 없음">
        <SalesChart
          period="week"
          onPeriodChange={() => {}}
          data={[]}
          total={0}
          loading
        />
        <SalesChart
          period="week"
          onPeriodChange={() => {}}
          data={week.map((d) => ({ ...d, value: 0 }))}
          total={0}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Dashboard/SalesChart',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
