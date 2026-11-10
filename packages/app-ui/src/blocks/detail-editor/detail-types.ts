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
  layers: DetailLayer[];
};

export type DetailDocValue = { version?: number; blocks: DetailBlock[] };

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
  hand: { regular: 'NanumPen', bold: 'NanumPen', heavy: 'NanumPen' },
};

export function detailFontSize(size = 5): number {
  return 12 + (Math.min(10, Math.max(1, size)) - 1) * 2;
}
