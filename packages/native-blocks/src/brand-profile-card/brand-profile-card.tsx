import { Button, makeStyles, Photo, Text } from '@ezpg/native-ui';
import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Card } from '../internal/card';

export type BrandProfileCardProps = {
  name: string;
  industry: string;
  tagline?: string;
  logo?: ImageSourcePropType;
  /** 브랜드 색 (hex) */
  colors?: readonly string[];
  keywords?: readonly string[];
  onEdit?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[3] },
  logo: { width: 56 },
  title: { flex: 1, gap: 2 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: t.space[2] },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
}));

/** AI가 만든 브랜드 요약 */
export function BrandProfileCard({
  name,
  industry,
  tagline,
  logo,
  colors = [],
  keywords = [],
  onEdit,
  style,
}: BrandProfileCardProps) {
  const s = useStyles();
  return (
    <Card style={style}>
      <View style={s.head}>
        {logo ? (
          <View style={s.logo}>
            <Photo source={logo} />
          </View>
        ) : null}
        <View style={s.title}>
          <Text variant="title" numberOfLines={1}>
            {name}
          </Text>
          <Text variant="caption" tone="muted">
            {industry}
          </Text>
        </View>
        {onEdit ? (
          <Button size="sm" variant="ghost" onPress={onEdit}>
            수정
          </Button>
        ) : null}
      </View>
      {tagline ? <Text>{tagline}</Text> : null}
      {colors.length ? (
        <View
          style={s.row}
          accessibilityLabel={`브랜드 색 ${colors.length}가지`}
        >
          {colors.map((c) => (
            <View key={c} style={[s.dot, { backgroundColor: c }]} />
          ))}
        </View>
      ) : null}
      {keywords.length ? <Text>{keywords.join(' · ')}</Text> : null}
    </Card>
  );
}
