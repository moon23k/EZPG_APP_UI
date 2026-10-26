import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { demoPhotoIds, demoStore, sample } from '../../__stories__/helpers';
import { BrandProfileCard } from './brand-profile-card';

const meta = {
  title: 'Blocks/Onboarding/BrandProfileCard',
  component: BrandProfileCard,
  args: {
    name: demoStore.name,
    industry: demoStore.industry,
    tagline: demoStore.tagline,
    logo: sample(demoPhotoIds.latte),
    colors: ['#92400e', '#fef3c7', '#171717'],
    keywords: ['따뜻한', '편안한', '동네'],
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
