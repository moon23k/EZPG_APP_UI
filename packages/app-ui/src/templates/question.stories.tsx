import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { StepScreen } from '../blocks/step-screen/step-screen';
import { ChipGroup } from '../components/chip-group/chip-group';
import { Phone } from '../__stories__/phone';

const groups = [
  '🍎 식품',
  '🥐 카페·베이커리',
  '👕 의류',
  '👜 신발·가방·잡화',
  '💍 주얼리·시계',
  '💄 화장품·뷰티',
  '🛋️ 리빙·인테리어',
  '🌿 꽃·식물',
  '🐶 반려동물 용품',
  '📚 문구·도서·취미',
  '🧸 유아·완구',
  '⚽ 스포츠·레저',
  '🏺 공예·예술품',
  '🎨 클래스',
].map((label, i) => ({ value: String(i), label }));

function Screen({ title }: { title: string }) {
  const [value, setValue] = useState<string | null>('6');
  return (
    <Phone>
      <StepScreen
        title={title}
        total={8}
        current={0}
        onBack={() => {}}
        primaryAction={{ label: '다음', onPress: () => {}, disabled: !value }}
      >
        <ChipGroup items={groups} value={value} onValueChange={setValue} />
      </StepScreen>
    </Phone>
  );
}

function Demo() {
  return <Screen title="어떤 업종인가요?" />;
}

const meta = { title: 'Templates/1 질문', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
