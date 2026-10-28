import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Button } from '../components/button/button';
import { Field } from '../components/field/field';
import { ListRow } from '../components/list-row/list-row';
import { Text } from '../components/text/text';
import { Phone, SitePreview, useStoryStyles } from '../__stories__/phone';
import { EditorTemplate } from './editor-template';

const tools = [
  { key: 'sections', label: '섹션 목록', onPress: () => {} },
  { key: 'style', label: '색 · 글꼴', onPress: () => {} },
  { key: 'undo', label: '되돌리기', onPress: () => {} },
];

function Screen({ editing }: { editing?: boolean }) {
  const [headline, setHeadline] = useState(
    '좋아서 고른 물건, 매일 쓰기 편하게'
  );
  const [tagline, setTagline] = useState('리빙 · 인테리어 소품');
  const s = useStoryStyles();
  return (
    <Phone
      title="내 사이트"
      leading="close"
      action={
        <Text variant="body" weight="semibold">
          게시
        </Text>
      }
    >
      <EditorTemplate
        preview={
          <SitePreview
            name="하루 리빙"
            headline={headline}
            tagline={tagline}
            sections={2}
          />
        }
        tools={tools}
        sheet={
          editing
            ? {
                title: '첫 화면',
                onClose: () => {},
                headerAction: (
                  <Text variant="label" tone="muted">
                    숨기기
                  </Text>
                ),
                children: (
                  <>
                    <Field
                      label="큰 문구"
                      value={headline}
                      onChangeText={setHeadline}
                    />
                    <Field
                      label="작은 문구"
                      value={tagline}
                      onChangeText={setTagline}
                    />
                    <ListRow
                      title="배경 사진"
                      description="바꾸기"
                      onPress={() => {}}
                      style={s.flush}
                    />
                    <Button variant="secondary" onPress={() => {}}>
                      AI로 다시 쓰기
                    </Button>
                  </>
                ),
              }
            : null
        }
      />
    </Phone>
  );
}

function Demo() {
  return <Screen editing />;
}

const meta = { title: 'Templates/8 편집기', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
