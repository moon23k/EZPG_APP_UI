import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { CheckGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ConsentItem = {
  key: string;
  label: string;
  required: boolean;
  checked: boolean;
  onView?: () => void;
};

export type ConsentListProps = {
  items: readonly ConsentItem[];
  onChange: (key: string, checked: boolean) => void;
  onChangeAll: (checked: boolean) => void;
  allLabel?: string;
  viewLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const MARK = 20;

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[4] },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    minHeight: MARK,
  },
  label: { flex: 1 },
  circle: {
    width: MARK,
    height: MARK,
    borderRadius: t.radius.full,
    borderWidth: 1.5,
    borderColor: t.colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOn: {
    backgroundColor: t.colors.primary,
    borderColor: t.colors.primary,
  },
  plain: {
    width: MARK,
    height: MARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: { textDecorationLine: 'underline' },
}));

export function ConsentList({
  items,
  onChange,
  onChangeAll,
  allLabel = '약관 전체 동의',
  viewLabel = '보기',
  style,
}: ConsentListProps) {
  const t = useTheme();
  const s = useStyles();
  const ordered = [
    ...items.filter((i) => i.required),
    ...items.filter((i) => !i.required),
  ];
  const all = items.every((i) => i.checked);
  return (
    <View style={[s.root, style]}>
      <PressableBase
        accessibilityRole="checkbox"
        accessibilityState={{ checked: all }}
        onPress={() => onChangeAll(!all)}
        touchHeight={MARK}
        style={s.row}
      >
        <View style={[s.circle, all && s.circleOn]}>
          {all ? (
            <CheckGlyph
              color={t.colors.primaryForeground}
              size={t.iconSize.sm}
            />
          ) : null}
        </View>
        <Text variant="bodyLg" weight="semibold" style={s.label}>
          {allLabel}
        </Text>
      </PressableBase>
      {ordered.map((item) => {
        const label = `${item.required ? '[필수]' : '[선택]'} ${item.label}`;
        return (
          <PressableBase
            key={item.key}
            accessibilityRole="checkbox"
            accessibilityLabel={label}
            accessibilityState={{ checked: item.checked }}
            onPress={() => onChange(item.key, !item.checked)}
            touchHeight={MARK}
            style={s.row}
          >
            <View style={s.plain}>
              <CheckGlyph
                color={item.checked ? t.colors.primary : t.colors.input}
                size={MARK}
              />
            </View>
            <Text style={s.label}>{label}</Text>
            {item.onView ? (
              <PressableBase
                onPress={item.onView}
                accessibilityRole="button"
                accessibilityLabel={`${item.label} ${viewLabel}`}
              >
                <Text variant="label" tone="muted" style={s.view}>
                  {viewLabel}
                </Text>
              </PressableBase>
            ) : null}
          </PressableBase>
        );
      })}
    </View>
  );
}
