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
  /** 가로 / 세로. 기본 1 */
  aspectRatio?: number;
  /** 기본 radius.md */
  radius?: number;
  /** 불러오지 못했을 때 보여줄 내용 */
  fallback?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function sourceKey(source: ImageSourcePropType): string {
  if (typeof source === 'number') return String(source);
  if (Array.isArray(source)) return source.map((s) => s.uri ?? '').join('|');
  return (source as { uri?: string }).uri ?? '';
}

/** 로딩 중에는 muted 배경, 실패하면 fallback을 보여주는 이미지 */
export function Photo(props: PhotoProps) {
  // 주소가 바뀌면 로딩 · 실패 상태를 처음부터 다시 잡는다.
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
