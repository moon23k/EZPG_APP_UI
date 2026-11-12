import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Text } from '../../components/text/text';
import { Section } from '../../__stories__/helpers';
import { DraftPreview } from './draft-preview';
import { StructurePicker } from './structure-picker';

function Demo() {
  const [value, setValue] = useState<'photo' | 'mix' | 'card'>('photo');
  return (
    <>
      <Section title="구성 고르기">
        <StructurePicker
          items={[
            {
              value: 'photo',
              label: '사진 크게',
              layouts: ['image', 'image_top', 'two_images'],
            },
            {
              value: 'mix',
              label: '글과 사진',
              layouts: ['text_top', 'side', 'text'],
            },
            {
              value: 'card',
              label: '카드 나열',
              layouts: ['card', 'card', 'card'],
            },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </Section>
      <Section title="초안 미리보기 자르기">
        <DraftPreview height={160}>
          <Text>초안</Text>
        </DraftPreview>
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Detail/StructurePicker',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
