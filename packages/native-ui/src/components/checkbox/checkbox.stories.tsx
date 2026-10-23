import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { Checkbox } from './checkbox';

function Demo() {
  const [terms, setTerms] = useState(true);
  const [marketing, setMarketing] = useState(false);
  return (
    <>
      <Section title="interactive">
        <Column>
          <Checkbox
            value={terms}
            onValueChange={setTerms}
            label="이용약관 동의 (필수)"
          />
          <Checkbox
            value={marketing}
            onValueChange={setMarketing}
            label="마케팅 수신 동의 (선택)"
          />
          <Checkbox
            value={terms}
            onValueChange={setTerms}
            accessibilityLabel="라벨 없음"
          />
        </Column>
      </Section>
      <Section title="disabled">
        <Column>
          <Checkbox value onValueChange={() => {}} label="선택됨" disabled />
          <Checkbox
            value={false}
            onValueChange={() => {}}
            label="선택 안 됨"
            disabled
          />
        </Column>
      </Section>
    </>
  );
}

const meta = { title: 'Components/Checkbox', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
