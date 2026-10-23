import {
  Button,
  CheckGlyph,
  makeStyles,
  Photo,
  PressableBase,
  Skeleton,
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

export type LogoCandidate = {
  id: string;
  status: 'generating' | 'ready' | 'failed';
  image?: ImageSourcePropType;
};

export type LogoCandidateGridProps = {
  candidates: readonly LogoCandidate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** 대표 로고로 지정된 후보 */
  coverId?: string | null;
  /** 실패한 후보 다시 만들기 */
  onRetry?: (id: string) => void;
  /** 실패 시 안내. 기본 '만들지 못했어요 · 크레딧은 돌려드렸어요' */
  failedLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[3] },
  cell: {
    width: '47%',
    borderRadius: t.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 2,
  },
  selected: { borderColor: t.colors.primary },
  check: {
    position: 'absolute',
    top: t.space[2],
    right: t.space[2],
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.primary,
  },
  cover: { position: 'absolute', top: t.space[2], left: t.space[2] },
  failed: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[2],
    padding: t.space[3],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
  center: { textAlign: 'center' },
  square: { aspectRatio: 1 },
}));

/** AI가 만든 로고 후보 고르기 */
export function LogoCandidateGrid({
  candidates,
  selectedId,
  onSelect,
  coverId,
  onRetry,
  failedLabel = '만들지 못했어요 · 크레딧은 돌려드렸어요',
  style,
}: LogoCandidateGridProps) {
  const t = useTheme();
  const s = useStyles();
  return (
    <View accessibilityRole="radiogroup" style={[s.grid, style]}>
      {candidates.map((c, i) => {
        if (c.status === 'generating') {
          return (
            <View
              key={c.id}
              style={s.cell}
              accessibilityLabel={`후보 ${i + 1} 만드는 중`}
            >
              <Skeleton height="auto" style={s.square} radius={t.radius.md} />
            </View>
          );
        }
        if (c.status === 'failed' || !c.image) {
          return (
            <View key={c.id} style={s.cell}>
              <View style={s.failed}>
                <Text variant="caption" tone="muted" style={s.center}>
                  {failedLabel}
                </Text>
                {onRetry ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onPress={() => onRetry(c.id)}
                  >
                    다시 만들기
                  </Button>
                ) : null}
              </View>
            </View>
          );
        }
        const selected = c.id === selectedId;
        return (
          <PressableBase
            key={c.id}
            accessibilityRole="radio"
            accessibilityLabel={`로고 후보 ${i + 1}`}
            accessibilityState={{ selected }}
            pressedStyle={{}}
            onPress={() => onSelect(c.id)}
            style={[s.cell, selected && s.selected]}
          >
            <Photo source={c.image} />
            {c.id === coverId ? (
              <StatusBadge style={s.cover}>대표</StatusBadge>
            ) : null}
            {selected ? (
              <View style={s.check}>
                <CheckGlyph color={t.colors.primaryForeground} size={14} />
              </View>
            ) : null}
          </PressableBase>
        );
      })}
    </View>
  );
}
