import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Column, Section } from '../../__stories__/helpers';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { Skeleton } from './skeleton';

const useStyles = makeStyles((t) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  lines: { flex: 1, gap: t.space[2] },
}));

function RowPlaceholder() {
  const t = useTheme();
  const s = useStyles();
  return (
    <View style={s.row}>
      <Skeleton width={40} height={40} radius={t.radius.full} />
      <View style={s.lines}>
        <Skeleton width="60%" />
        <Skeleton width="40%" height={12} />
      </View>
    </View>
  );
}

function Demo() {
  return (
    <Column>
      <Section title="목록 행 모양">
        <RowPlaceholder />
        <RowPlaceholder />
        <RowPlaceholder />
      </Section>
      <Section title="카드">
        <Skeleton height={160} />
        <Skeleton width="80%" />
      </Section>
    </Column>
  );
}

const meta = { title: 'Components/Skeleton', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
