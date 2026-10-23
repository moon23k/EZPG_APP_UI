import { Text } from '@ezpg/native-ui';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { sample, Section } from '../__stories__/helpers';
import { LogoCandidateGrid, type LogoCandidate } from './logo-candidate-grid';

const candidates = [
  { id: 'a', status: 'ready', image: sample(225) },
  { id: 'b', status: 'ready', image: sample(250) },
  { id: 'c', status: 'generating' },
  { id: 'd', status: 'failed' },
] satisfies LogoCandidate[];

function Demo() {
  const [selected, setSelected] = useState<string | null>('a');
  return (
    <Section title="후보 4개 · 생성 중 · 실패">
      <LogoCandidateGrid
        candidates={candidates}
        selectedId={selected}
        coverId="a"
        onSelect={setSelected}
        onRetry={() => {}}
      />
      <Text variant="caption" tone="muted">
        다시 만들 때마다 크레딧 2개가 쓰여요.
      </Text>
    </Section>
  );
}

const meta = {
  title: 'Blocks/Onboarding/LogoCandidateGrid',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
