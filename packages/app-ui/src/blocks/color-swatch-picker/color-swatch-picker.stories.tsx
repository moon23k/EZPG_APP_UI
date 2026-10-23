import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Text } from '../../components/text/text';
import { Section } from '../../__stories__/helpers';
import { ColorSwatchPicker } from './color-swatch-picker';

const palette = [
  { value: '#e11d48', label: '로즈' },
  { value: '#ea580c', label: '오렌지' },
  { value: '#facc15', label: '옐로' },
  { value: '#16a34a', label: '그린' },
  { value: '#2563eb', label: '블루' },
  { value: '#171717', label: '블랙' },
];

function Demo() {
  const [color, setColor] = useState('#e11d48');
  return (
    <>
      <Section title="circle">
        <ColorSwatchPicker
          colors={palette}
          value={color}
          onValueChange={setColor}
        />
      </Section>
      <Section title="card (사이트 색 미리보기)">
        <ColorSwatchPicker
          variant="card"
          colors={palette.slice(0, 4)}
          value={color}
          onValueChange={setColor}
        />
        <Text variant="caption" tone="muted">
          색 변경은 무료예요. 바꿔도 문구와 로고는 그대로예요.
        </Text>
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Onboarding/ColorSwatchPicker',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
