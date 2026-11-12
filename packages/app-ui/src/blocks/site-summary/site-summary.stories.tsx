import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { Photo } from '../../components/photo/photo';
import {
  EyeGlyph,
  GlobeGlyph,
  ImageGlyph,
  MessageGlyph,
  PaletteGlyph,
  ShareGlyph,
} from '../../internal/glyphs';
import { ActionGrid } from '../action-grid/action-grid';
import { SiteSummary } from './site-summary';

function Demo() {
  return (
    <Section title="내 사이트 머리 · 편집 칸">
      <SiteSummary
        preview={
          <Photo
            source={{ uri: '' }}
            seed="반품 많은 리빙샵"
            aspectRatio={1 / 2}
            radius={0}
          />
        }
        overline="게시됨 · 1번째 게시"
        title="반품 많은 리빙샵"
        caption="f7-claims.zdot.localhost"
        actions={[
          { label: '보기', icon: EyeGlyph, onPress: () => {} },
          { label: '공유', icon: ShareGlyph, onPress: () => {} },
        ]}
      />
      <ActionGrid
        items={[
          {
            key: 'design',
            icon: PaletteGlyph,
            label: '디자인',
            value: '1안',
            onPress: () => {},
          },
          {
            key: 'banner',
            icon: ImageGlyph,
            label: '메인 배너',
            onPress: () => {},
          },
          {
            key: 'copy',
            icon: MessageGlyph,
            label: '사이트 문구',
            onPress: () => {},
          },
          {
            key: 'domain',
            icon: GlobeGlyph,
            label: '매장 정보',
            onPress: () => {},
          },
          {
            key: 'faq',
            icon: MessageGlyph,
            label: '자주 묻는 질문',
            onPress: () => {},
          },
        ]}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Site/SiteSummary',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
