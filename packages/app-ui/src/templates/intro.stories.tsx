import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Phone } from '../__stories__/phone';
import { useTheme } from '../theme/theme-provider';
import { IntroTemplate } from './intro-template';

function Art({ width }: { width: number }) {
  const t = useTheme();
  return (
    <View
      style={{
        width,
        height: (width * 3) / 4,
        borderRadius: t.radius.lg,
        backgroundColor: t.colors.primaryTint,
      }}
    />
  );
}

const pages = (
  [
    ['site', '답하면 사이트가 생겨요'],
    ['orders', '주문 · 예약 · 견적을 한 곳에서'],
    ['desk', '문의는 AI가 먼저 답해요'],
  ] as const
).map(([key, title]) => ({
  key,
  title,
  art: (w: number) => <Art width={w} />,
}));

function Demo() {
  return (
    <Phone>
      <IntroTemplate pages={pages} onDone={() => {}} />
    </Phone>
  );
}

const meta = { title: 'Templates/0 소개', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
