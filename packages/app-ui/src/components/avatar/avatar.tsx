import { useState } from 'react';
import { Image, View, type StyleProp, type ViewStyle } from 'react-native';
import { CameraGlyph, PersonGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = {
  uri?: string | null;
  size?: AvatarSize;
  editable?: boolean;
  hero?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const SIZE: Record<AvatarSize, number> = { sm: 32, md: 48, lg: 80 };
const BADGE = 26;

const useStyles = makeStyles((t) => ({
  root: { alignSelf: 'center' },
  hero: { paddingTop: t.space[8], paddingBottom: t.space[6] },
  circle: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.radius.full,
    backgroundColor: t.colors.muted,
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: BADGE,
    height: BADGE,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
}));

export function Avatar({
  uri,
  size = 'md',
  editable = false,
  hero = false,
  onPress,
  accessibilityLabel,
  style,
}: AvatarProps) {
  const t = useTheme();
  const s = useStyles();
  const [failed, setFailed] = useState<string | null>(null);
  const px = SIZE[size];
  const shown = uri && failed !== uri ? uri : null;
  const body = (
    <View>
      <View style={[s.circle, { width: px, height: px }]}>
        {shown ? (
          <Image
            source={{ uri: shown }}
            style={{ width: px, height: px }}
            onError={() => setFailed(shown)}
          />
        ) : (
          <PersonGlyph size={px * 0.6} color={t.colors.input} />
        )}
      </View>
      {editable ? (
        <View style={s.badge}>
          <CameraGlyph size={t.iconSize.sm} color={t.colors.mutedForeground} />
        </View>
      ) : null}
    </View>
  );
  if (!onPress) {
    return <View style={[s.root, hero && s.hero, style]}>{body}</View>;
  }
  return (
    <PressableBase
      style={[s.root, hero && s.hero, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
    >
      {body}
    </PressableBase>
  );
}
