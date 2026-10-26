import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { demoProducts, Section } from '../../__stories__/helpers';
import { Divider } from '../divider/divider';
import { StatusBadge } from '../status-badge/status-badge';
import { Switch } from '../switch/switch';
import { Text } from '../text/text';
import { ListRow } from './list-row';

function Demo() {
  const [notify, setNotify] = useState(true);
  return (
    <>
      <Section title="pressable · chevron">
        <ListRow
          title="상점 정보"
          description="상호, 연락처, 영업시간"
          onPress={() => {}}
        />
        <Divider inset={16} />
        <ListRow
          title="배송 정책"
          onPress={() => {}}
          trailing={<Text tone="muted">3개</Text>}
        />
      </Section>
      <Section title="trailing 컨트롤">
        <ListRow
          title="새 주문 알림"
          description="주문이 들어오면 바로 알려드려요"
          trailing={
            <Switch
              value={notify}
              onValueChange={setNotify}
              accessibilityLabel="새 주문 알림"
            />
          }
        />
        <Divider inset={16} />
        <ListRow
          title="#20261023-0012"
          description={`${demoProducts.shirt} 외 1건 · 42,000원`}
          trailing={<StatusBadge tone="info">배송중</StatusBadge>}
          onPress={() => {}}
        />
      </Section>
      <Section title="긴 내용">
        <ListRow
          title={demoProducts.long}
          description="설명은 두 줄까지 보여요. 리뷰 내용처럼 길어지는 경우에도 행 높이가 내용에 맞게 늘어납니다. 세 번째 줄부터는 잘립니다."
          onPress={() => {}}
        />
      </Section>
    </>
  );
}

const meta = { title: 'Components/ListRow', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
