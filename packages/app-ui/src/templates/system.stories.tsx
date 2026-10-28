import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text } from '../components/text/text';
import { Phone } from '../__stories__/phone';
import { SystemTemplate } from './system-template';

function DownloadIcon({ size }: { size: number }) {
  return <Text style={{ fontSize: size, lineHeight: size }}>⬇</Text>;
}

function Update() {
  return (
    <Phone>
      <SystemTemplate
        icon={DownloadIcon}
        title={'새 버전으로\n업데이트해 주세요'}
        primaryAction={{ label: '업데이트', onPress: () => {} }}
      />
    </Phone>
  );
}

function Demo() {
  return <Update />;
}

const meta = { title: 'Templates/9 시스템', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
