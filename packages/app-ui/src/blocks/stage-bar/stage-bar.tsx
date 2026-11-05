import { Fragment } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { ChevronGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type StageBarItem<T extends string> = {
  value: T;
  label: string;
  count?: number;
  flow?: boolean;
};

export type StageBarProps<T extends string> = {
  items: readonly StageBarItem<T>[];
  value: T | null;
  onValueChange: (value: T | null) => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: t.layout.screenX,
    padding: t.space[1],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  stage: {
    flex: 1,
    alignItems: 'center',
    gap: t.space[1] / 2,
    paddingVertical: t.space[2],
    borderRadius: t.radius.md,
  },
  on: { backgroundColor: t.colors.background, boxShadow: t.shadow.sm },
  count: {
    fontSize: t.typography.title.fontSize,
    lineHeight: t.typography.title.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  split: {
    width: 1,
    alignSelf: 'stretch',
    marginVertical: t.space[2],
    backgroundColor: t.colors.border,
  },
}));

export function StageBar<T extends string>({
  items,
  value,
  onValueChange,
  style,
}: StageBarProps<T>) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]} accessibilityRole="tablist">
      {items.map((item, i) => {
        const on = item.value === value;
        const next = items[i + 1];
        const live = (item.count ?? 0) > 0;
        return (
          <Fragment key={item.value}>
            <PressableBase
              accessibilityRole="tab"
              accessibilityState={{ selected: on }}
              accessibilityLabel={`${item.label} ${item.count ?? 0}`}
              onPress={() => onValueChange(on ? null : item.value)}
              style={[s.stage, on && s.on]}
            >
              <Text
                weight="bold"
                tone={live ? 'primary' : 'muted'}
                style={s.count}
              >
                {item.count ?? 0}
              </Text>
              <Text
                variant="caption"
                weight={on ? 'bold' : undefined}
                tone={on ? 'default' : 'muted'}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </PressableBase>
            {next ? (
              next.flow === false ? (
                <View style={s.split} />
              ) : (
                <ChevronGlyph
                  color={t.colors.mutedForeground}
                  size={t.iconSize.sm}
                />
              )
            ) : null}
          </Fragment>
        );
      })}
    </View>
  );
}
