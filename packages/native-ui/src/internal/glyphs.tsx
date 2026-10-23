import { StyleSheet, View } from 'react-native';
import type { IconRenderProps } from './icon';

// svg 없이 그리는 최소 아이콘. 아이콘 세트는 앱이 슬롯으로 넣는다.

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
