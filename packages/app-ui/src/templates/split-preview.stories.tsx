import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ListRow } from '../components/list-row/list-row';
import { SplitPreviewTemplate } from './split-preview-template';

function Demo() {
  return (
    <SplitPreviewTemplate
      preview={<View />}
      saveAction={{ label: '저장', onPress: () => {} }}
    >
      <ListRow title="안내 문구" />
    </SplitPreviewTemplate>
  );
}

const meta = {
  title: 'Templates/SplitPreviewTemplate',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
