import {
  Button,
  makeStyles,
  Photo,
  PressableBase,
  Text,
  useTheme,
} from '@ezpg/native-ui';
import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type ReviewRowProps = {
  /** 가린 이름. 예) '김*지' */
  author: string;
  /** 1~5 */
  rating: number;
  content: string;
  photos?: readonly ImageSourcePropType[];
  reply?: string;
  /** 답글이 없을 때 '답글 달기' 버튼 */
  onReply?: () => void;
  /** 오른쪽 위 더보기 버튼 (답글 수정 · 숨기기 등) */
  onMore?: () => void;
  style?: StyleProp<ViewStyle>;
};

export type HiddenReviewsRowProps = {
  count: number;
  onShow: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: 10, paddingVertical: t.space[4] },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  stars: { letterSpacing: 1 },
  author: { flexShrink: 1, fontSize: 14 },
  more: {
    width: 44,
    height: 44,
    marginVertical: -t.space[3],
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: { flexDirection: 'row', gap: 3 },
  dot: { width: 3.5, height: 3.5, borderRadius: 2 },
  photos: { flexDirection: 'row', gap: t.space[2] },
  photo: { width: 72 },
  reply: {
    gap: t.space[1],
    marginLeft: t.space[3],
    paddingVertical: t.space[3],
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: t.colors.muted,
  },
  replyTitle: { fontSize: 13, lineHeight: 18 },
  replyButton: { alignSelf: 'flex-start' },
  hidden: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    minHeight: 52,
    paddingLeft: 14,
    paddingRight: t.space[2],
    borderRadius: 10,
    backgroundColor: t.colors.muted,
  },
  hiddenLabel: { flex: 1 },
}));

/** 별점을 ★로 그린다. 빈 별은 border 색 */
function Stars({ rating, size }: { rating: number; size?: number }) {
  const t = useTheme();
  const s = useStyles();
  const n = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <Text
      accessibilityRole="image"
      accessibilityLabel={`별점 ${n}점`}
      style={[
        s.stars,
        { color: t.colors.warning },
        size ? { fontSize: size, lineHeight: size + 4 } : null,
      ]}
    >
      {'★'.repeat(n)}
      <Text style={{ color: t.colors.border }}>{'★'.repeat(5 - n)}</Text>
    </Text>
  );
}

/** 리뷰 한 건과 사장님 답글 */
export function ReviewRow({
  author,
  rating,
  content,
  photos = [],
  reply,
  onReply,
  onMore,
  style,
}: ReviewRowProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      <View style={s.head}>
        <Stars rating={rating} />
        <Text weight="semibold" numberOfLines={1} style={s.author}>
          {author}
        </Text>
        {onMore ? (
          <PressableBase
            accessibilityLabel="더보기"
            onPress={onMore}
            style={s.more}
          >
            <View style={s.dots}>
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  style={[s.dot, { backgroundColor: t.colors.mutedForeground }]}
                />
              ))}
            </View>
          </PressableBase>
        ) : null}
      </View>
      <Text>{content}</Text>
      {photos.length ? (
        <View style={s.photos}>
          {photos.slice(0, 4).map((p, i) => (
            <View key={i} style={s.photo}>
              <Photo
                source={p}
                radius={t.radius.sm}
                accessibilityLabel={`리뷰 사진 ${i + 1}`}
              />
            </View>
          ))}
        </View>
      ) : null}
      {reply ? (
        <View style={s.reply}>
          <Text weight="bold" style={s.replyTitle}>
            사장님
          </Text>
          <Text>{reply}</Text>
        </View>
      ) : onReply ? (
        <Button
          size="sm"
          variant="outline"
          onPress={onReply}
          style={s.replyButton}
        >
          답글 달기
        </Button>
      ) : null}
    </View>
  );
}

/** 숨긴 리뷰를 한 줄로 접어 둔다 */
export function HiddenReviewsRow({
  count,
  onShow,
  style,
}: HiddenReviewsRowProps) {
  const s = useStyles();
  return (
    <View style={[s.hidden, style]}>
      <Text style={s.hiddenLabel}>숨긴 리뷰 {count}개</Text>
      <Button size="sm" variant="ghost" onPress={onShow}>
        다시 보이기
      </Button>
    </View>
  );
}

export type ReviewSummaryProps = {
  /** 평균 별점 */
  average: number;
  /** 5점부터 1점까지 리뷰 수 */
  distribution: readonly [number, number, number, number, number];
  style?: StyleProp<ViewStyle>;
};

const useSummaryStyles = makeStyles((t) => ({
  root: { flexDirection: 'row', alignItems: 'center', gap: t.space[5] },
  score: { alignItems: 'center', gap: t.space[1] },
  average: { fontSize: 36, lineHeight: 40, fontVariant: ['tabular-nums'] },
  bars: { flex: 1, gap: t.space[1] },
  bar: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  digit: { width: 8, fontVariant: ['tabular-nums'] },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: t.colors.muted,
  },
  fill: { height: 6, borderRadius: 3, backgroundColor: t.colors.warning },
}));

/** 평균 별점과 점수별 분포 막대 */
export function ReviewSummary({
  average,
  distribution,
  style,
}: ReviewSummaryProps) {
  const s = useSummaryStyles();
  const total = distribution.reduce((a, b) => a + b, 0);
  const shown = average.toFixed(1);
  return (
    <View style={[s.root, style]}>
      <View
        accessible
        accessibilityLabel={`별점 평균 ${shown}, 리뷰 ${total}개`}
        style={s.score}
      >
        <Text weight="bold" style={s.average}>
          {shown}
        </Text>
        <Stars rating={average} size={13} />
      </View>
      <View
        accessible
        accessibilityLabel={distribution
          .map((n, i) => `${5 - i}점 ${n}개`)
          .join(', ')}
        style={s.bars}
      >
        {distribution.map((n, i) => (
          <View key={i} style={s.bar}>
            <Text variant="caption" tone="muted" style={s.digit}>
              {5 - i}
            </Text>
            <View style={s.track}>
              <View
                style={[
                  s.fill,
                  { width: `${total ? Math.round((n / total) * 100) : 0}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
