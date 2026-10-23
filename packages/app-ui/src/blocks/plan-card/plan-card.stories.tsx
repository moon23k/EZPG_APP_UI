import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from '../../components/text/text';
import { Section } from '../../__stories__/helpers';
import { PlanCard } from './plan-card';

function Demo() {
  return (
    <>
      <Section title="이용 중 · 인상 예정 · 업그레이드">
        <Text weight="bold">이용 중인 플랜</Text>
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
        <Text weight="bold">다른 플랜</Text>
        <PlanCard
          name="프로"
          price={49900}
          monthlyCredits={300}
          dailyLimit={30}
          recommended
          proratedAmount={18700}
          actionLabel="업그레이드"
          onSelect={() => {}}
        />
        <PlanCard
          name="라이트"
          price={9900}
          monthlyCredits={40}
          dailyLimit={5}
          onSelect={() => {}}
        />
      </Section>
      <Section title="인상 동의함 · 해지 예약 · 결제 실패">
        <PlanCard
          name="베이직"
          price={19900}
          monthlyCredits={100}
          dailyLimit={10}
          current
          priceChange={{
            newPrice: 24900,
            effectiveDate: '12월 1일',
            consented: true,
          }}
        />
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
