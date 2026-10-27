import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Column, Row, Section } from '../__stories__/helpers';
import { Text } from '../components/text/text';
import { LineChart, type ChartDatum } from './line-chart';
import { Sparkline } from './sparkline';

const days = ['10/17', '10/18', '10/19', '10/20', '10/21', '10/22', '10/23'];
const week: ChartDatum[] = days.map((label, i) => ({
  label,
  value: [182000, 240000, 96000, 310000, 275000, 420000, 388000][i]!,
}));
const month: ChartDatum[] = Array.from({ length: 30 }, (_, i) => ({
  label: `${i + 1}일`,
  value: Math.round(200000 + Math.sin(i / 3) * 120000 + i * 6000),
}));
const manwon = (v: number) => (v === 0 ? '0' : `${Math.round(v / 10000)}만`);

function Demo() {
  const [picked, setPicked] = useState<string>('점을 눌러보세요');
  return (
    <Column>
      <Section title="7일 · 만원 단위 · 점 누르기">
        <Text tone="muted">{picked}</Text>
        <LineChart
          data={week}
          formatY={manwon}
          onPointPress={(d) =>
            setPicked(`${d.label} ${d.value.toLocaleString()}원`)
          }
        />
      </Section>
      <Section title="30일 (라벨 자동 간격)">
        <LineChart data={month} formatY={manwon} height={160} />
      </Section>
      <Section title="긴 세로축 라벨 (300만 · 1,200,000)">
        <LineChart
          data={week.map((d) => ({ ...d, value: d.value * 8 }))}
          formatY={manwon}
          height={140}
        />
        <LineChart
          data={week.map((d) => ({ ...d, value: d.value * 3 }))}
          height={140}
        />
      </Section>
      <Section title="경계: 비어 있음 · 점 1개 · 모두 0">
        <LineChart data={[]} height={100} />
        <LineChart data={[{ label: '오늘', value: 52000 }]} height={100} />
        <LineChart
          data={days.map((label) => ({ label, value: 0 }))}
          height={100}
        />
      </Section>
      <Section title="Sparkline">
        <Row>
          <Sparkline data={week.map((d) => d.value)} />
          <Sparkline data={[5, 4, 6, 3, 2, 2, 1]} width={120} height={32} />
          <View>
            <Sparkline data={[3, 3, 3, 3]} />
          </View>
        </Row>
      </Section>
    </Column>
  );
}

const meta = {
  title: 'Charts/LineChart · Sparkline',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
