import {
  Button,
  makeStyles,
  Photo,
  StatusBadge,
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
  author: string;
  /** 1~5 */
  rating: number;
  /** 예) '10월 22일' */
  writtenAt: string;
  content: string;
  /** 구매한 옵션 */
  option?: string;
  photos?: readonly ImageSourcePropType[];
  reply?: string;
  /** 숨김 처리됨 */
  hidden?: { reason: string };
  /** 숨김 이의신청 */
  appeal?: 'received' | 'resolved';
  reported?: boolean;
  onReply?: () => void;
  onHide?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2], paddingVertical: t.space[4] },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    flexWrap: 'wrap',
  },
  stars: { letterSpacing: 1 },
  photos: { flexDirection: 'row', gap: t.space[2] },
  photo: { width: 72 },
  reply: {
    gap: t.space[1],
    padding: t.space[3],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
  hidden: { opacity: 0.6 },
  actions: { flexDirection: 'row', gap: t.space[2] },
}));

/** 리뷰 한 건과 사장님 답글 */
export function ReviewRow({
  author,
  rating,
  writtenAt,
  content,
  option,
  photos = [],
  reply,
  hidden,
  appeal,
  reported,
  onReply,
  onHide,
  style,
}: ReviewRowProps) {
  const t = useTheme();
  const s = useStyles();
  const stars = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <View style={[s.root, style]}>
      <View style={s.head}>
        <Text
          accessibilityLabel={`별점 ${stars}점`}
          style={[s.stars, { color: t.colors.warning }]}
        >
          {'★'.repeat(stars)}
          <Text style={{ color: t.colors.border }}>
            {'★'.repeat(5 - stars)}
          </Text>
        </Text>
        <Text variant="caption" tone="muted">
          {author} · {writtenAt}
        </Text>
        {hidden ? <StatusBadge>숨김</StatusBadge> : null}
        {appeal ? (
          <StatusBadge tone={appeal === 'received' ? 'warning' : 'neutral'}>
            {appeal === 'received' ? '이의신청 접수' : '이의신청 처리됨'}
          </StatusBadge>
        ) : null}
        {reported ? <StatusBadge tone="destructive">신고됨</StatusBadge> : null}
      </View>
      <View style={hidden && s.hidden}>
        {option ? (
          <Text variant="caption" tone="muted">
            {option}
          </Text>
        ) : null}
        <Text>{content}</Text>
      </View>
      {hidden ? (
        <Text variant="caption" tone="muted">
          숨긴 이유: {hidden.reason}
        </Text>
      ) : null}
      {photos.length ? (
        <View style={s.photos}>
          {photos.slice(0, 4).map((p, i) => (
            <View key={i} style={s.photo}>
              <Photo source={p} radius={t.radius.sm} />
            </View>
          ))}
        </View>
      ) : null}
      {reply ? (
        <View style={s.reply}>
          <Text variant="caption" tone="muted">
            사장님 답글
          </Text>
          <Text>{reply}</Text>
        </View>
      ) : null}
      {onReply || onHide ? (
        <View style={s.actions}>
          {onReply ? (
            <Button size="sm" variant="outline" onPress={onReply}>
              {reply ? '답글 수정' : '답글 쓰기'}
            </Button>
          ) : null}
          {onHide && !hidden ? (
            <Button size="sm" variant="ghost" onPress={onHide}>
              숨기기
            </Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
