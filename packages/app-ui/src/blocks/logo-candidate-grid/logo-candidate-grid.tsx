import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../../components/button/button';
import { Photo } from '../../components/photo/photo';
import { Skeleton } from '../../components/skeleton/skeleton';
import { AlertGlyph, CheckGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type LogoCandidate = {
  id: string;
  status: 'generating' | 'ready' | 'failed';
  image?: ImageSourcePropType;
};

export type LogoCandidateGridProps = {
  candidates: readonly LogoCandidate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRetry?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[3] },
  cell: {
    width: '47%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: t.radius.lg,
  },
  selected: { borderWidth: 2, borderColor: t.colors.primary },
  check: {
    position: 'absolute',
    top: t.space[2],
    right: t.space[2],
    width: 24,
    height: 24,
    borderRadius: t.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.primary,
  },
  failed: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.space[3],
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.muted,
  },
  retry: { paddingHorizontal: t.space[4] },
}));

export function LogoCandidateGrid({
  candidates,
  selectedId,
  onSelect,
  onRetry,
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
              accessibilityLabel={`로고 후보 ${i + 1} 만드는 중`}
            >
              <Skeleton height="100%" radius={t.radius.lg} />
            </View>
          );
        }
        if (c.status === 'failed' || !c.image) {
          return (
            <View
              key={c.id}
              accessibilityLabel={`로고 후보 ${i + 1} 만들지 못함`}
              style={[s.cell, s.failed]}
            >
              <AlertGlyph color={t.colors.mutedForeground} size={28} />
              {onRetry ? (
                <Button
                  size="sm"
                  variant="outline"
                  accessibilityLabel="로고 다시 만들기"
                  onPress={() => onRetry(c.id)}
                  style={s.retry}
                >
                  다시 시도
                </Button>
              ) : null}
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
            <Photo source={c.image} radius={0} />
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
