import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { SelectionBar } from '../blocks/selection-bar';
import { ListRow } from '../components/list-row/list-row';
import { SelectionTemplate } from './selection-template';

const ROWS = ['유리 화병 · 미디엄', '세라믹 머그 · 웜그레이', '원목 트레이'];

function Demo() {
  const [picked, setPicked] = useState<string[]>(ROWS.slice(0, 1));
  return (
    <SelectionTemplate
      bar={
        <SelectionBar
          count={picked.length}
          actionLabel="다음"
          onAction={() => {}}
          onClear={() => setPicked([])}
        />
      }
    >
      {ROWS.map((row) => (
        <ListRow
          key={row}
          title={row}
          selection="check"
          selected={picked.includes(row)}
          chevron={false}
          onPress={() =>
            setPicked((list) =>
              list.includes(row)
                ? list.filter((item) => item !== row)
                : [...list, row]
            )
          }
        />
      ))}
    </SelectionTemplate>
  );
}

const meta = {
  title: 'Templates/SelectionTemplate',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
