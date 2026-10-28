import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Field } from '../components/field/field';
import { ListRow } from '../components/list-row/list-row';
import { Switch } from '../components/switch/switch';
import { Text } from '../components/text/text';
import { useTheme } from '../theme/theme-provider';
import { Phone } from '../__stories__/phone';
import { ListSection } from './parts';
import { FormTemplate } from './scroll-templates';

function Screen() {
  const t = useTheme();
  const [ship, setShip] = useState(true);
  const [pickup, setPickup] = useState(true);
  const [local, setLocal] = useState(false);
  const [fee, setFee] = useState('3000');
  const [free, setFree] = useState('50000');
  return (
    <Phone title="배송" leading="back">
      <FormTemplate saveAction={{ label: '저장', onPress: () => {} }}>
        <ListSection title="받는 방법">
          <ListRow
            title="택배"
            trailing={<Switch value={ship} onValueChange={setShip} />}
          />
          <ListRow
            title="매장 픽업"
            description="성수 쇼룸"
            trailing={<Switch value={pickup} onValueChange={setPickup} />}
          />
          <ListRow
            title="직접 배송"
            trailing={<Switch value={local} onValueChange={setLocal} />}
          />
        </ListSection>
        <ListSection title="택배">
          <View
            style={{
              gap: t.space[4],
              paddingHorizontal: t.layout.screenX,
              paddingBottom: t.space[2],
            }}
          >
            <Field
              label="배송비"
              value={fee}
              onChangeText={setFee}
              keyboardType="number-pad"
              trailing={
                <Text variant="body" tone="muted">
                  원
                </Text>
              }
            />
            <Field
              label="무료 배송 기준"
              value={free}
              onChangeText={setFree}
              keyboardType="number-pad"
              trailing={
                <Text variant="body" tone="muted">
                  원 이상
                </Text>
              }
            />
          </View>
          <ListRow title="택배사" description="CJ대한통운" onPress={() => {}} />
          <ListRow
            title="당일 발송 마감"
            description="오후 2시"
            onPress={() => {}}
          />
        </ListSection>
      </FormTemplate>
    </Phone>
  );
}

function Demo() {
  return <Screen />;
}

const meta = { title: 'Templates/5 설정 폼', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
