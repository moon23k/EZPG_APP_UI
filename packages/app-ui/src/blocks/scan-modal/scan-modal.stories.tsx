import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { Row } from '../../__stories__/helpers';
import { Button } from '../../components/button/button';
import { ScanModal } from './scan-modal';

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Row>
      <Button variant="outline" onPress={() => setOpen(true)}>
        스캔 열기
      </Button>
      <ScanModal open={open} onClose={() => setOpen(false)} title="송장 스캔">
        {(frame) => <View {...frame} />}
      </ScanModal>
    </Row>
  );
}

const meta = {
  title: 'Blocks/Orders/ScanModal',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
