import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Button } from '../../components/button/button';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';

export type ShippingStep =
  'ready' | 'pickedUp' | 'inTransit' | 'outForDelivery' | 'delivered';

const STEPS: { key: ShippingStep; label: string }[] = [
  { key: 'ready', label: '접수' },
  { key: 'pickedUp', label: '집화' },
  { key: 'inTransit', label: '이동 중' },
  { key: 'outForDelivery', label: '배송 출발' },
  { key: 'delivered', label: '도착' },
];

export type ShippingTrackingRowProps = {
  carrier: string;
  trackingNumber: string;
  step: ShippingStep;
  onCopy?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3], paddingVertical: t.space[3] },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  number: { flex: 1 },
  steps: { flexDirection: 'row' },
  step: { flex: 1, alignItems: 'center', gap: t.space[1] },
  dot: {
    width: 10,
    height: 10,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.border,
  },
  on: { backgroundColor: t.colors.primary },
  line: {
    position: 'absolute',
    top: 4,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: t.colors.border,
  },
  lineOn: { backgroundColor: t.colors.primary },
}));

export function ShippingTrackingRow({
  carrier,
  trackingNumber,
  step,
  onCopy,
  style,
}: ShippingTrackingRowProps) {
  const s = useStyles();
  const current = STEPS.findIndex((x) => x.key === step);
  return (
    <View style={[s.root, style]}>
      <View style={s.head}>
        <View style={s.number}>
          <Text weight="semibold">{carrier}</Text>
          <Text tone="muted" selectable>
            {trackingNumber}
          </Text>
        </View>
        {onCopy ? (
          <Button size="sm" variant="outline" onPress={onCopy}>
            복사
          </Button>
        ) : null}
      </View>
      <View
        style={s.steps}
        accessible
        accessibilityLabel={`배송 ${STEPS[current]?.label ?? ''}, ${STEPS.length}단계 중 ${current + 1}단계`}
      >
        {STEPS.map((x, i) => (
          <View key={x.key} style={s.step}>
            {i < STEPS.length - 1 ? (
              <View style={[s.line, i < current && s.lineOn]} />
            ) : null}
            <View style={[s.dot, i <= current && s.on]} />
            <Text variant="caption" tone={i === current ? 'default' : 'muted'}>
              {x.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
