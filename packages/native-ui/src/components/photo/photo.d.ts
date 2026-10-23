import { type ReactNode } from 'react';
import {
  type ImageProps,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
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
/** 로딩 중에는 muted 배경, 실패하면 fallback을 보여주는 이미지 */
export declare function Photo(props: PhotoProps): import('react').JSX.Element;
