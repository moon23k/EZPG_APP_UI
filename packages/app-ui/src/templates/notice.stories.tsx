import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { CheckList } from '../components/check-list/check-list';
import { Phone } from '../__stories__/phone';
import { NoticeTemplate } from './notice-template';

function Demo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <Phone>
      <NoticeTemplate
        title="탈퇴 전에 꼭 확인해주세요"
        onClose={() => {}}
        consent={{
          label: '유의사항을 모두 확인했어요',
          value: agreed,
          onValueChange: setAgreed,
        }}
        secondaryAction={{ label: '취소', onPress: () => {} }}
        primaryAction={{
          label: '탈퇴하기',
          onPress: () => {},
          disabled: !agreed,
        }}
      >
        <CheckList
          items={[
            '모든 기기에서 로그아웃돼요.',
            '연결된 로그인 수단이 모두 해제돼요.',
          ]}
        />
      </NoticeTemplate>
    </Phone>
  );
}

const meta = { title: 'Templates/10 안내', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
