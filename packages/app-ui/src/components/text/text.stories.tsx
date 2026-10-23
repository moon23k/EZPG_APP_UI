import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Column, Section } from '../../__stories__/helpers';
import { Text } from './text';

const meta = { title: 'Components/Text', component: Text } satisfies Meta<
  typeof Text
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Column>
      <Section title="variant">
        <Text variant="display">주문 12건</Text>
        <Text variant="title">오늘의 매출</Text>
        <Text variant="bodyLg">꽃다발 (중) · 장미 20송이</Text>
        <Text>배송지는 주문 확정 후 변경할 수 없어요.</Text>
        <Text variant="caption">2026-10-23 14:02</Text>
      </Section>
      <Section title="tone">
        <Text>기본</Text>
        <Text tone="muted">보조 설명</Text>
        <Text tone="destructive">결제에 실패했어요</Text>
        <Text tone="success">정산이 완료됐어요</Text>
      </Section>
      <Section title="numberOfLines=1">
        <Text numberOfLines={1}>
          아주 긴 상품 이름이 한 줄을 넘어가면 말줄임으로 잘립니다 장미 안개꽃
          유칼립투스 혼합
        </Text>
      </Section>
    </Column>
  ),
};
