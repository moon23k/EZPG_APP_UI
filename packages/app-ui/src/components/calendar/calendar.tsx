import { useState } from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type CalendarDate = { date: string; label?: string; disabled?: boolean };
export type CalendarValue = { start?: string; end?: string };

export type CalendarProps = {
  days: readonly CalendarDate[];
  mode?: 'single' | 'range';
  value: CalendarValue;
  onValueChange: (value: CalendarValue) => void;
  style?: StyleProp<ViewStyle>;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const DAY_MS = 86_400_000;

function utc(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y!, m! - 1, d!);
}

export function nightsBetween(start: string, end: string): number {
  return Math.round((utc(end) - utc(start)) / DAY_MS);
}

function weekday(iso: string): number {
  return new Date(utc(iso)).getUTCDay();
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3] },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrow: { width: 44, alignItems: 'center', justifyContent: 'center' },
  month: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.title.fontSize,
    lineHeight: t.typography.title.lineHeight,
    fontWeight: '700',
    color: t.colors.foreground,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, padding: t.space[1] / 2 },
  weekday: {
    textAlign: 'center',
    fontFamily: t.fontFamily,
    fontSize: t.typography.caption.fontSize,
    lineHeight: t.typography.caption.lineHeight,
    color: t.colors.mutedForeground,
  },
  day: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.sm,
    backgroundColor: t.colors.muted,
  },
  edge: { backgroundColor: t.colors.primary },
  inside: { backgroundColor: t.colors.border },
  off: { backgroundColor: 'transparent' },
  struck: { textDecorationLine: 'line-through' },
  number: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  sub: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.caption.fontSize,
    lineHeight: t.typography.caption.lineHeight,
  },
}));

export function Calendar({
  days,
  mode = 'single',
  value,
  onValueChange,
  style,
}: CalendarProps) {
  const t = useTheme();
  const s = useStyles();
  const months = [...new Set(days.map((d) => d.date.slice(0, 7)))];
  const [page, setPage] = useState(() =>
    Math.max(0, months.indexOf((value.start ?? '').slice(0, 7)))
  );
  const month = months[page] ?? months[0] ?? '';
  const shown = days.filter((d) => d.date.startsWith(month));
  const [year, monthNo] = month.split('-').map(Number);
  const openUntil = (start: string, end: string) => {
    const nights = days.filter((d) => d.date >= start && d.date < end);
    return (
      nights.length === nightsBetween(start, end) &&
      nights.every((d) => !d.disabled)
    );
  };
  const canEnd = (iso: string) =>
    mode === 'range' &&
    !!value.start &&
    !value.end &&
    iso > value.start &&
    openUntil(value.start, iso);
  const pick = (day: CalendarDate) => {
    if (mode === 'single') onValueChange({ start: day.date });
    else if (canEnd(day.date))
      onValueChange({ start: value.start, end: day.date });
    else if (!day.disabled) onValueChange({ start: day.date });
  };
  const look = (iso: string) => {
    if (iso === value.start || iso === value.end) return 'edge';
    if (value.start && value.end && iso > value.start && iso < value.end)
      return 'inside';
    return 'none';
  };
  const blanks = shown.length ? weekday(shown[0]!.date) : 0;

  return (
    <View style={[s.root, style]}>
      <View style={s.head}>
        <PressableBase
          style={s.arrow}
          accessibilityRole="button"
          accessibilityLabel="이전 달"
          disabled={page <= 0}
          onPress={() => setPage(page - 1)}
        >
          <Text
            style={[s.month, page <= 0 && { color: t.colors.mutedForeground }]}
          >
            ‹
          </Text>
        </PressableBase>
        <Text style={s.month}>{`${year}년 ${monthNo}월`}</Text>
        <PressableBase
          style={s.arrow}
          accessibilityRole="button"
          accessibilityLabel="다음 달"
          disabled={page >= months.length - 1}
          onPress={() => setPage(page + 1)}
        >
          <Text
            style={[
              s.month,
              page >= months.length - 1 && { color: t.colors.mutedForeground },
            ]}
          >
            ›
          </Text>
        </PressableBase>
      </View>
      <View style={s.grid}>
        {WEEKDAYS.map((w) => (
          <View key={w} style={s.cell}>
            <Text style={s.weekday}>{w}</Text>
          </View>
        ))}
        {Array.from({ length: blanks }, (_, i) => (
          <View key={`blank-${i}`} style={s.cell} />
        ))}
        {shown.map((day) => {
          const state = look(day.date);
          const blocked = !!day.disabled && !canEnd(day.date);
          const color =
            state === 'edge'
              ? t.colors.primaryForeground
              : blocked
                ? t.colors.mutedForeground
                : t.colors.foreground;
          const [, m, d] = day.date.split('-').map(Number);
          return (
            <View key={day.date} style={s.cell}>
              <PressableBase
                style={[
                  s.day,
                  state === 'edge' && s.edge,
                  state === 'inside' && s.inside,
                  blocked && s.off,
                ]}
                accessibilityRole="button"
                accessibilityLabel={[
                  `${m}월 ${d}일`,
                  `${WEEKDAYS[weekday(day.date)]}요일`,
                  day.label,
                ]
                  .filter(Boolean)
                  .join(' ')}
                accessibilityState={{
                  selected: state === 'edge',
                  disabled: blocked,
                }}
                disabled={blocked}
                onPress={() => pick(day)}
              >
                <Text style={[s.number, { color }, blocked && s.struck]}>
                  {d}
                </Text>
                {day.label ? (
                  <Text style={[s.sub, { color }]}>{day.label}</Text>
                ) : null}
              </PressableBase>
            </View>
          );
        })}
      </View>
    </View>
  );
}
