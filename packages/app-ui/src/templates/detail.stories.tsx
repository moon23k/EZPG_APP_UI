import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ListRow } from '../components/list-row/list-row';
import { StatusBadge } from '../components/status-badge/status-badge';
import { Text } from '../components/text/text';
import { Phone, useStoryStyles } from '../__stories__/phone';
import { ListSection } from './parts';
import { DetailTemplate } from './scroll-templates';

function Line({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <View style={useStoryStyles().between}>
      <Text
        variant="body"
        tone={strong ? 'default' : 'muted'}
        weight={strong ? 'semibold' : 'regular'}
      >
        {label}
      </Text>
      <Text variant="body" weight={strong ? 'semibold' : 'regular'}>
        {value}
      </Text>
    </View>
  );
}

function Screen({ deposit }: { deposit?: boolean }) {
  const s = useStoryStyles();
  const thumb = <View style={s.thumb} />;
  return (
    <Phone
      title="2026102800012"
      leading="back"
      action={<Text variant="bodyLg">⋮</Text>}
    >
      <DetailTemplate
        status={
          deposit ? (
            <StatusBadge tone="warning">입금 대기</StatusBadge>
          ) : (
            <>
              <StatusBadge tone="success">결제 완료</StatusBadge>
              <StatusBadge tone="warning">
                발송 대기 · 오늘 14:00까지
              </StatusBadge>
            </>
          )
        }
        notice={
          deposit
            ? {
                reason: 'money',
                text: '10월 28일 17:00까지 입금이 없으면 주문이 취소돼요',
              }
            : undefined
        }
        primaryAction={
          deposit ? undefined : { label: '송장 입력', onPress: () => {} }
        }
      >
        <ListSection title="상품 2">
          <ListRow
            leading={thumb}
            title="린넨 오버핏 셔츠"
            description="아이보리 · L · 1개"
            trailing={<Text variant="body">29,000원</Text>}
          />
          <ListRow
            leading={thumb}
            title="패브릭 코스터 세트"
            description="1개"
            trailing={<Text variant="body">6,000원</Text>}
          />
        </ListSection>
        <ListSection title="배송">
          <ListRow
            title="김*지 · 010-****-1234"
            description={'서울 마포구 성미산로 12, 3층\n문 앞에 놓아 주세요'}
          />
        </ListSection>
        <ListSection title="결제" inset>
          <View style={s.stack}>
            <Line label="상품" value="35,000원" />
            <Line label="배송비" value="0원" />
            <Line
              label={deposit ? '합계 · 가상계좌' : '합계 · 카드'}
              value="35,000원"
              strong
            />
          </View>
        </ListSection>
      </DetailTemplate>
    </Phone>
  );
}

function Demo() {
  return <Screen />;
}

const meta = { title: 'Templates/4 상세', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
