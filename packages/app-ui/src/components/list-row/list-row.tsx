import { Text, View } from 'react-native';
import { ChevronGlyph } from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import {
  PressableBase,
  type PressableBaseProps,
} from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Photo } from '../photo/photo';

export type ListRowTone = 'muted' | 'warning' | 'danger';

export type ListRowProps = Omit<
  PressableBaseProps,
  'children' | 'touchHeight'
> & {
  title: string;
  description?: string;
  overline?: string;
  overlineTone?: ListRowTone;
  leading?: IconSlot;
  image?: string | null;
  trailing?: IconSlot;
  chevron?: boolean;
  value?: string;
  meta?: string;
  highlighted?: boolean;
  strong?: boolean;
  titleLines?: number;
};

const IMAGE = 48;

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[3],
    minHeight: t.listRow.oneLine,
    paddingVertical: t.space[2],
    paddingHorizontal: t.layout.screenX,
    backgroundColor: t.colors.background,
  },
  twoLine: { minHeight: t.listRow.twoLine },
  threeLine: { minHeight: t.listRow.threeLine },
  pressed: { backgroundColor: t.colors.muted },
  highlighted: { backgroundColor: t.colors.primaryTint },
  top: { alignItems: 'flex-start' },
  image: { width: IMAGE },
  value: {
    ...t.typography.bodyLg,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
    fontVariant: ['tabular-nums'],
  },
  meta: {
    ...t.typography.label,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
  body: { flex: 1 },
  overline: {
    ...t.typography.caption,
    fontFamily: t.fontFamily,
    fontWeight: '600',
  },
  muted: { color: t.colors.mutedForeground },
  warning: { color: t.colors.warningText },
  danger: { color: t.colors.danger },
  title: {
    ...t.typography.bodyLg,
    fontFamily: t.fontFamily,
    color: t.colors.foreground,
  },
  description: {
    ...t.typography.label,
    fontFamily: t.fontFamily,
    color: t.colors.mutedForeground,
  },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  strong: { color: t.colors.foreground, fontWeight: '700' },
}));

export function ListRow({
  title,
  description,
  overline,
  overlineTone = 'muted',
  leading,
  image,
  trailing,
  chevron,
  value,
  meta,
  highlighted = false,
  strong = false,
  titleLines = 1,
  onPress,
  style,
  ...rest
}: ListRowProps) {
  const t = useTheme();
  const s = useStyles();
  const icon = { color: t.colors.mutedForeground, size: t.iconSize.md };
  const showChevron = chevron ?? !!onPress;
  const lines = [overline, description].filter(Boolean).length;
  const height = lines === 2 ? s.threeLine : lines === 1 ? s.twoLine : null;

  const content = (
    <>
      {leading ? renderIcon(leading, icon) : null}
      {image !== undefined ? (
        <Photo
          source={{ uri: image ?? '' }}
          radius={t.radius.md}
          style={s.image}
        />
      ) : null}
      <View style={s.body}>
        {overline ? (
          <Text
            numberOfLines={1}
            maxFontSizeMultiplier={t.maxFontScale}
            style={[s.overline, s[overlineTone]]}
          >
            {overline}
          </Text>
        ) : null}
        <Text
          numberOfLines={titleLines}
          maxFontSizeMultiplier={t.maxFontScale}
          style={[s.title, strong && s.strong]}
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
      {meta ? (
        <Text maxFontSizeMultiplier={t.maxFontScale} style={s.meta}>
          {meta}
        </Text>
      ) : null}
      {trailing || value || showChevron ? (
        <View style={s.trailing}>
          {value ? (
            <Text
              maxFontSizeMultiplier={t.maxFontScale}
              style={[s.value, strong && s.strong]}
            >
              {value}
            </Text>
          ) : null}
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
    return (
      <View
        style={[
          s.row,
          height,
          meta && s.top,
          highlighted && s.highlighted,
          style,
        ]}
      >
        {content}
      </View>
    );
  }
  return (
    <PressableBase
      {...rest}
      onPress={onPress}
      pressedStyle={s.pressed}
      style={[
        s.row,
        height,
        meta && s.top,
        highlighted && s.highlighted,
        style,
      ]}
    >
      {content}
    </PressableBase>
  );
}
