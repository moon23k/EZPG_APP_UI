import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ListRow } from '../components/list-row/list-row';
import { Phone, useStoryStyles } from '../__stories__/phone';
import { ListSection } from './parts';
import { MenuTemplate } from './scroll-templates';

function Screen() {
  const avatar = <View style={useStoryStyles().avatar} />;
  return (
    <Phone title="더보기" tab="more">
      <MenuTemplate>
        <ListSection>
          <ListRow
            leading={avatar}
            title="하루 리빙"
            description="haru.ezpg.shop"
            onPress={() => {}}
          />
          <ListRow title="내 사이트" onPress={() => {}} />
          <ListRow title="판매 설정" onPress={() => {}} />
          <ListRow title="AI 응대" description="켜짐" onPress={() => {}} />
          <ListRow title="매출" onPress={() => {}} />
          <ListRow title="요금제" description="베이직" onPress={() => {}} />
          <ListRow title="계정" onPress={() => {}} />
        </ListSection>
      </MenuTemplate>
    </Phone>
  );
}

function Demo() {
  return <Screen />;
}

const meta = { title: 'Templates/6 메뉴', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
