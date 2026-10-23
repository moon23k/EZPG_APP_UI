import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { sample } from '../../__stories__/helpers';
import { BrandProfileCard } from './brand-profile-card';

const meta = {
  title: 'Blocks/Onboarding/BrandProfileCard',
  component: BrandProfileCard,
  args: {
    name: '꽃집 모먼트',
    industry: '꽃집 · 서울 성수동',
    tagline: '오늘의 계절을 한 다발에 담아요',
    logo: sample(225),
    colors: ['#e11d48', '#fde2e4', '#171717'],
    keywords: ['따뜻한', '계절감', '선물'],
    onEdit: () => {},
  },
} satisfies Meta<typeof BrandProfileCard>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
export const Minimal: StoryObj<typeof meta> = {
  args: {
    tagline: undefined,
    logo: undefined,
    colors: [],
    keywords: [],
    onEdit: undefined,
  },
};
