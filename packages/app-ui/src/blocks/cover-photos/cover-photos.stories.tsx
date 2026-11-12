import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { demoPhotoIds, sample, Section } from '../../__stories__/helpers';
import { CoverPhotos } from './cover-photos';

const photos = [
  { id: '1', ...sample(demoPhotoIds.mug, 400) },
  { id: '2', ...sample(demoPhotoIds.latte, 400) },
  {
    id: '3',
    ...sample(demoPhotoIds.clothes, 400),
    status: 'uploading' as const,
  },
];

function Demo() {
  return (
    <>
      <Section title="대표 · 추가 · 업로드 중">
        <CoverPhotos photos={photos} onAdd={() => {}} onPress={() => {}} />
      </Section>
      <Section title="빈 상태">
        <CoverPhotos photos={[]} onAdd={() => {}} />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Product/CoverPhotos',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
