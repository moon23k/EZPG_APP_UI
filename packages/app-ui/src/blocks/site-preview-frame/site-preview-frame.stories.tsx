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
      <Section title="게시 불가 · 사유">
        <SitePreviewFrame
          status="draft"
          screenshot={shot}
          onPublish={() => {}}
          publishDisabled
          blockedReason="사업자 정보 확인이 끝나면 게시할 수 있어요. 보통 하루 안에 끝나고, 결과는 알림으로 알려 드려요"
        />
        <SitePreviewFrame
          status="unpublishedChanges"
          screenshot={shot}
          onPublish={() => {}}
          publishDisabled
          blockedReason="운영 정책에 따라 판매가 중지돼 게시할 수 없어요"
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
