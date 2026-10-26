import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { makeStyles } from '../utils/styles';

const useStyles = makeStyles((t) => ({
  section: { gap: t.space[2], marginBottom: t.space[6], maxWidth: 420 },
  title: {
    ...t.typography.caption,
    color: t.colors.mutedForeground,
    letterSpacing: 0.4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: t.space[3],
  },
  column: { gap: t.space[3], maxWidth: 360 },
}));

/** 스토리 안에서 묶음마다 제목을 붙인다 */
export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const s = useStyles();
  return (
    <View style={s.section}>
      <Text style={s.title}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <View style={useStyles().row}>{children}</View>;
}

export function Column({ children }: { children: ReactNode }) {
  return <View style={useStyles().column}>{children}</View>;
}

export const sample = (id: number, w = 600, h = w) => ({
  uri: `https://picsum.photos/id/${id}/${w}/${h}`,
});

export const demoStore = {
  name: '카페 온기',
  industry: '카페 · 서울 성수동',
  tagline: '매일 아침 볶은 원두로 내리는 한 잔',
};

export const demoStoreNames = {
  fashion: '오늘의 옷장',
  cafe: demoStore.name,
  living: '살림공방',
  stationery: '문구점 모노',
};

export const demoProducts = {
  shirt: '린넨 오버핏 셔츠',
  beans: '하우스 블렌드 원두 200g',
  mug: '스톤웨어 머그컵',
  notebook: '도트 노트 A5',
  pens: '젤펜 3종 세트',
  towel: '호텔식 수건 2장',
  tumbler: '보온 텀블러 500ml',
  dripBag: '드립백 커피 10개입',
  card: '메시지 카드',
  long: '아주 긴 상품 이름이 한 줄을 넘어가면 말줄임으로 잘립니다 린넨 오버핏 셔츠 아이보리 프리사이즈',
};

export const demoPhotoIds = {
  laptop: 0,
  desk: 20,
  flatlay: 26,
  mug: 30,
  cafe: 42,
  camera: 250,
  keyboard: 366,
  latte: 431,
  clothes: 535,
  avatar: 1005,
} as const;

export const demoPhotoList = [
  demoPhotoIds.clothes,
  demoPhotoIds.latte,
  demoPhotoIds.desk,
  demoPhotoIds.mug,
  demoPhotoIds.flatlay,
  demoPhotoIds.camera,
];
