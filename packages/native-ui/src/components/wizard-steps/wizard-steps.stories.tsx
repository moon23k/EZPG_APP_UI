import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Column } from '../../__stories__/helpers';
import { WizardSteps } from './wizard-steps';

const steps = ['업종', '브랜드 인터뷰', '로고', '색상', '사이트 미리보기'];

const meta = {
  title: 'Components/WizardSteps',
  component: WizardSteps,
  args: { steps, current: 1 },
} satisfies Meta<typeof WizardSteps>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Column>
      <WizardSteps steps={steps} current={0} />
      <WizardSteps steps={steps} current={2} />
      <WizardSteps steps={steps} current={4} />
    </Column>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
