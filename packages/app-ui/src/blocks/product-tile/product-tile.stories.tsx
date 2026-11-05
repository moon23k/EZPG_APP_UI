import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StyleSheet, View } from 'react-native';
import { Section } from '../../__stories__/helpers';
import { ProductTile, ProductTileSpacer } from './product-tile';

function Demo() {
  return (
    <Section title="2열 상품 · 사진 없음 · 품절 · 빈 칸">
      <View style={styles.row}>
        <ProductTile
          name="패브릭 무드등"
          price="45,000원"
          state="판매 중"
          onPress={() => {}}
        />
        <ProductTile
          name="면 러그 120x180"
          price="69,000원"
          state="품절"
          onPress={() => {}}
        />
      </View>
      <View style={styles.row}>
        <ProductTile
          name="원목 트레이"
          price="26,000원"
          state="판매 중"
          onPress={() => {}}
        />
        <ProductTileSpacer />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 12 } });

const meta = {
  title: 'Blocks/Catalog/ProductTile',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
