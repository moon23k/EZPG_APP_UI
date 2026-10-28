import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../../components/button/button';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ReviewRowProps = {
  author: string;
  rating: number;
  content: string;
  photos?: readonly ImageSourcePropType[];
  reply?: string;
  onReply?: () => void;
  onMore?: () => void;
  style?: StyleProp<ViewStyle>;
};

export type HiddenReviewsRowProps = {
  count: number;
  onShow: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2], paddingVertical: t.space[4] },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  stars: { letterSpacing: 1 },
  author: { flexShrink: 1, fontSize: t.typography.label.fontSize },
  more: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    marginVertical: -t.space[3],
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: { flexDirection: 'row', gap: t.space[1] },
  dot: { width: 3.5, height: 3.5, borderRadius: t.radius.full },
  photos: { flexDirection: 'row', gap: t.space[2] },
  photo: { width: 72 },
  reply: {
    gap: t.space[1],
    marginLeft: t.space[3],
    paddingVertical: t.space[3],
    paddingHorizontal: t.space[4],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  replyTitle: {
    fontSize: t.typography.label.fontSize,
    lineHeight: t.typography.label.lineHeight,
  },
  replyButton: { alignSelf: 'flex-start' },
  hidden: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    minHeight: t.controlSize.lg,
    paddingLeft: t.space[4],
    paddingRight: t.space[2],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  hiddenLabel: { flex: 1 },
}));

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
  average: number;
  distribution: readonly [number, number, number, number, number];
  style?: StyleProp<ViewStyle>;
};

const useSummaryStyles = makeStyles((t) => ({
  root: { flexDirection: 'row', alignItems: 'center', gap: t.space[5] },
  score: { alignItems: 'center', gap: t.space[1] },
  average: {
    fontSize: t.typography.display.fontSize,
    lineHeight: t.typography.display.lineHeight,
    fontVariant: ['tabular-nums'],
  },
  bars: { flex: 1, gap: t.space[1] },
  bar: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  digit: { width: 8, fontVariant: ['tabular-nums'] },
  track: {
    flex: 1,
    height: 6,
    borderRadius: t.radius.full,
    overflow: 'hidden',
    backgroundColor: t.colors.muted,
  },
  fill: {
    height: 6,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.warning,
  },
}));

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
