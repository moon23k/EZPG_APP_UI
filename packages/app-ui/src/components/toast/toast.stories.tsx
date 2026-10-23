import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Row } from '../../__stories__/helpers';
import { Button } from '../button/button';
import { Sheet } from '../sheet/sheet';
import { ToastProvider, useToast } from './toast';

function Demo() {
  const toast = useToast();
  const [sheet, setSheet] = useState(false);
  return (
    <Row>
      <Button
        variant="outline"
        onPress={() => toast.show({ message: '임시 저장했어요' })}
      >
        neutral
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.show({ message: '정산 계좌를 등록했어요', tone: 'success' })
        }
      >
        success
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.show({
            message: '사진 업로드에 실패했어요',
            tone: 'destructive',
            duration: 4000,
          })
        }
      >
        destructive (4초)
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.show({
            message: '옵션 삭제됨',
            action: { label: '실행 취소', onPress: () => {} },
          })
        }
      >
        실행 취소
      </Button>
      <Button variant="outline" onPress={() => setSheet(true)}>
        Sheet 안에서
      </Button>
      <Sheet open={sheet} onOpenChange={setSheet} title="Toast 겹침 확인">
        <Button
          onPress={() => toast.show({ message: 'Sheet 위에 보여야 해요' })}
        >
          Toast 띄우기
        </Button>
      </Sheet>
    </Row>
  );
}

function Story() {
  return (
    <ToastProvider bottomInset={16}>
      <Demo />
    </ToastProvider>
  );
}

const meta = { title: 'Components/Toast', component: Story } satisfies Meta<
  typeof Story
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
