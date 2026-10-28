import { Platform } from 'react-native';
import type { ColorScheme, ThemeColors, ThemeTokens } from '../types';
import {
  controlSize,
  frame,
  iconSize,
  layout,
  motion,
  opacity,
  radius,
  semantic,
  shadow,
  space,
  touch,
  typography,
} from './base';

export const colors: Record<ColorScheme, ThemeColors> = semantic;

export const tokens: ThemeTokens = {
  space,
  radius,
  typography,
  fontFamily: undefined,
  maxFontScale: 1.3,
  shadow,
  motion,
  opacity,
  iconSize,
  minTouchSize: Platform.OS === 'ios' ? touch.ios : touch.android,
  layout,
  controlSize,
  headerHeight: frame.header,
  listRowHeight: frame.listRow,
};
