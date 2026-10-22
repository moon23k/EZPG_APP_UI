import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { catalog, type CatalogEntry } from './catalog/stories';

type Scheme = 'light' | 'dark';

// Phase 1에서 라이브러리 토큰으로 교체한다.
const palette = {
  light: { bg: '#ffffff', fg: '#0a0a0a', muted: '#737373', line: '#e5e5e5' },
  dark: { bg: '#0a0a0a', fg: '#fafafa', muted: '#a3a3a3', line: '#262626' },
};

export default function App() {
  const [scheme, setScheme] = useState<Scheme>('light');
  const [selected, setSelected] = useState<CatalogEntry | null>(null);
  const c = palette[scheme];

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: c.bg }]}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={[styles.header, { borderColor: c.line }]}>
        {selected ? (
          <Pressable onPress={() => setSelected(null)} hitSlop={12}>
            <Text style={[styles.action, { color: c.fg }]}>‹ 목록</Text>
          </Pressable>
        ) : (
          <Text style={[styles.title, { color: c.fg }]}>EZPG Native UI</Text>
        )}
        <Pressable
          onPress={() => setScheme(scheme === 'light' ? 'dark' : 'light')}
          hitSlop={12}
        >
          <Text style={[styles.action, { color: c.muted }]}>
            {scheme === 'light' ? 'Dark' : 'Light'}
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {selected ? (
          selected.stories.map((story) => (
            <View key={story.id} style={styles.story}>
              <Text style={[styles.label, { color: c.muted }]}>
                {story.name}
              </Text>
              {story.render()}
            </View>
          ))
        ) : catalog.length === 0 ? (
          <Text style={{ color: c.muted }}>아직 스토리가 없습니다.</Text>
        ) : (
          catalog.map((entry) => (
            <Pressable
              key={entry.title}
              onPress={() => setSelected(entry)}
              style={[styles.row, { borderColor: c.line }]}
            >
              <Text style={{ color: c.fg }}>{entry.title}</Text>
              <Text style={{ color: c.muted }}>{entry.stories.length}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 17, fontWeight: '600' },
  action: { fontSize: 15 },
  body: { padding: 16, gap: 24 },
  story: { gap: 8 },
  label: { fontSize: 12, letterSpacing: 0.4, textTransform: 'uppercase' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
