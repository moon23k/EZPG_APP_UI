import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { ChipGroup } from '../../components/chip-group/chip-group';
import { SearchField } from '../../components/search-field/search-field';
import { StepScreen } from './step-screen';

const industries = [
  { value: 'flower', label: '꽃집' },
  { value: 'bakery', label: '베이커리' },
  { value: 'cafe', label: '카페' },
  { value: 'craft', label: '공방' },
  { value: 'pet', label: '반려동물 용품' },
  { value: 'fashion', label: '의류' },
] as const;
type Industry = (typeof industries)[number]['value'];

const frame = { height: 640, maxWidth: 420 };

function Demo() {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState<Industry | null>('flower');
  const shown = industries.filter((i) => i.label.includes(query));
  return (
    <View style={frame}>
      <StepScreen
        total={5}
        current={0}
        onBack={() => {}}
        title={'어떤 가게를\n운영하세요?'}
        primaryAction={{
          label: '다음',
          onPress: () => {},
          disabled: !industry,
        }}
      >
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder="업종 검색"
        />
        <ChipGroup<Industry>
          items={shown}
          value={industry}
          onValueChange={setIndustry}
        />
      </StepScreen>
    </View>
  );
}

const meta = {
  title: 'Blocks/Onboarding/StepScreen',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
