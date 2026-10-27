import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Row } from '../../__stories__/helpers';
import { Button } from '../button/button';
import { Field } from '../field/field';
import { Text } from '../text/text';
import { Sheet } from './sheet';

function Demo() {
  const [memo, setMemo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <Row>
      <Button variant="outline" onPress={() => setMemo(true)}>
        메모 입력 (키보드)
      </Button>
      <Button variant="outline" onPress={() => setConfirm(true)}>
        닫기 막힘
      </Button>

      <Sheet
        open={memo}
        onOpenChange={setMemo}
        title="배송 메모"
        bottomInset={24}
      >
        <Field placeholder="예) 문 앞에 놓아주세요" autoFocus />
        <Button onPress={() => setMemo(false)}>저장</Button>
      </Sheet>

      <Sheet
        open={confirm}
        onOpenChange={setConfirm}
        title="주문을 취소할까요?"
        dismissible={false}
      >
        <Text tone="muted">
          취소하면 결제 금액이 환불되고 되돌릴 수 없어요.
        </Text>
        <Button variant="danger" onPress={() => setConfirm(false)}>
          주문 취소
        </Button>
        <Button variant="ghost" onPress={() => setConfirm(false)}>
          돌아가기
        </Button>
      </Sheet>
    </Row>
  );
}

const meta = { title: 'Components/Sheet', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
