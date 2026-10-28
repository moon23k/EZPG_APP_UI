export const semantic = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    muted: '#f5f5f5',
    mutedForeground: '#525252',
    border: '#e5e5e5',
    input: '#d4d4d4',
    ring: '#a3a3a3',
    primary: '#171717',
    primaryForeground: '#fafafa',
    danger: '#b91c1c',
    dangerForeground: '#ffffff',
    success: '#15803d',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#0a0a0a',
    info: '#2563eb',
    infoForeground: '#ffffff',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    border: '#262626',
    input: '#404040',
    ring: '#737373',
    primary: '#fafafa',
    primaryForeground: '#171717',
    danger: '#f87171',
    dangerForeground: '#0a0a0a',
    success: '#4ade80',
    successForeground: '#0a0a0a',
    warning: '#fbbf24',
    warningForeground: '#0a0a0a',
    info: '#60a5fa',
    infoForeground: '#0a0a0a',
  },
} as const;

export const space = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

export const typography = {
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  bodyLg: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '400',
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  display: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
} as const;

export const shadow = {
  sm: '0px 1px 2px rgba(0, 0, 0, 0.08)',
  md: '0px 4px 12px rgba(0, 0, 0, 0.12)',
} as const;

export const motion = {
  duration: 200,
} as const;

export const opacity = {
  pressed: 0.8,
  disabled: 0.5,
} as const;

export const iconSize = {
  sm: 16,
  md: 20,
} as const;

export const touch = {
  ios: 44,
  android: 48,
} as const;

export const layout = {
  screenX: 16,
  screenTop: 24,
  titleGap: 24,
  sectionGap: 32,
  groupGap: 12,
  itemGap: 8,
  footerTop: 12,
  footerBottom: 16,
} as const;

export const controlSize = {
  sm: 44,
  md: 48,
  lg: 52,
} as const;

export const frame = {
  header: 52,
  listRow: 56,
  listRow2: 72,
  listRow3: 88,
} as const;
