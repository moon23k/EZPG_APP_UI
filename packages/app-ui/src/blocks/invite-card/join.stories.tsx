import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Phone } from '../../__stories__/phone';
import { useTheme } from '../../theme/theme-provider';
import { CodeInput } from '../code-input/code-input';
import { ConsentList } from '../consent-list/consent-list';
import { InviteCard } from './invite-card';

function Demo() {
  const t = useTheme();
  const [code, setCode] = useState('VWBX');
  const [checked, setChecked] = useState<Record<string, boolean>>({
    terms: true,
  });
  const items = [
    { key: 'terms', label: '이용약관', required: true },
    { key: 'privacy', label: '개인정보 수집 · 이용', required: true },
    { key: 'marketing', label: '혜택 · 소식 알림', required: false },
  ].map((i) => ({ ...i, checked: Boolean(checked[i.key]), onView: () => {} }));
  return (
    <Phone>
      <View style={{ padding: t.layout.screenX, gap: t.layout.groupGap }}>
        <InviteCard
          title="모먼트 스토어"
          tags={['직원으로 초대', '11월 10일까지']}
          rows={[{ label: '초대한 사람', value: '김사장' }]}
        />
        <InviteCard compact title="모먼트 스토어" description="직원으로 합류" />
        <InviteCard
          compact
          title="초대받았어요"
          description="초대 코드로 상점에 합류"
          onPress={() => {}}
        />
        <CodeInput
          value={code}
          onChangeText={setCode}
          accessibilityLabel="초대 코드"
        />
        <ConsentList
          items={items}
          onChange={(key, v) => setChecked({ ...checked, [key]: v })}
          onChangeAll={(v) =>
            setChecked(Object.fromEntries(items.map((i) => [i.key, v])))
          }
        />
      </View>
    </Phone>
  );
}

const meta = {
  title: 'Blocks/Onboarding/InviteCard · CodeInput · ConsentList',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
