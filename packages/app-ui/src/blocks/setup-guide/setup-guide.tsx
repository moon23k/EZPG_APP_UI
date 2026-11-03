import { View, type StyleProp, type ViewStyle } from 'react-native';
import { ListRow } from '../../components/list-row/list-row';
import { Text } from '../../components/text/text';
import { CheckGlyph } from '../../internal/glyphs';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type SetupStep = {
  key: string;
  label: string;
  done: boolean;
  onPress?: () => void;
};

export type SetupGuideProps = {
  title: string;
  steps: readonly SetupStep[];
  style?: StyleProp<ViewStyle>;
};

const MARK = 24;
const RING = 1.5;
const TRACK = 4;

const useStyles = makeStyles((t) => ({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: t.space[2],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  track: {
    height: TRACK,
    marginHorizontal: t.layout.screenX,
    marginBottom: t.space[1],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.border,
    overflow: 'hidden',
  },
  fill: { height: TRACK, backgroundColor: t.colors.mutedForeground },
  mark: {
    width: MARK,
    height: MARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: MARK,
    height: MARK,
    borderRadius: t.radius.full,
    borderWidth: RING,
    borderColor: t.colors.input,
  },
}));

export function SetupGuide({ title, steps, style }: SetupGuideProps) {
  const t = useTheme();
  const s = useStyles();
  const done = steps.filter((step) => step.done).length;
  return (
    <View style={style}>
      <View style={s.head}>
        <Text variant="label" weight="medium" tone="muted">
          {title}
        </Text>
        <Text variant="label" weight="medium" tone="muted">
          {`${done} / ${steps.length}`}
        </Text>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: steps.length, now: done }}
        style={s.track}
      >
        <View
          style={[
            s.fill,
            { width: `${steps.length ? (done / steps.length) * 100 : 0}%` },
          ]}
        />
      </View>
      {steps.map((step) => (
        <ListRow
          key={step.key}
          title={step.label}
          leading={
            step.done ? (
              <View style={s.mark}>
                <CheckGlyph color={t.colors.foreground} size={t.iconSize.md} />
              </View>
            ) : (
              <View style={s.ring} />
            )
          }
          chevron={!step.done}
          onPress={step.done ? undefined : step.onPress}
          accessibilityState={{ checked: step.done }}
        />
      ))}
    </View>
  );
}
