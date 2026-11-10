import { useRef, useState } from 'react';
import {
  Image,
  PanResponder,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';
import { makeStyles } from '../../utils/styles';

export type CompareSliderProps = {
  before: string;
  after: string;
  aspectRatio?: number;
  label?: string;
};

const KNOB = 32;

const useStyles = makeStyles((t) => ({
  root: { width: '100%', overflow: 'hidden', backgroundColor: t.colors.muted },
  fill: { position: 'absolute', left: 0, top: 0, bottom: 0 },
  clip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: t.colors.surface,
  },
  knob: {
    position: 'absolute',
    top: '50%',
    marginTop: -KNOB / 2,
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: t.colors.surface,
    boxShadow: t.shadow.md,
  },
  grip: {
    flex: 1,
    margin: t.space[2],
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: t.colors.input,
  },
}));

export function CompareSlider({
  before,
  after,
  aspectRatio = 4 / 5,
  label = '원본과 비교',
}: CompareSliderProps) {
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const [split, setSplit] = useState(0.5);
  const widthRef = useRef(0);
  const follow = (e: GestureResponderEvent) =>
    setSplit(
      Math.min(
        1,
        Math.max(0, e.nativeEvent.locationX / (widthRef.current || 1))
      )
    );
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: follow,
      onPanResponderMove: follow,
    })
  ).current;
  const layout = (e: LayoutChangeEvent) => {
    widthRef.current = e.nativeEvent.layout.width;
    setWidth(e.nativeEvent.layout.width);
  };
  const x = width * split;
  return (
    <View
      onLayout={layout}
      accessibilityLabel={label}
      accessibilityRole="adjustable"
      style={[s.root, { aspectRatio }]}
      {...pan.panHandlers}
    >
      <Image
        source={{ uri: after }}
        resizeMode="cover"
        style={[s.fill, { width }]}
      />
      <View style={[s.clip, { width: x }]}>
        <Image
          source={{ uri: before }}
          resizeMode="cover"
          style={[s.fill, { width }]}
        />
      </View>
      <View style={[s.line, { left: x - 1 }]} />
      <View style={[s.knob, { left: x - KNOB / 2 }]}>
        <View style={s.grip} />
      </View>
    </View>
  );
}
