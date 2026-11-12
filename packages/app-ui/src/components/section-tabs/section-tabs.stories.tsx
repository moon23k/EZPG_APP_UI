import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../../__stories__/helpers';
import { SectionTabs } from './section-tabs';

function Demo() {
  const [value, setValue] = useState('photo');
  return (
    <Section title="구역 탭 · 확인 필요 점">
      <SectionTabs
        items={[
          { value: 'photo', label: '사진' },
          { value: 'info', label: '정보' },
          { value: 'detail', label: '상세페이지' },
          { value: 'sale', label: '판매', dot: true },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </Section>
  );
}

const meta = {
  title: 'Components/SectionTabs',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
