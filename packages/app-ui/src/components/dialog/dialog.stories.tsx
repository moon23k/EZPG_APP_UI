import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Row } from '../../__stories__/helpers';
import { Button } from '../button/button';
import { Sheet } from '../sheet/sheet';
import { Text } from '../text/text';
import { ToastProvider, useToast } from '../toast/toast';
import { Dialog } from './dialog';

function Demo() {
  const toast = useToast();
  const [basic, setBasic] = useState(false);
  const [danger, setDanger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [nested, setNested] = useState(false);

  return (
    <Row>
      <Button variant="outline" onPress={() => setBasic(true)}>
        기본
      </Button>
      <Button variant="outline" onPress={() => setDanger(true)}>
        삭제 확인
      </Button>
      <Button variant="outline" onPress={() => setSheet(true)}>
        Sheet 위 Dialog
      </Button>

      <Dialog
        open={basic}
        onOpenChange={setBasic}
        title="주문을 접수할까요?"
        confirmLabel="접수"
        onConfirm={() => {
          setBasic(false);
          toast.show({ message: '주문을 접수했어요', tone: 'success' });
        }}
      />

      <Dialog
        open={danger}
        onOpenChange={setDanger}
        title="상품을 삭제할까요?"
        confirmLabel="삭제"
        destructive
        loading={loading}
        onConfirm={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setDanger(false);
            toast.show({ message: '상품을 삭제했어요' });
          }, 1200);
        }}
      />

      <Sheet open={sheet} onOpenChange={setSheet} title="주문 관리">
        <Text tone="muted">
          Sheet가 열린 채로 Dialog와 Toast가 위에 떠야 해요.
        </Text>
        <Button variant="destructive" onPress={() => setNested(true)}>
          주문 취소
        </Button>
        <Dialog
          open={nested}
          onOpenChange={setNested}
          title="주문을 취소할까요?"
          destructive
          confirmLabel="취소하기"
          cancelLabel="돌아가기"
          onConfirm={() => {
            setNested(false);
            toast.show({ message: '주문을 취소했어요', tone: 'destructive' });
          }}
        />
      </Sheet>
    </Row>
  );
}

function Story() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}

const meta = { title: 'Components/Dialog', component: Story } satisfies Meta<
  typeof Story
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
