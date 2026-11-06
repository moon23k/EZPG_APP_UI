import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhotoGrid } from './photo-grid';

function Demo() {
  return (
    <PhotoGrid
      addLabel="사례 추가"
      items={[
        {
          key: 'a',
          title: '24평 빌라 거주 청소',
          caption: '송파구 · 24평',
          image: null,
        },
      ]}
      onAdd={() => {}}
      onPress={() => {}}
    />
  );
}

const meta = {
  title: 'Blocks/Quote/PhotoGrid',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
