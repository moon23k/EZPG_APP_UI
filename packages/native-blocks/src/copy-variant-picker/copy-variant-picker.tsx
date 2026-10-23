import {
  Button,
  makeStyles,
  PressableBase,
  StatusBadge,
  Text,
  useTheme,
} from '@ezpg/native-ui';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export type CopyVariant = { id: string; text: string; locked?: boolean };

export type CopyVariantPickerProps = {
  /** 예) '한 줄 소개' */
  label: string;
  variants: readonly CopyVariant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** 잠그면 다시 만들어도 이 문구는 바뀌지 않는다 */
  onToggleLock?: (id: string) => void;
  /** 다른 기기에서 먼저 수정했을 때(409) */
  conflict?: boolean;
  onReload?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: t.space[3],
    padding: t.space[3],
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  selected: {
    borderColor: t.colors.primary,
    borderWidth: 2,
    padding: t.space[3] - 1,
  },
  radio: {
    width: 18,
    height: 18,
    marginTop: 2,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: t.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: t.colors.primary },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: t.colors.primary,
  },
  body: { flex: 1, gap: t.space[2] },
  meta: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  start: { alignSelf: 'flex-start' },
  conflict: {
    gap: t.space[2],
    padding: t.space[3],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
}));

/** AI가 만든 문구 후보 중 하나 고르기 */
export function CopyVariantPicker({
  label,
  variants,
  selectedId,
  onSelect,
  onToggleLock,
  conflict,
  onReload,
  style,
}: CopyVariantPickerProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      <Text weight="semibold">{label}</Text>
      {conflict ? (
        <View style={s.conflict} accessibilityLiveRegion="polite">
          <Text tone="destructive">다른 기기에서 먼저 수정했어요.</Text>
          {onReload ? (
            <Button
              size="sm"
              variant="outline"
              onPress={onReload}
              style={s.start}
            >
              최신 내용 불러오기
            </Button>
          ) : null}
        </View>
      ) : null}
      <View accessibilityRole="radiogroup" style={s.root}>
        {variants.map((v) => {
          const selected = v.id === selectedId;
          return (
            <PressableBase
              key={v.id}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={v.text}
              pressedStyle={{ backgroundColor: t.colors.muted }}
              onPress={() => onSelect(v.id)}
              style={[s.item, selected && s.selected]}
            >
              <View style={[s.radio, selected && s.radioOn]}>
                {selected ? <View style={s.radioDot} /> : null}
              </View>
              <View style={s.body}>
                <Text>{v.text}</Text>
                {v.locked || onToggleLock ? (
                  <View style={s.meta}>
                    {v.locked ? <StatusBadge>잠금</StatusBadge> : null}
                    {onToggleLock ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onPress={() => onToggleLock(v.id)}
                      >
                        {v.locked ? '잠금 해제' : '잠그기'}
                      </Button>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </PressableBase>
          );
        })}
      </View>
    </View>
  );
}
