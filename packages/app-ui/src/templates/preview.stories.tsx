import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { PaletteGlyph } from '../internal/glyphs';
import { PreviewTemplate } from './preview-template';

function Demo() {
  return (
    <PreviewTemplate
      preview={<View />}
      actions={[
        { key: 'a', label: '디자인', icon: PaletteGlyph, onPress: () => {} },
      ]}
      primaryAction={{ label: '게시', onPress: () => {} }}
    />
  );
}

const meta = {
  title: 'Templates/PreviewTemplate',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
