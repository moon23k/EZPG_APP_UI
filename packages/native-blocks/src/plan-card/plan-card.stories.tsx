import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../__stories__/helpers';
import { PlanCard } from './plan-card';

function Demo() {
  return (
    <>
      <Section title="현재 요금제 · 가격 인상 예정">
        <PlanCard
          name="베이직"
          price={19900}
          monthlyCredits={100}
          dailyLimit={10}
          current
          priceChange={{
            newPrice: 24900,
            effectiveDate: '12월 1일',
            consented: false,
          }}
          onConsent={() => {}}
        />
      </Section>
      <Section title="추천 · 업그레이드 일할">
        <PlanCard
          name="프로"
          price={49900}
          monthlyCredits={400}
          dailyLimit={30}
          features={['연결 도메인', '멤버 3명']}
          recommended
          proratedAmount={18700}
          onSelect={() => {}}
        />
      </Section>
      <Section title="해지 예약 · 결제 실패">
        <PlanCard
          name="베이직"
          price={19900}
          monthlyCredits={100}
          dailyLimit={10}
          current
          state="cancelScheduled"
          cancelDate="11월 30일"
        />
        <PlanCard
          name="베이직"
          price={19900}
          monthlyCredits={100}
          dailyLimit={10}
          current
          state="pastDue"
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Dashboard/PlanCard',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
