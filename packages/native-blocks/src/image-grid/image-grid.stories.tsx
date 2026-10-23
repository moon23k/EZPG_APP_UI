import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Section } from '../__stories__/helpers';
import { ImageGrid, type GridImage } from './image-grid';

const initial: GridImage[] = [
  { id: '1', uri: 'https://picsum.photos/id/152/400/400' },
  { id: '2', uri: 'https://picsum.photos/id/106/400/400' },
  { id: '3', uri: 'https://picsum.photos/id/1080/400/400', progress: 0.45 },
  {
    id: '4',
    uri: 'https://picsum.photos/id/306/400/400',
    error: '10MB를 넘어요',
  },
];

function Demo() {
  const [images, setImages] = useState(initial);
  return (
    <GestureHandlerRootView>
      <Section title="대표 · 업로드 중 · 오류 · 추가">
        <ImageGrid
          images={images}
          onImagesChange={setImages}
          onAdd={() => {}}
          onRemove={(id) =>
            setImages((list) => list.filter((i) => i.id !== id))
          }
        />
      </Section>
    </GestureHandlerRootView>
  );
}

const meta = {
  title: 'Blocks/Product/ImageGrid',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
