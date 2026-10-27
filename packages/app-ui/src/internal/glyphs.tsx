import { StyleSheet, View } from 'react-native';
import type { IconRenderProps } from './icon';

export function SearchGlyph({ color, size }: IconRenderProps) {
  const ring = size * 0.62;
  const stroke = Math.max(1.5, size / 10);
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: ring,
          height: ring,
          borderRadius: ring / 2,
          borderWidth: stroke,
          borderColor: color,
        }}
      />
      <View
        style={[
          styles.absolute,
          {
            width: size * 0.36,
            height: stroke,
            backgroundColor: color,
            borderRadius: stroke,
            right: size * 0.02,
            bottom: size * 0.14,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
    </View>
  );
}

export function CloseGlyph({ color, size }: IconRenderProps) {
  const stroke = Math.max(1.5, size / 10);
  const bar = {
    position: 'absolute' as const,
    width: size * 0.8,
    height: stroke,
    borderRadius: stroke,
    backgroundColor: color,
    top: (size - stroke) / 2,
    left: size * 0.1,
  };
  return (
    <View style={{ width: size, height: size }}>
      <View style={[bar, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[bar, { transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

export function CheckGlyph({ color, size }: IconRenderProps) {
  const stroke = Math.max(2, size / 7);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          width: size * 0.32,
          height: size * 0.6,
          marginTop: -size * 0.12,
          borderRightWidth: stroke,
          borderBottomWidth: stroke,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  center: { alignItems: 'center', justifyContent: 'center' },
});

export function ChevronGlyph({ color, size }: IconRenderProps) {
  const stroke = Math.max(1.5, size / 10);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          width: size * 0.42,
          height: size * 0.42,
          marginLeft: -size * 0.16,
          borderTopWidth: stroke,
          borderRightWidth: stroke,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

export function AlertGlyph({
  color,
  size,
  filled = false,
  onColor = '#ffffff',
}: IconRenderProps & { filled?: boolean; onColor?: string }) {
  const stroke = Math.max(1.5, size / (filled ? 10 : 16));
  const mark = filled ? onColor : color;
  const ring = filled ? 0 : stroke;
  return (
    <View
      style={[
        styles.center,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: ring,
          borderColor: color,
          backgroundColor: filled ? color : undefined,
        },
      ]}
    >
      <View
        style={{
          width: stroke,
          height: size * 0.28,
          borderRadius: stroke,
          backgroundColor: mark,
        }}
      />
      <View
        style={{
          width: stroke * 1.4,
          height: stroke * 1.4,
          marginTop: size * 0.08,
          borderRadius: stroke,
          backgroundColor: mark,
        }}
      />
    </View>
  );
}

export function PlusGlyph({ color, size }: IconRenderProps) {
  const stroke = Math.max(1.5, size / 16);
  const bar = {
    position: 'absolute' as const,
    backgroundColor: color,
    borderRadius: stroke,
  };
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[bar, { width: size * 0.6, height: stroke }]} />
      <View style={[bar, { width: stroke, height: size * 0.6 }]} />
    </View>
  );
}
