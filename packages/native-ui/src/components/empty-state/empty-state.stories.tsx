import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { SearchGlyph } from '../../internal/glyphs';
import { EmptyState } from './empty-state';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: '아직 주문이 없어요',
    description: '첫 주문이 들어오면 여기에 표시돼요.',
  },
} satisfies Meta<typeof EmptyState>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <>
      <Section title="비어 있음">
        <EmptyState
          title="아직 주문이 없어요"
          description="첫 주문이 들어오면 여기에 표시돼요."
        />
      </Section>
      <Section title="검색 결과 없음">
        <EmptyState
          icon={SearchGlyph}
          title="검색 결과가 없어요"
          description="다른 이름이나 주문번호로 찾아보세요."
        />
      </Section>
      <Section title="불러오기 실패">
        <EmptyState
          title="불러오지 못했어요"
          description="네트워크 연결을 확인해 주세요."
          action={{ label: '다시 시도', onPress: () => {} }}
        />
      </Section>
    </>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
