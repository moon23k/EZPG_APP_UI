import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Phone, SitePreview } from '../__stories__/phone';
import { ResultTemplate } from './result-template';

const recs = [
  {
    key: 'a',
    label: '1안',
    headline: '좋아서 고른 물건, 매일 쓰기 편하게',
  },
  {
    key: 'b',
    label: '2안',
    headline: '취향이 담긴 살림을 한 곳에',
  },
  {
    key: 'c',
    label: '3안',
    headline: '하나씩 직접 써 보고 들여옵니다',
  },
];

function Screen() {
  const [index, setIndex] = useState(0);
  return (
    <Phone title="디자인 고르기" leading="back">
      <ResultTemplate
        index={index}
        onIndexChange={setIndex}
        previews={recs.map((rec) => ({
          key: rec.key,
          label: rec.label,
          render: () => (
            <SitePreview
              name="하루 리빙"
              headline={rec.headline}
              tagline="리빙 · 인테리어 소품"
              sections={2}
            />
          ),
        }))}
        primaryAction={{ label: '이 디자인으로 만들기', onPress: () => {} }}
        secondaryAction={{ label: '다시 만들기', onPress: () => {} }}
      />
    </Phone>
  );
}

function Demo() {
  return <Screen />;
}

const meta = {
  title: 'Templates/2 진행 · 결과',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
