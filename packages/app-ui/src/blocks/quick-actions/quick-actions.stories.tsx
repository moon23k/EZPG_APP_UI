import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import {
  ChartGlyph,
  GlobeGlyph,
  SparklesGlyph,
  TruckGlyph,
} from '../../internal/glyphs';
import { QuickActions } from './quick-actions';

function Demo() {
  return (
    <Section title="자주 쓰는 메뉴 4칸">
      <QuickActions
        items={[
          {
            key: 'site',
            icon: GlobeGlyph,
            label: '내 사이트',
            onPress: () => {},
          },
          { key: 'sales', icon: ChartGlyph, label: '매출', onPress: () => {} },
          { key: 'ship', icon: TruckGlyph, label: '배송', onPress: () => {} },
          {
            key: 'ai',
            icon: SparklesGlyph,
            label: 'AI 응대',
            onPress: () => {},
          },
        ]}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Menu/QuickActions',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
