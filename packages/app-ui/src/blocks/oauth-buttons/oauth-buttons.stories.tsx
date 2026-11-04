import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Text } from '../../components/text/text';
import { Row, Section } from '../../__stories__/helpers';
import { OAuthButtons, OAuthMark, type OAuthProvider } from './oauth-buttons';

function Demo() {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);
  return (
    <>
      <Section title="로그인 수단 표시">
        <Row>
          {(['kakao', 'naver', 'google', 'apple'] as const).map((p) => (
            <OAuthMark key={p} provider={p} />
          ))}
        </Row>
      </Section>
      <Section title="파트너 앱 (Apple은 iOS에서만)">
        <OAuthButtons
          providers={['kakao', 'naver', 'google', 'apple']}
          loading={loading}
          onPress={(p) => {
            setLoading(p);
            setTimeout(() => setLoading(null), 1200);
          }}
        />
        <Text variant="caption" tone="muted">
          로고는 앱에서 icons로 넘겨요. 이 스토리에는 로고가 없어요.
        </Text>
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Onboarding/OAuthButtons',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
