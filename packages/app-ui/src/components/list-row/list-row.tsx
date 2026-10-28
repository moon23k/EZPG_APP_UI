import { Text, View } from 'react-native';
import { ChevronGlyph } from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import {
  PressableBase,
  type PressableBaseProps,
} from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ListRowProps = Omit<
  PressableBaseProps,
  'children' | 'touchHeight'
> & {
  title: string;
  description?: string;
  leading?: IconSlot;
  trailing?: IconSlot;
  chevron?: boolean;
  titleLines?: number;
};

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: t.listRow.oneLine,
    paddingVertical: t.space[3],
    paddingHorizontal: t.space[4],
    backgroundColor: t.colors.background,
  },
  pressed: { backgroundColor: t.colors.muted },
  body: { flex: 1, gap: t.space[1] },
  title: {
    ...t.typography.body,
    fontFamily: t.fontFamily,
    color: t.colors.foreground,
  },
  description: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
}));

export function ListRow({
  title,
  description,
  leading,
  trailing,
  chevron,
  titleLines = 1,
  onPress,
  style,
  ...rest
}: ListRowProps) {
  const t = useTheme();
  const s = useStyles();
  const icon = { color: t.colors.mutedForeground, size: t.iconSize.md };
  const showChevron = chevron ?? !!onPress;

  const content = (
    <>
      {leading ? renderIcon(leading, icon) : null}
      <View style={s.body}>
        <Text
          numberOfLines={titleLines}
          maxFontSizeMultiplier={t.maxFontScale}
          style={s.title}
        >
          {title}
        </Text>
        {description ? (
          <Text
            numberOfLines={2}
            maxFontSizeMultiplier={t.maxFontScale}
            style={s.description}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {trailing || showChevron ? (
        <View style={s.trailing}>
          {trailing ? renderIcon(trailing, icon) : null}
          {showChevron ? (
            <ChevronGlyph
              color={t.colors.mutedForeground}
              size={t.iconSize.sm}
            />
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (!onPress) {
    return <View style={[s.row, style]}>{content}</View>;
  }
  return (
    <PressableBase
      {...rest}
      onPress={onPress}
      pressedStyle={s.pressed}
      style={[s.row, style]}
    >
      {content}
    </PressableBase>
  );
}
