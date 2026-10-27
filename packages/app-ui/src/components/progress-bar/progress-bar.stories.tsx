import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Column, Section } from '../../__stories__/helpers';
import { ProgressBar } from './progress-bar';

function Demo() {
  return (
    <Column>
      <Section title="시작 · 진행 · 완료">
        <ProgressBar done={0} total={12} label="송장 등록" />
        <ProgressBar done={5} total={12} label="송장 등록" />
        <ProgressBar done={12} total={12} label="송장 등록" />
      </Section>
      <Section title="라벨 없음 · 전체 0건">
        <ProgressBar done={3} total={8} />
        <ProgressBar done={0} total={0} label="상품 사진 올리기" />
      </Section>
      <Section title="긴 라벨">
        <ProgressBar
          done={128}
          total={1200}
          label="선택한 주문의 송장 번호를 택배사에 보내고 배송 중으로 바꾸는 중이에요"
        />
      </Section>
    </Column>
  );
}

const meta = {
  title: 'Components/ProgressBar',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
