import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../../__stories__/helpers';
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

const SUMMARY: Record<
  SalesPeriod,
  { total: number; previousTotal: number; refundTotal: number }
> = {
  today: { total: 388000, previousTotal: 420000, refundTotal: 0 },
  week: { total: 1911000, previousTotal: 1682000, refundTotal: 42000 },
  month: { total: 8240000, previousTotal: 7310000, refundTotal: 186000 },
};

function Demo() {
  const [period, setPeriod] = useState<SalesPeriod>('week');
  return (
    <>
      <Section title="기본">
        <SalesChart
          period={period}
          onPeriodChange={setPeriod}
          {...SUMMARY[period]}
        />
      </Section>
      <Section title="추이 차트">
        <SalesChart
          period="month"
          onPeriodChange={() => {}}
          {...SUMMARY.month}
          data={month}
        />
        <SalesChart
          period="week"
          onPeriodChange={() => {}}
          {...SUMMARY.week}
          data={week}
        />
      </Section>
      <Section title="불러오는 중 · 매출 없음">
        <SalesChart period="week" onPeriodChange={() => {}} total={0} loading />
        <SalesChart period="today" onPeriodChange={() => {}} total={0} />
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
