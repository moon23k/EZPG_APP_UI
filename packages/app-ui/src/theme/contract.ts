export const TONES = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
  'primary',
] as const;
export type Tone = (typeof TONES)[number];

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'danger',
] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];
