import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Row, Section } from '../../__stories__/helpers';
import { SearchGlyph } from '../../internal/glyphs';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: '저장' },
} satisfies Meta<typeof Button>;
export default meta;

const variants = ['solid', 'outline', 'ghost', 'danger'] as const;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <>
      <Section title="variant">
        <Row>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </Row>
      </Section>
      <Section title="size">
        <Row>
          <Button size="sm">작게</Button>
          <Button size="md">보통</Button>
          <Button size="lg">크게</Button>
        </Row>
      </Section>
      <Section title="icon · loading · disabled">
        <Row>
          <Button variant="outline" leftIcon={SearchGlyph}>
            검색
          </Button>
          <Button loading>저장 중</Button>
          <Button disabled>비활성</Button>
          <Button variant="outline" disabled>
            비활성
          </Button>
        </Row>
      </Section>
    </>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
