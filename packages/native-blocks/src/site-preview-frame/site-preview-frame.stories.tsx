import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { sample, Section } from '../__stories__/helpers';
import { SitePreviewFrame } from './site-preview-frame';

const shot = sample(152, 390, 845);

function Demo() {
  return (
    <>
      <Section title="초안">
        <SitePreviewFrame
          status="draft"
          screenshot={shot}
          onPublish={() => {}}
        />
      </Section>
      <Section title="게시 안 된 변경">
        <SitePreviewFrame
          status="unpublishedChanges"
          screenshot={shot}
          publishedLabel="10월 22일 18:40 게시"
          onPublish={() => {}}
          onRevert={() => {}}
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Onboarding/SitePreviewFrame',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
