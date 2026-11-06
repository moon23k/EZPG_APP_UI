import { useState } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Field } from '../../components/field/field';
import { ListRow } from '../../components/list-row/list-row';
import { Sheet, SheetOptions } from '../../components/sheet/sheet';
import { Text } from '../../components/text/text';
import { ScanGlyph } from '../../internal/glyphs';
import { ListSection } from '../../templates/parts';
import { makeStyles } from '../../utils/styles';

export type ShipCarrier = { code: string; name: string };

export type BulkShipRow = {
  id: string;
  title: string;
  subtitle?: string;
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
  list: { gap: t.space[4] },
  row: { gap: t.space[1], paddingHorizontal: t.layout.screenX },
}));

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
  const s = useStyles();
  const [picking, setPicking] = useState(false);
  const issues = trackingIssues(rows);
  const selected = carriers.find((c) => c.code === carrier);
  const filled = rows.filter((row) => row.trackingNo.trim()).length;
  return (
    <View style={style}>
      <ListSection card>
        <ListRow
          title="택배사"
          value={selected?.name ?? '선택'}
          chevron
          onPress={() => setPicking(true)}
        />
      </ListSection>
      <ListSection title={`송장 번호 ${filled}/${rows.length}`}>
        <View style={s.list}>
          {rows.map((row) => {
            const issue = issues[row.id];
            return (
              <View key={row.id} style={s.row}>
                <Text variant="label" numberOfLines={1}>
                  {row.subtitle ? `${row.subtitle} · ${row.title}` : row.title}
                </Text>
                <Field
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
                  trailing={onScan ? ScanGlyph : undefined}
                  onTrailingPress={onScan ? () => onScan(row.id) : undefined}
                  trailingLabel={`${row.title} 송장 스캔`}
                />
              </View>
            );
          })}
        </View>
      </ListSection>
      <Sheet
        open={picking}
        onOpenChange={setPicking}
        title="택배사 선택"
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
