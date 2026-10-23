import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { sample, Section } from '../../__stories__/helpers';
import { LogoCandidateGrid, type LogoCandidate } from './logo-candidate-grid';

const candidates = [
  { id: 'a', status: 'ready', image: sample(225) },
  { id: 'b', status: 'failed' },
  { id: 'c', status: 'ready', image: sample(250) },
  { id: 'd', status: 'generating' },
] satisfies LogoCandidate[];

function Demo() {
  const [selected, setSelected] = useState<string | null>('a');
  return (
    <Section title="선택 · 실패 · 만드는 중">
      <LogoCandidateGrid
        candidates={candidates}
        selectedId={selected}
        onSelect={setSelected}
        onRetry={() => {}}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Onboarding/LogoCandidateGrid',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
