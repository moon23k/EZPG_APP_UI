import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Text } from '../components/text/text';
import type { ThemeTokens, TypographyVariant } from '../types';
import { makeStyles } from '../utils/styles';
import { useTheme } from './theme-provider';

const variants: TypographyVariant[] = [
  'display',
  'screenTitle',
  'title',
  'bodyLg',
  'body',
  'label',
  'caption',
];

const layoutKeys: (keyof ThemeTokens['layout'])[] = [
  'screenX',
  'screenTop',
  'titleGap',
  'sectionGap',
  'groupGap',
  'itemGap',
  'footerTop',
  'footerBottom',
];

const useStyles = makeStyles((t) => ({
  root: { gap: t.layout.sectionGap },
  group: { gap: t.layout.groupGap },
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  name: { width: 112 },
  bar: { height: t.space[3], backgroundColor: t.colors.primary },
  box: {
    width: t.controlSize.md,
    height: t.controlSize.md,
    borderWidth: 1,
    borderColor: t.colors.input,
    backgroundColor: t.colors.muted,
  },
}));

function Tokens() {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.root}>
      <View style={s.group}>
        {variants.map((variant) => (
          <View key={variant} style={s.row}>
            <Text variant="caption" tone="muted" style={s.name}>
              {variant} {t.typography[variant].fontSize}/
              {t.typography[variant].lineHeight}
            </Text>
            <Text variant={variant}>가나다 123</Text>
          </View>
        ))}
      </View>
      <View style={s.group}>
        {layoutKeys.map((key) => (
          <View key={key} style={s.row}>
            <Text variant="caption" tone="muted" style={s.name}>
              {key} {t.layout[key]}
            </Text>
            <View style={[s.bar, { width: t.layout[key] }]} />
          </View>
        ))}
      </View>
      <View style={s.group}>
        {(['sm', 'md', 'lg', 'full'] as const).map((key) => (
          <View key={key} style={s.row}>
            <Text variant="caption" tone="muted" style={s.name}>
              radius.{key} {key === 'full' ? '' : t.radius[key]}
            </Text>
            <View style={[s.box, { borderRadius: t.radius[key] }]} />
          </View>
        ))}
      </View>
      <View style={s.group}>
        {(['sm', 'md', 'lg'] as const).map((key) => (
          <View key={key} style={s.row}>
            <Text variant="caption" tone="muted" style={s.name}>
              controlSize.{key} {t.controlSize[key]}
            </Text>
            <View
              style={[
                s.bar,
                { width: t.controlSize[key], height: t.controlSize[key] },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const meta = { title: 'Foundations/Tokens', component: Tokens } satisfies Meta<
  typeof Tokens
>;
export default meta;

export const Scale: StoryObj<typeof meta> = {};
