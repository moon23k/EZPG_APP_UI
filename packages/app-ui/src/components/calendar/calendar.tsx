import { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { ChevronGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type CalendarDate = {
  date: string;
  label?: string;
  disabled?: boolean;
  marked?: boolean;
};
export type CalendarValue = { start?: string; end?: string };

export type CalendarProps = {
  days: readonly CalendarDate[];
  mode?: 'single' | 'range';
  value: CalendarValue;
  onValueChange: (value: CalendarValue) => void;
  stacked?: boolean;
  today?: string;
  style?: StyleProp<ViewStyle>;
};

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const DAY_MS = 86_400_000;
const CELL = 48;
const LABELED = 64;
const DOT = 40;

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

function monthDates(month: string): string[] {
  const [y, m] = month.split('-').map(Number);
  const last = new Date(Date.UTC(y!, m!, 0)).getUTCDate();
  return Array.from(
    { length: last },
    (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`
  );
}

function localToday(): string {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
}

const useStyles = makeStyles((t) => ({
  stacked: { flex: 1 },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  headTitle: {
    flex: 1,
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontWeight: '500',
    color: t.colors.foreground,
  },
  arrow: { width: CELL, height: CELL },
  arrowInner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: { transform: [{ scaleX: -1 }] },
  weekdays: { flexDirection: 'row', height: CELL, alignItems: 'center' },
  weekdaysPinned: {
    paddingHorizontal: t.space[3],
    borderBottomWidth: 1,
    borderBottomColor: t.colors.border,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontFamily: t.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    color: t.colors.foreground,
  },
  months: { paddingHorizontal: t.space[3], paddingBottom: t.space[6] },
  subhead: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
    fontWeight: '500',
    color: t.colors.mutedForeground,
    paddingLeft: t.space[3],
    paddingTop: t.space[5],
    paddingBottom: t.space[2],
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, alignItems: 'center' },
  band: {
    position: 'absolute',
    top: t.space[1],
    height: DOT,
    left: 0,
    right: 0,
    backgroundColor: t.colors.primaryTint,
  },
  bandStart: { left: '50%' },
  bandEnd: { right: '50%' },
  day: {
    width: DOT,
    height: DOT,
    marginTop: t.space[1],
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: { borderWidth: 1, borderColor: t.colors.primary },
  edge: { backgroundColor: t.colors.primary },
  number: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.body.fontSize,
    lineHeight: t.typography.body.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  label: {
    fontFamily: t.fontFamily,
    fontSize: t.typography.caption.fontSize,
    lineHeight: t.typography.caption.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: t.radius.full,
    marginTop: t.space[1] / 2,
    backgroundColor: t.colors.foreground,
  },
}));

export function Calendar({
  days,
  mode = 'single',
  value,
  onValueChange,
  stacked = false,
  today = localToday(),
  style,
}: CalendarProps) {
  const t = useTheme();
  const s = useStyles();
  const byDate = new Map(days.map((d) => [d.date, d]));
  const months = [...new Set(days.map((d) => d.date.slice(0, 7)))];
  const [page, setPage] = useState(() =>
    Math.max(0, months.indexOf((value.start ?? '').slice(0, 7)))
  );
  const height = days.some((d) => d.label) ? LABELED : CELL;
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
    else if (day.date === value.start && !value.end) onValueChange({});
    else if (canEnd(day.date))
      onValueChange({ start: value.start, end: day.date });
    else if (!day.disabled) onValueChange({ start: day.date });
  };
  const ranged = !!value.start && !!value.end && value.start !== value.end;
  const look = (iso: string) => {
    if (iso === value.start || iso === value.end) return 'edge';
    if (ranged && iso > value.start! && iso < value.end!) return 'inside';
    return 'none';
  };

  const weekdays = (pinned: boolean) => (
    <View style={[s.weekdays, pinned && s.weekdaysPinned]}>
      {WEEKDAYS.map((w) => (
        <Text key={w} style={s.weekday}>
          {w}
        </Text>
      ))}
    </View>
  );

  const grid = (month: string) => {
    const dates = monthDates(month);
    return (
      <View style={s.grid}>
        {Array.from({ length: weekday(dates[0]!) }, (_, i) => (
          <View key={`blank-${i}`} style={[s.cell, { height }]} />
        ))}
        {dates.map((iso) => {
          const day = byDate.get(iso);
          const state = look(iso);
          const blocked = !day || (!!day.disabled && !canEnd(iso));
          const isToday = iso === today && state !== 'edge';
          const color =
            state === 'edge'
              ? t.colors.primaryForeground
              : blocked
                ? t.colors.input
                : isToday
                  ? t.colors.primary
                  : t.colors.foreground;
          const [, m, d] = iso.split('-').map(Number);
          return (
            <View key={iso} style={[s.cell, { height }]}>
              {ranged && state !== 'none' ? (
                <View
                  style={[
                    s.band,
                    iso === value.start && s.bandStart,
                    iso === value.end && s.bandEnd,
                  ]}
                />
              ) : null}
              <PressableBase
                style={[s.day, isToday && s.today, state === 'edge' && s.edge]}
                accessibilityRole="button"
                accessibilityLabel={[
                  `${m}월 ${d}일`,
                  `${WEEKDAYS[weekday(iso)]}요일`,
                  day?.label,
                ]
                  .filter(Boolean)
                  .join(' ')}
                accessibilityState={{
                  selected: state === 'edge',
                  disabled: blocked,
                }}
                disabled={blocked}
                onPress={() => day && pick(day)}
              >
                <Text style={[s.number, { color }]}>{d}</Text>
              </PressableBase>
              {day?.label ? (
                <Text
                  numberOfLines={1}
                  style={[
                    s.label,
                    {
                      color:
                        state === 'none'
                          ? t.colors.mutedForeground
                          : t.colors.foreground,
                    },
                  ]}
                >
                  {day.label}
                </Text>
              ) : null}
              {day?.marked ? <View style={s.dot} /> : null}
            </View>
          );
        })}
      </View>
    );
  };

  const title = (month: string) => {
    const [y, m] = month.split('-').map(Number);
    return `${y}년 ${m}월`;
  };

  if (stacked) {
    return (
      <View style={[s.stacked, style]}>
        {weekdays(true)}
        <ScrollView contentContainerStyle={s.months}>
          {months.map((month) => (
            <View key={month}>
              <Text style={s.subhead}>{title(month)}</Text>
              {grid(month)}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  const month = months[page] ?? months[0] ?? '';
  const arrow = (dir: -1 | 1) => {
    const off = dir < 0 ? page <= 0 : page >= months.length - 1;
    return (
      <PressableBase
        style={s.arrow}
        accessibilityRole="button"
        accessibilityLabel={dir < 0 ? '이전 달' : '다음 달'}
        disabled={off}
        onPress={() => setPage(page + dir)}
      >
        <View style={[s.arrowInner, dir < 0 && s.back]}>
          <ChevronGlyph
            size={t.iconSize.md}
            color={off ? t.colors.input : t.colors.mutedForeground}
          />
        </View>
      </PressableBase>
    );
  };

  return (
    <View style={style}>
      <View style={s.head}>
        <Text style={s.headTitle}>{title(month)}</Text>
        {arrow(-1)}
        {arrow(1)}
      </View>
      {weekdays(false)}
      {grid(month)}
    </View>
  );
}
