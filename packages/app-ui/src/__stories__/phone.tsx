import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import { ChevronGlyph, CloseGlyph } from '../internal/glyphs';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type PhoneTab = 'home' | 'orders' | 'products' | 'desk' | 'more';

const tabs: { key: PhoneTab; label: string; badge?: number }[] = [
  { key: 'home', label: '홈' },
  { key: 'orders', label: '주문', badge: 3 },
  { key: 'products', label: '상품' },
  { key: 'desk', label: '응대', badge: 1 },
  { key: 'more', label: '더보기' },
];

const useStyles = makeStyles((t) => ({
  phone: {
    width: 360,
    height: 760,
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  status: { height: 24 },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.space[1],
  },
  icon: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: { transform: [{ scaleX: -1 }] },
  title: {
    flex: 1,
    fontSize: 22,
    lineHeight: 28,
    color: t.colors.foreground,
    paddingLeft: t.space[3],
  },
  titleAfterIcon: { paddingLeft: t.space[1] },
  action: { paddingHorizontal: t.space[3] },
  body: { flex: 1 },
  tabbar: {
    height: 56,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 2 },
  tabIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: '56%',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, lineHeight: 16, color: t.colors.dangerForeground },
}));

export function Phone({
  title,
  leading,
  action,
  tab,
  children,
}: {
  title?: string;
  leading?: 'back' | 'close';
  action?: ReactNode;
  tab?: PhoneTab;
  children: ReactNode;
}) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.phone}>
      <View style={s.status} />
      {title !== undefined ? (
        <View style={s.header}>
          {leading ? (
            <View style={s.icon}>
              {leading === 'back' ? (
                <View style={s.back}>
                  <ChevronGlyph color={t.colors.foreground} size={24} />
                </View>
              ) : (
                <CloseGlyph color={t.colors.foreground} size={20} />
              )}
            </View>
          ) : null}
          <Text
            numberOfLines={1}
            style={[s.title, leading ? s.titleAfterIcon : null]}
          >
            {title}
          </Text>
          {action ? <View style={s.action}>{action}</View> : null}
        </View>
      ) : null}
      <View style={s.body}>{children}</View>
      {tab ? (
        <View style={s.tabbar}>
          {tabs.map((item) => {
            const on = item.key === tab;
            const color = on ? t.colors.foreground : t.colors.mutedForeground;
            return (
              <View key={item.key} style={s.tab}>
                <View style={[s.tabIcon, { borderColor: color }]} />
                <Text
                  variant="caption"
                  weight={on ? 'semibold' : 'regular'}
                  style={{ color }}
                >
                  {item.label}
                </Text>
                {item.badge ? (
                  <View style={s.badge}>
                    <Text style={s.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const useStoryStyles = makeStyles((t) => ({
  site: { flex: 1, backgroundColor: t.colors.background },
  bar: {
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.foreground,
  },
  onBar: { color: t.colors.background },
  nav: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: t.space[3],
  },
  hero: {
    height: 200,
    justifyContent: 'flex-end',
    gap: t.space[1],
    padding: t.space[4],
  },
  block: { padding: t.space[3], gap: t.space[2] },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[2] },
  tile: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.muted,
  },
  row: { flexDirection: 'row', gap: t.layout.itemGap },
  between: { flexDirection: 'row', justifyContent: 'space-between' },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.muted,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  flush: { paddingHorizontal: 0 },
  cards: {
    gap: t.layout.itemGap,
    paddingHorizontal: t.layout.screenX,
    paddingBottom: t.layout.itemGap,
  },
  card: {
    paddingHorizontal: t.layout.screenX,
    paddingBottom: t.layout.itemGap,
  },
  tabular: { fontVariant: ['tabular-nums'] },
  stack: { gap: t.space[1] },
}));

export { useStoryStyles };

export function SitePreview({
  name,
  headline,
  tagline,
  sections = 1,
}: {
  name: string;
  headline: string;
  tagline: string;
  sections?: number;
}) {
  const t = useTheme();
  const s = useStoryStyles();
  const heroBg = { backgroundColor: t.colors.mutedForeground };
  const heroText = { color: t.colors.background };
  return (
    <View style={s.site}>
      <View style={s.bar}>
        <Text variant="caption" style={s.onBar}>
          무료 배송 50,000원 이상
        </Text>
      </View>
      <View style={s.nav}>
        <Text variant="label" weight="bold">
          {name}
        </Text>
        <Text variant="label">☰</Text>
      </View>
      <View style={[s.hero, heroBg]}>
        <Text variant="title" style={heroText}>
          {headline}
        </Text>
        <Text variant="caption" style={heroText}>
          {tagline}
        </Text>
      </View>
      {Array.from({ length: sections }).map((_, i) => (
        <View key={i} style={s.block}>
          <Text variant="label" weight="bold">
            새로 들어온 상품
          </Text>
          <View style={s.grid}>
            {[0, 1, 2, 3].map((k) => (
              <View key={k} style={s.tile} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
