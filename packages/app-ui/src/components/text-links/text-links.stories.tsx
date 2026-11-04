import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { TextLinks } from './text-links';

function Demo() {
  return (
    <Section title="아래 글자 링크">
      <TextLinks
        items={[
          { label: '로그아웃', onPress: () => {} },
          { label: '회원탈퇴', onPress: () => {} },
        ]}
      />
    </Section>
  );
}

const meta = { title: 'Components/TextLinks', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
