import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { demoPhotoIds, Row, sample, Section } from '../../__stories__/helpers';
import { Avatar } from './avatar';

function Demo() {
  return (
    <>
      <Section title="크기">
        <Row>
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" />
        </Row>
      </Section>
      <Section title="사진 · 바꾸기">
        <Row>
          <Avatar size="lg" uri={sample(demoPhotoIds.latte).uri} />
          <Avatar
            size="lg"
            editable
            onPress={() => {}}
            accessibilityLabel="사진 바꾸기"
          />
        </Row>
      </Section>
    </>
  );
}

const meta = { title: 'Components/Avatar', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
