import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Section } from '../__stories__/helpers';
import { ListRow } from '../components/list-row/list-row';
import { Photo } from '../components/photo/photo';
import { StatusBadge } from '../components/status-badge/status-badge';
import { Text } from '../components/text/text';
import { makeStyles } from '../utils/styles';
import { SortableGrid, SortableHandle } from './sortable-grid';
import { SortableList } from './sortable-list';

type Option = { id: string; name: string };
type Shot = { id: string; uri: string };

const useStyles = makeStyles((t) => ({
  root: { flex: 1, maxWidth: 420 },
  grip: {
    ...t.typography.title,
    color: t.colors.mutedForeground,
    paddingHorizontal: t.space[2],
  },
  cover: { position: 'absolute', top: t.space[1], left: t.space[1] },
}));

function Demo() {
  const s = useStyles();
  const [options, setOptions] = useState<Option[]>([
    { id: 'a', name: '꽃다발 (소)' },
    { id: 'b', name: '꽃다발 (중)' },
    { id: 'c', name: '꽃다발 (대)' },
    { id: 'd', name: '꽃바구니' },
  ]);
  const [shots, setShots] = useState<Shot[]>(
    [152, 106, 1080, 306, 360, 429].map((n) => ({
      id: String(n),
      uri: `https://picsum.photos/id/${n}/400/400`,
    }))
  );

  return (
    <GestureHandlerRootView style={s.root}>
      <Section title="SortableList · 손잡이로 끌기">
        <SortableList
          data={options}
          keyExtractor={(o) => o.id}
          onDataChange={setOptions}
          handle
          gap={0}
          itemLabel={(o) => o.name}
          renderItem={({ item }) => (
            <ListRow
              title={item.name}
              trailing={
                <SortableHandle>
                  <Text style={s.grip}>≡</Text>
                </SortableHandle>
              }
            />
          )}
        />
      </Section>
      <Section title="SortableGrid · 길게 눌러 끌기 · 첫 칸이 대표">
        <SortableGrid
          data={shots}
          keyExtractor={(p) => p.id}
          onDataChange={setShots}
          itemLabel={(p) => `사진 ${shots.indexOf(p) + 1}`}
          renderItem={({ item, index }) => (
            <>
              <Photo source={{ uri: item.uri }} />
              {index === 0 ? (
                <StatusBadge style={s.cover}>대표</StatusBadge>
              ) : null}
            </>
          )}
        />
      </Section>
    </GestureHandlerRootView>
  );
}

const meta = { title: 'Sortable/List · Grid', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
