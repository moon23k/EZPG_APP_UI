import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceStateBanner } from '../blocks/service-state-banner/service-state-banner';
import { ListRow } from '../components/list-row/list-row';
import { Text } from '../components/text/text';
import { Phone } from '../__stories__/phone';
import { ListSection } from './parts';
import { DashboardTemplate } from './scroll-templates';

function Screen({ blocked }: { blocked?: boolean }) {
  return (
    <Phone
      title="하루 리빙"
      tab="home"
      action={<Text variant="bodyLg">🔔</Text>}
    >
      <DashboardTemplate
        banner={
          blocked ? (
            <ServiceStateBanner
              state="paymentFailed"
              actionLabel="결제 수단 바꾸기"
              onAction={() => {}}
            />
          ) : undefined
        }
        onRefresh={() => {}}
      >
        <ListSection title="오늘 할 일 4">
          <ListRow
            title="발송할 주문 3건"
            overline="1건 오늘 14:00 마감"
            overlineTone="warning"
            onPress={() => {}}
          />
          <ListRow title="반품 요청 판단 1건" onPress={() => {}} />
          <ListRow title="답변할 문의 1건" onPress={() => {}} />
          <ListRow
            title="픽업 준비 1건"
            description="11월 2일 14:00"
            onPress={() => {}}
          />
        </ListSection>
        <ListSection title="매출">
          <ListRow
            title="오늘 128,000원"
            description="주문 3건 · 어제보다 +24,000원"
            onPress={() => {}}
          />
        </ListSection>
      </DashboardTemplate>
    </Phone>
  );
}

function Demo() {
  return <Screen />;
}

const meta = { title: 'Templates/7 대시보드', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
