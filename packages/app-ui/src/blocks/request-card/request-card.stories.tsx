import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { RequestCard } from './request-card';

function Demo() {
  return (
    <RequestCard
      name="박비회원"
      tag="입주"
      due="D-13"
      urgent
      summary="원룸 · 10평 이하 · 서울 마포구"
      meta="11.05 요청"
      actionLabel="견적 보내기"
      onAction={() => {}}
      onPress={() => {}}
    />
  );
}

const meta = {
  title: 'Blocks/Quote/RequestCard',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
