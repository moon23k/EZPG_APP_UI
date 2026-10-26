import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import {
  demoPhotoIds,
  demoProducts,
  Row,
  sample,
  Section,
} from '../../__stories__/helpers';
import { Text } from '../text/text';
import { Photo } from './photo';

const tile = { width: 160 };
const avatar = { width: 64 };

function Demo() {
  return (
    <>
      <Section title="비율">
        <Row>
          <View style={tile}>
            <Photo
              source={sample(demoPhotoIds.clothes)}
              accessibilityLabel={demoProducts.shirt}
            />
          </View>
          <View style={tile}>
            <Photo
              source={sample(demoPhotoIds.latte, 800, 600)}
              aspectRatio={4 / 3}
            />
          </View>
          <View style={tile}>
            <Photo
              source={sample(demoPhotoIds.desk, 600, 800)}
              aspectRatio={3 / 4}
              radius={0}
            />
          </View>
        </Row>
      </Section>
      <Section title="원형 · 실패">
        <Row>
          <View style={avatar}>
            <Photo source={sample(demoPhotoIds.avatar, 200)} radius={9999} />
          </View>
          <View style={tile}>
            <Photo
              source={{ uri: 'https://invalid.example/missing.jpg' }}
              fallback={
                <Text variant="caption" tone="muted">
                  이미지를 불러오지 못했어요
                </Text>
              }
            />
          </View>
        </Row>
      </Section>
    </>
  );
}

const meta = { title: 'Components/Photo', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
