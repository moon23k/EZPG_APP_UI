export const semantic = {
  light: {
    background: '#f5f5f4',
    surface: '#ffffff',
    foreground: '#2a2622',
    muted: '#ebebea',
    mutedForeground: '#605f5e',
    border: '#dededc',
    input: '#c2c2c1',
    ring: '#a3a3a3',
    primary: '#c2410c',
    primaryForeground: '#ffffff',
    primaryTint: '#efe3dd',
    primaryContainer: '#e6cabd',
    primaryEdge: '#b8430e',
    point: '#b8430e',
    danger: '#b91c1c',
    dangerForeground: '#ffffff',
    success: '#15803d',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#0a0a0a',
    warningText: '#b45309',
    info: '#2563eb',
    infoForeground: '#ffffff',
  },
  dark: {
    background: '#0a0a0a',
    surface: '#171717',
    foreground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    border: '#262626',
    input: '#404040',
    ring: '#737373',
    primary: '#fdba8c',
    primaryForeground: '#431407',
    primaryTint: '#431407',
    primaryContainer: '#7c2d12',
    primaryEdge: '#d9764a',
    point: '#fdba8c',
    danger: '#f87171',
    dangerForeground: '#0a0a0a',
    success: '#4ade80',
    successForeground: '#0a0a0a',
    warning: '#fbbf24',
    warningForeground: '#0a0a0a',
    warningText: '#fbbf24',
    info: '#60a5fa',
    infoForeground: '#0a0a0a',
  },
} as const;

export const tile = [
  '#d8d2c8',
  '#c8d2d6',
  '#d6cdd3',
  '#ccd5c8',
  '#ddd5bf',
] as const;

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
