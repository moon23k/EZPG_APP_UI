import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { StepScreen } from '../blocks/step-screen/step-screen';
import { ChipGroup } from '../components/chip-group/chip-group';
import { Phone } from '../__stories__/phone';
import { Group } from './group';

const stories = ['좋아서 시작', '가족이 함께', '오래 해 온 일'].map(
  (label) => ({
    value: label,
    label,
  })
);
const moods = ['포근한', '단정한', '활기찬'].map((label) => ({
  value: label,
  label,
}));

function Demo() {
  const [story, setStory] = useState<string[]>(['좋아서 시작']);
  const [mood, setMood] = useState<string[]>([]);
  return (
    <Phone>
      <StepScreen
        title="가게 이야기를 들려주세요"
        total={6}
        current={4}
        onBack={() => {}}
        primaryAction={{ label: '다음', onPress: () => {} }}
      >
        <Group title="시작한 계기">
          <ChipGroup
            multiple
            max={2}
            items={stories}
            value={story}
            onValueChange={setStory}
          />
        </Group>
        <Group title="분위기" aside="선택">
          <ChipGroup
            multiple
            max={2}
            items={moods}
            value={mood}
            onValueChange={setMood}
          />
        </Group>
      </StepScreen>
    </Phone>
  );
}

const meta = { title: 'Templates/Group', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
