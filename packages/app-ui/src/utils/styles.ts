import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import type { Theme } from '../types';
import { useTheme } from '../theme/theme-provider';

type NamedStyles<T> = { [K in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * 테마로 스타일을 만드는 hook을 반환한다. 같은 테마에는 같은 스타일 객체를 돌려준다.
 *
 * const useStyles = makeStyles((t) => ({ box: { padding: t.space[4] } }));
 */
export function makeStyles<T extends NamedStyles<T>>(
  factory: (theme: Theme) => T
): () => T {
  const cache = new WeakMap<Theme, T>();
  return function useStyles() {
    const theme = useTheme();
    let styles = cache.get(theme);
    if (!styles) {
      styles = StyleSheet.create(factory(theme));
      cache.set(theme, styles);
    }
    return styles;
  };
}
