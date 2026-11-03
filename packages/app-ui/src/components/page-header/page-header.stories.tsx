import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Column, Section } from '../../__stories__/helpers';
import { BellGlyph } from '../../internal/glyphs';
import { PageHeader } from './page-header';

function Demo() {
  return (
    <Section title="action">
      <Column>
        <PageHeader
          title="홈"
          action={{
            icon: BellGlyph,
            label: '알림',
            badge: true,
            onPress: () => {},
          }}
        />
        <PageHeader
          title="홈"
          action={{ icon: BellGlyph, label: '알림', onPress: () => {} }}
        />
        <PageHeader
          title="주문"
          action={{ label: '일괄 발송', onPress: () => {} }}
        />
      </Column>
    </Section>
  );
}

const meta = {
  title: 'Components/PageHeader',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
