import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { makeStyles } from '../../utils/styles';
import { Text } from '../text/text';

export type FieldGroupProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2] },
  head: { flexDirection: 'row', gap: t.space[1] },
}));

export function FieldGroup({
  label,
  required,
  children,
  style,
}: FieldGroupProps) {
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      <View style={s.head}>
        <Text weight="medium" accessibilityRole="header">
          {label}
        </Text>
        {required ? (
          <Text tone="danger" accessibilityLabel="필수">
            *
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}
