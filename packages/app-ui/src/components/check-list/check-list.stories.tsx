import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { CheckList } from './check-list';

function Demo() {
  return (
    <Section title="유의사항">
      <CheckList
        items={[
          '이름 · 휴대폰 번호가 삭제되고 복구할 수 없어요.',
          '모든 기기에서 로그아웃돼요.',
        ]}
      />
    </Section>
  );
}

const meta = { title: 'Components/CheckList', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
