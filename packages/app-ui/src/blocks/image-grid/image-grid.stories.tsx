import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from '../../components/text/text';
import { Section } from '../../__stories__/helpers';
import { ImageGrid, type GridImage } from './image-grid';

const initial: GridImage[] = [
  { id: '1', uri: 'https://picsum.photos/id/152/400/400' },
  { id: '2', uri: 'https://picsum.photos/id/106/400/400', status: 'uploading' },
  { id: '3', uri: 'https://picsum.photos/id/306/400/400', status: 'failed' },
];

function Demo() {
  const [images, setImages] = useState(initial);
  return (
    <GestureHandlerRootView>
      <Section title="추가 · 대표 · 업로드 중 · 실패">
        <Text weight="bold" variant="bodyLg">
          상품 사진
        </Text>
        <ImageGrid
          images={images}
          onImagesChange={setImages}
          onAdd={() => {}}
          onRemove={(id) =>
            setImages((list) => list.filter((i) => i.id !== id))
          }
          onRetry={(id) =>
            setImages((list) =>
              list.map((i) =>
                i.id === id ? { ...i, status: 'uploading' as const } : i
              )
            )
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
