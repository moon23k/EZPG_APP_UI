import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Field } from '../components/field/field';
import { ListRow } from '../components/list-row/list-row';
import { SectionTabs } from '../components/section-tabs/section-tabs';
import { CoverPhotos } from '../blocks/cover-photos/cover-photos';
import { demoPhotoIds, sample } from '../__stories__/helpers';
import { Phone } from '../__stories__/phone';
import { SheetBlock, SheetFormTemplate } from './sheet-form-template';

function Screen() {
  const [tab, setTab] = useState('photo');
  return (
    <Phone title="">
      <SheetFormTemplate
        title="상품 등록"
        onBack={() => {}}
        action={{ label: '미리보기', onPress: () => {} }}
        tabs={
          <SectionTabs
            items={[
              { value: 'photo', label: '사진' },
              { value: 'info', label: '정보' },
              { value: 'detail', label: '상세페이지' },
              { value: 'sale', label: '판매', dot: true },
            ]}
            value={tab}
            onValueChange={setTab}
          />
        }
        primaryAction={{ label: '등록', onPress: () => {} }}
        secondaryAction={{ label: '임시저장', onPress: () => {} }}
      >
        <SheetBlock title="사진">
          <CoverPhotos
            photos={[
              { id: '1', ...sample(demoPhotoIds.mug, 400) },
              { id: '2', ...sample(demoPhotoIds.latte, 400) },
            ]}
            onAdd={() => {}}
          />
        </SheetBlock>
        <SheetBlock title="정보">
          <Field
            label="상품 이름"
            value="푸른 유약 손잡이 볼"
            onChangeText={() => {}}
          />
          <ListRow
            title="가격"
            value="38,400원 · 20% 할인"
            chevron
            onPress={() => {}}
          />
        </SheetBlock>
      </SheetFormTemplate>
    </Phone>
  );
}

const meta = { title: 'Templates/SheetForm', component: Screen } satisfies Meta<
  typeof Screen
>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
