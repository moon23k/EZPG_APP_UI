import { useState, type ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  View,
  type ImageProps,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/theme-provider';

export type PhotoProps = Omit<ImageProps, 'source' | 'style'> & {
  source: ImageSourcePropType;
  aspectRatio?: number;
  radius?: number;
  fallback?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function sourceKey(source: ImageSourcePropType): string {
  if (typeof source === 'number') return String(source);
  if (Array.isArray(source)) return source.map((s) => s.uri ?? '').join('|');
  return (source as { uri?: string }).uri ?? '';
}

export function Photo(props: PhotoProps) {
  return <PhotoInner key={sourceKey(props.source)} {...props} />;
}

function PhotoInner({
  source,
  aspectRatio = 1,
  radius,
  fallback,
  style,
  onLoad,
  onError,
  ...rest
}: PhotoProps) {
  const t = useTheme();
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading'
  );
  return (
    <View
      style={[
        styles.frame,
        {
          aspectRatio,
          borderRadius: radius ?? t.radius.md,
          backgroundColor: t.colors.muted,
        },
        style,
      ]}
    >
      {status === 'error' ? (
        <View style={styles.center}>{fallback}</View>
      ) : (
        <Image
          {...rest}
          source={source}
          resizeMode={rest.resizeMode ?? 'cover'}
          style={StyleSheet.absoluteFill}
          onLoad={(e) => {
            setStatus('loaded');
            onLoad?.(e);
          }}
          onError={(e) => {
            setStatus('error');
            onError?.(e);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { width: '100%', overflow: 'hidden' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
