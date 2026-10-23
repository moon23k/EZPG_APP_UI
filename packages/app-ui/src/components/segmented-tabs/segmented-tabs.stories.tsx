import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { SegmentedTabs } from './segmented-tabs';

function Demo() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [kind, setKind] = useState<'all' | 'photo'>('all');
  return (
    <Column>
      <Section title="3칸">
        <SegmentedTabs
          items={[
            { value: 'day', label: '오늘' },
            { value: 'week', label: '이번 주' },
            { value: 'month', label: '이번 달' },
          ]}
          value={period}
          onValueChange={setPeriod}
        />
      </Section>
      <Section title="2칸">
        <SegmentedTabs
          items={[
            { value: 'all', label: '전체 리뷰' },
            { value: 'photo', label: '사진 리뷰' },
          ]}
          value={kind}
          onValueChange={setKind}
        />
      </Section>
    </Column>
  );
}

const meta = {
  title: 'Components/SegmentedTabs',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
