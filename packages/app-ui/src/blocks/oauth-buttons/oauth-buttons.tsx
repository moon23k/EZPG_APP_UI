import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { makeStyles } from '../../utils/styles';

export type OAuthProvider = 'kakao' | 'naver' | 'google' | 'apple';

export type OAuthButtonsProps = {
  providers: readonly OAuthProvider[];
  onPress: (provider: OAuthProvider) => void;
  icons?: Partial<Record<OAuthProvider, ReactNode>>;
  loading?: OAuthProvider | null;
  labels?: Partial<Record<OAuthProvider, string>>;
  style?: StyleProp<ViewStyle>;
};

const BRAND: Record<
  OAuthProvider,
  { bg: string; fg: string; border?: string; label: string }
> = {
  kakao: { bg: '#FEE500', fg: 'rgba(0, 0, 0, 0.85)', label: '카카오 로그인' },
  naver: { bg: '#03C75A', fg: '#FFFFFF', label: '네이버 로그인' },
  google: {
    bg: '#FFFFFF',
    fg: '#1F1F1F',
    border: '#747775',
    label: 'Google 계정으로 로그인',
  },
  apple: { bg: '#000000', fg: '#FFFFFF', label: 'Apple로 로그인' },
};

const HEIGHT = 48;

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  button: {
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[2],
    paddingHorizontal: t.space[4],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  icon: { position: 'absolute', left: t.space[4] },
  label: {
    fontSize: t.typography.body.fontSize,
    fontWeight: '600',
    fontFamily: t.fontFamily,
  },
}));

export function OAuthButtons({
  providers,
  onPress,
  icons = {},
  loading = null,
  labels = {},
  style,
}: OAuthButtonsProps) {
  const s = useStyles();
  const shown = providers.filter((p) => p !== 'apple' || Platform.OS === 'ios');
  return (
    <View style={[s.root, style]}>
      {shown.map((p) => {
        const brand = BRAND[p];
        const label = labels[p] ?? brand.label;
        return (
          <PressableBase
            key={p}
            accessibilityLabel={label}
            disabled={loading !== null}
            accessibilityState={{ busy: loading === p }}
            onPress={() => onPress(p)}
            style={[
              s.button,
              {
                backgroundColor: brand.bg,
                borderColor: brand.border ?? brand.bg,
              },
            ]}
          >
            {icons[p] ? <View style={s.icon}>{icons[p]}</View> : null}
            {loading === p ? (
              <ActivityIndicator size="small" color={brand.fg} />
            ) : (
              <Text numberOfLines={1} style={[s.label, { color: brand.fg }]}>
                {label}
              </Text>
            )}
          </PressableBase>
        );
      })}
    </View>
  );
}
