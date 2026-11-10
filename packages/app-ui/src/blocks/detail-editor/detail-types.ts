export type DetailFont = 'gothic' | 'serif' | 'display' | 'hand';
export type DetailWeight = 'regular' | 'bold' | 'heavy';
export type DetailEffect = 'none' | 'shadow' | 'outline' | 'band';
export type DetailLayout =
  'text' | 'image' | 'image_top' | 'text_top' | 'side' | 'two_images' | 'card';

export type DetailTextStyle = {
  font?: DetailFont;
  size?: number;
  weight?: DetailWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
  effect?: DetailEffect;
  line?: number;
  tracking?: number;
};

export type DetailLayer = {
  id: string;
  type: 'text' | 'image';
  text?: string | null;
  url?: string | null;
  asset_id?: string | null;
  style?: DetailTextStyle | null;
  hidden?: boolean;
};

export type DetailBlock = {
  id: string;
  layout: DetailLayout;
  background?: {
    color?: string | null;
    url?: string | null;
    asset_id?: string | null;
  };
  space_top?: number;
  space_bottom?: number;
  layers: DetailLayer[];
};

export type DetailDocValue = {
  version?: number;
  background?: string | null;
  blocks: DetailBlock[];
};

export type DetailSelection = { block: string; layer?: string } | null;

export const DETAIL_LAYOUTS: readonly DetailLayout[] = [
  'image_top',
  'text_top',
  'side',
  'image',
  'two_images',
  'card',
  'text',
];

export const DETAIL_FONT_FAMILY: Record<
  DetailFont,
  Record<DetailWeight, string>
> = {
  gothic: {
    regular: 'Pretendard-Regular',
    bold: 'Pretendard-Bold',
    heavy: 'Pretendard-ExtraBold',
  },
  serif: {
    regular: 'NanumMyeongjo',
    bold: 'NanumMyeongjoBold',
    heavy: 'NanumMyeongjoBold',
  },
  display: {
    regular: 'BlackHanSans-Regular',
    bold: 'BlackHanSans-Regular',
    heavy: 'BlackHanSans-Regular',
  },
  hand: {
    regular: 'NanumPen-Regular',
    bold: 'NanumPen-Regular',
    heavy: 'NanumPen-Regular',
  },
};

const clamp = (value: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, value));

export function detailFontSize(size = 5): number {
  return 12 + (clamp(size, 1, 10) - 1) * 2;
}

export function detailLineHeight(line = 5): number {
  return 1.05 + clamp(line, 1, 10) * 0.08;
}

export function detailTracking(tracking = 0): number {
  return clamp(tracking, -5, 10) * 0.01;
}

export function detailBlockSpace(space = 0): number {
  return clamp(space, 0, 10) * 8;
}

export const DETAIL_COLORS: readonly { value: string; label: string }[] = [
  { value: '#1A1A1A', label: '잉크' },
  { value: '#FFFFFF', label: '흰색' },
  { value: '#F4F4F5', label: '연회색' },
  { value: '#EFE7DC', label: '베이지' },
  { value: '#3B2F25', label: '고동' },
  { value: '#C54211', label: '주황' },
  { value: '#2F4A2B', label: '초록' },
  { value: '#1F3A5F', label: '남색' },
];
