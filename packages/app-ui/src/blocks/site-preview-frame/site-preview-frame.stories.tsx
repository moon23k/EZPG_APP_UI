import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { demoPhotoIds, sample, Section } from '../../__stories__/helpers';
import { SitePreviewFrame } from './site-preview-frame';

const shot = sample(demoPhotoIds.cafe, 390, 845);

function Demo() {
  return (
    <>
      <Section title="게시 안 된 변경사항">
        <SitePreviewFrame
          status="unpublishedChanges"
          screenshot={shot}
          onPublish={() => {}}
        />
      </Section>
      <Section title="처음 게시">
        <SitePreviewFrame
          status="draft"
          screenshot={shot}
          onPublish={() => {}}
        />
      </Section>
      <Section title="게시됨">
        <SitePreviewFrame
          status="published"
          screenshot={shot}
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
