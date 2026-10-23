import { ChipGroup, SearchField, Text } from '@ezpg/native-ui';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { StepScreen } from './step-screen';

const steps = ['업종', '브랜드 인터뷰', '로고', '색상', '사이트 미리보기'];
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
        steps={steps}
        current={0}
        onBack={() => {}}
        title="어떤 가게를 운영하세요?"
        description="업종에 맞춰 브랜드와 사이트 구성을 추천해 드려요."
        primaryAction={{
          label: '다음',
          onPress: () => {},
          disabled: !industry,
        }}
        secondaryAction={{ label: '나중에 정할게요', onPress: () => {} }}
      >
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder="업종 검색 (예: 꽃, ㄲㅈ)"
        />
        <ChipGroup<Industry>
          items={shown}
          value={industry}
          onValueChange={setIndustry}
        />
        <Text variant="caption" tone="muted">
          세무사 · 변호사 · 의료 · 약국 업종은 아직 지원하지 않아요.
        </Text>
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
