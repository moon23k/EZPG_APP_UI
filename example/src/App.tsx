import {
  makeStyles,
  ThemeProvider,
  useTheme,
  type ColorScheme,
} from '@ezpg/native-ui';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { catalog, type CatalogEntry } from './catalog/stories';

export default function App() {
  const [scheme, setScheme] = useState<ColorScheme>('light');
  return (
    <ThemeProvider colorScheme={scheme}>
      <Catalog
        onToggleScheme={() => setScheme(scheme === 'light' ? 'dark' : 'light')}
      />
    </ThemeProvider>
  );
}

function Catalog({ onToggleScheme }: { onToggleScheme: () => void }) {
  const t = useTheme();
  const s = useStyles();
  const [selected, setSelected] = useState<CatalogEntry | null>(null);

  return (
    <SafeAreaView style={s.fill}>
      <StatusBar
        barStyle={t.scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={s.header}>
        {selected ? (
          <Pressable onPress={() => setSelected(null)} hitSlop={12}>
            <Text style={s.action}>‹ 목록</Text>
          </Pressable>
        ) : (
          <Text style={s.title}>EZPG Native UI</Text>
        )}
        <Pressable onPress={onToggleScheme} hitSlop={12}>
          <Text style={s.muted}>{t.scheme === 'light' ? 'Dark' : 'Light'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.body}>
        {selected ? (
          selected.stories.map((story) => (
            <View key={story.id} style={s.story}>
              <Text style={s.label}>{story.name}</Text>
              {story.render()}
            </View>
          ))
        ) : catalog.length === 0 ? (
          <Text style={s.muted}>아직 스토리가 없습니다.</Text>
        ) : (
          catalog.map((entry) => (
            <Pressable
              key={entry.title}
              onPress={() => setSelected(entry)}
              style={s.row}
            >
              <Text style={s.action}>{entry.title}</Text>
              <Text style={s.muted}>{entry.stories.length}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((t) => ({
  fill: { flex: 1, backgroundColor: t.colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: t.space[4],
    paddingVertical: t.space[3],
    borderBottomWidth: 1,
    borderColor: t.colors.border,
  },
  title: {
    ...t.typography.bodyLg,
    fontWeight: '600',
    color: t.colors.foreground,
  },
  action: { ...t.typography.body, color: t.colors.foreground },
  muted: { ...t.typography.body, color: t.colors.mutedForeground },
  body: { padding: t.space[4], gap: t.space[6] },
  story: { gap: t.space[2] },
  label: {
    ...t.typography.caption,
    color: t.colors.mutedForeground,
    letterSpacing: 0.4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: t.space[3],
    borderBottomWidth: 1,
    borderColor: t.colors.border,
  },
}));
