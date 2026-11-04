import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { PressableBase } from '../../internal/pressable-base';
import { APPLE_LOGO, GOOGLE_G, KAKAO_SYMBOL, NAVER_N } from './logos';
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
  naver: { bg: '#03A94D', fg: '#FFFFFF', label: '네이버 로그인' },
  google: {
    bg: '#FFFFFF',
    fg: '#1F1F1F',
    border: '#747775',
    label: 'Google 계정으로 로그인',
  },
  apple: { bg: '#000000', fg: '#FFFFFF', label: 'Apple로 로그인' },
};

const HEIGHT = 52;
const LOGO = 18;

const LOGOS: Partial<Record<OAuthProvider, ReactNode>> = {
  kakao: (
    <Image
      source={{ uri: KAKAO_SYMBOL }}
      style={{ width: LOGO, height: LOGO }}
    />
  ),
  naver: (
    <Image source={{ uri: NAVER_N }} style={{ width: LOGO, height: LOGO }} />
  ),
  google: (
    <Image source={{ uri: GOOGLE_G }} style={{ width: LOGO, height: LOGO }} />
  ),
  apple: (
    <Image source={{ uri: APPLE_LOGO }} style={{ width: LOGO, height: LOGO }} />
  ),
};

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
            {(icons[p] ?? LOGOS[p]) ? (
              <View style={s.icon}>{icons[p] ?? LOGOS[p]}</View>
            ) : null}
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

const MARK = 24;

const markStyles = makeStyles((t) => ({
  mark: {
    width: MARK,
    height: MARK,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  logo: { width: t.space[3], height: t.space[3] },
}));

export function OAuthMark({ provider }: { provider: OAuthProvider }) {
  const s = markStyles();
  const brand = BRAND[provider];
  const logo = {
    kakao: KAKAO_SYMBOL,
    naver: NAVER_N,
    google: GOOGLE_G,
    apple: APPLE_LOGO,
  }[provider];
  return (
    <View
      style={[
        s.mark,
        { backgroundColor: brand.bg, borderColor: brand.border ?? brand.bg },
      ]}
    >
      <Image source={{ uri: logo }} style={s.logo} />
    </View>
  );
}
