import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import {
  MessageGlyph,
  ReturnGlyph,
  StarGlyph,
  TruckGlyph,
} from '../../internal/glyphs';
import { TaskTiles } from './task-tiles';

function Demo() {
  return (
    <Section title="지금 할 일">
      <TaskTiles
        items={[
          {
            key: 'ship',
            icon: TruckGlyph,
            label: '발송',
            count: 3,
            note: '기한 임박 1',
            onPress: () => {},
          },
          {
            key: 'claim',
            icon: ReturnGlyph,
            label: '클레임',
            count: 8,
            note: '기한 임박 6',
            onPress: () => {},
          },
          {
            key: 'inquiry',
            icon: MessageGlyph,
            label: '문의',
            count: 5,
            note: '기한 지남 5',
            onPress: () => {},
          },
          {
            key: 'review',
            icon: StarGlyph,
            label: '후기',
            count: 0,
            onPress: () => {},
          },
        ]}
      />
    </Section>
  );
}

const meta = {
  title: 'Blocks/Dashboard/TaskTiles',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
