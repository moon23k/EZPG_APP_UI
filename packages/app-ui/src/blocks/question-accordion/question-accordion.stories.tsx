import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Section } from '../../__stories__/helpers';
import { QuestionAccordion } from './question-accordion';

const base = [
  {
    key: 'story',
    label: '스토어의 시작',
    question: '어떤 계기로 시작했나요?',
    options: [
      { value: 'dream', label: '오랜 꿈' },
      { value: 'inherited', label: '가업 계승' },
      { value: 'local', label: '지역과의 인연' },
      { value: 'need', label: '직접 느낀 필요' },
    ],
  },
  {
    key: 'result',
    label: '스토어의 인상',
    question: '어떤 스토어로 기억되고 싶나요?',
    options: [
      { value: 'careful', label: '섬세한' },
      { value: 'honest', label: '정직한' },
      { value: 'practical', label: '합리적인' },
      { value: 'refined', label: '세련된' },
      { value: 'unique', label: '개성 있는' },
    ],
  },
  {
    key: 'people',
    label: '운영',
    question: '누가 운영하나요?',
    options: [
      { value: 'solo', label: '1인 운영' },
      { value: 'family', label: '가족 운영' },
    ],
  },
];

function Demo() {
  const [open, setOpen] = useState<string | null>('result');
  const [values, setValues] = useState<Record<string, string[]>>({
    story: ['inherited'],
    result: ['careful', 'honest'],
    people: [],
  });
  const [other, setOther] = useState<Record<string, string>>({});
  return (
    <Section title="펼치기형 질문">
      <QuestionAccordion
        sections={base.map((section) => ({
          ...section,
          value: values[section.key] ?? [],
          other: other[section.key],
          hint: '최대 3개',
          max: 3,
        }))}
        openKey={open}
        onOpenChange={setOpen}
        onValueChange={(key, value) =>
          setValues((v) => ({ ...v, [key]: value }))
        }
        onOtherChange={(key, text) => setOther((o) => ({ ...o, [key]: text }))}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Onboarding/QuestionAccordion',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
