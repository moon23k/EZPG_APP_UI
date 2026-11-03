import { useState } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Field } from '../../components/field/field';
import { ListRow } from '../../components/list-row/list-row';
import { Photo } from '../../components/photo/photo';
import { Sheet, SheetOptions } from '../../components/sheet/sheet';
import { Text } from '../../components/text/text';
import type { IconRenderProps } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ShipCarrier = { code: string; name: string };

export type BulkShipRow = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string | null;
  trackingNo: string;
};

export type BulkShipListProps = {
  carriers: readonly ShipCarrier[];
  carrier: string | null;
  onCarrierChange: (code: string) => void;
  rows: readonly BulkShipRow[];
  onTrackingChange: (id: string, value: string) => void;
  onScan?: (id: string) => void;
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
};

export type TrackingIssue = 'invalid' | 'duplicate';

const TRACKING = /^[0-9-]{8,20}$/;
const INVALID = '숫자와 -만 8~20자리로 입력해 주세요';
const DUPLICATE = '같은 송장 번호가 다른 주문에도 있어요';
const FIELD_HEIGHT = 52;
const THUMB = 48;

export function trackingIssues(
  rows: readonly BulkShipRow[]
): Record<string, TrackingIssue> {
  const key = (v: string) => v.trim().replace(/-/g, '');
  const seen = new Map<string, number>();
  for (const row of rows) {
    const k = key(row.trackingNo);
    if (k && TRACKING.test(row.trackingNo.trim())) {
      seen.set(k, (seen.get(k) ?? 0) + 1);
    }
  }
  const issues: Record<string, TrackingIssue> = {};
  for (const row of rows) {
    const value = row.trackingNo.trim();
    if (!value) continue;
    if (!TRACKING.test(value)) issues[row.id] = 'invalid';
    else if ((seen.get(key(value)) ?? 0) > 1) issues[row.id] = 'duplicate';
  }
  return issues;
}

const useStyles = makeStyles((t) => ({
  head: {
    paddingTop: t.space[4],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  list: { gap: t.space[4] },
  row: { gap: t.space[2], paddingHorizontal: t.layout.screenX },
  item: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  thumb: { width: THUMB },
  body: { flex: 1 },
  input: { flexDirection: 'row', alignItems: 'flex-start', gap: t.space[2] },
  field: { flex: 1 },
  scan: {
    width: FIELD_HEIGHT,
    height: FIELD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.input,
    backgroundColor: t.colors.background,
  },
  pressed: { backgroundColor: t.colors.muted },
}));

const g = StyleSheet.create({ absolute: { position: 'absolute' } });

function ScanGlyph({ color, size }: IconRenderProps) {
  const stroke = Math.max(1.5, size / 12);
  const arm = size * 0.3;
  const corner = (v: 'top' | 'bottom', h: 'left' | 'right') => ({
    position: 'absolute' as const,
    width: arm,
    height: arm,
    borderColor: color,
    [v]: 0,
    [h]: 0,
    [v === 'top' ? 'borderTopWidth' : 'borderBottomWidth']: stroke,
    [h === 'left' ? 'borderLeftWidth' : 'borderRightWidth']: stroke,
  });
  return (
    <View style={{ width: size, height: size }}>
      <View style={corner('top', 'left')} />
      <View style={corner('top', 'right')} />
      <View style={corner('bottom', 'left')} />
      <View style={corner('bottom', 'right')} />
      <View
        style={[
          g.absolute,
          {
            left: size * 0.12,
            right: size * 0.12,
            top: (size - stroke) / 2,
            height: stroke,
            borderRadius: stroke,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export function BulkShipList({
  carriers,
  carrier,
  onCarrierChange,
  rows,
  onTrackingChange,
  onScan,
  bottomInset = 0,
  style,
}: BulkShipListProps) {
  const t = useTheme();
  const s = useStyles();
  const [picking, setPicking] = useState(false);
  const issues = trackingIssues(rows);
  const selected = carriers.find((c) => c.code === carrier);
  return (
    <View style={style}>
      <ListRow
        title="택배사"
        value={selected?.name ?? '선택'}
        chevron
        onPress={() => setPicking(true)}
      />
      <View style={s.head}>
        <Text
          variant="label"
          tone="muted"
          weight="semibold"
          accessibilityRole="header"
        >
          {`${rows.length}건`}
        </Text>
      </View>
      <View style={s.list}>
        {rows.map((row) => {
          const issue = issues[row.id];
          return (
            <View key={row.id} style={s.row}>
              <View style={s.item}>
                {row.image !== undefined ? (
                  <Photo
                    source={{ uri: row.image ?? '' }}
                    radius={t.radius.md}
                    style={s.thumb}
                  />
                ) : null}
                <View style={s.body}>
                  <Text variant="bodyLg" numberOfLines={1}>
                    {row.title}
                  </Text>
                  {row.subtitle ? (
                    <Text variant="label" tone="muted" numberOfLines={1}>
                      {row.subtitle}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View style={s.input}>
                <Field
                  style={s.field}
                  value={row.trackingNo}
                  onChangeText={(v) => onTrackingChange(row.id, v)}
                  placeholder="송장 번호"
                  keyboardType="number-pad"
                  inputMode="numeric"
                  autoCorrect={false}
                  maxLength={20}
                  accessibilityLabel={`${row.title} 송장 번호`}
                  error={issue === 'invalid' ? INVALID : undefined}
                  warning={issue === 'duplicate' ? DUPLICATE : undefined}
                />
                {onScan ? (
                  <PressableBase
                    accessibilityLabel={`${row.title} 송장 스캔`}
                    onPress={() => onScan(row.id)}
                    pressedStyle={s.pressed}
                    style={s.scan}
                  >
                    <ScanGlyph color={t.colors.foreground} size={22} />
                  </PressableBase>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
      <Sheet
        open={picking}
        onOpenChange={setPicking}
        title="택배사"
        bottomInset={bottomInset}
      >
        <SheetOptions
          items={carriers.map((c) => ({ value: c.code, label: c.name }))}
          value={carrier}
          onValueChange={(code) => {
            onCarrierChange(code);
            setPicking(false);
          }}
        />
      </Sheet>
    </View>
  );
}
