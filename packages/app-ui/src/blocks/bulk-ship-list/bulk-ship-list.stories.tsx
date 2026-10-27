import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { View } from 'react-native';
import { ListRow } from '../../components/list-row/list-row';
import { StatusBadge } from '../../components/status-badge/status-badge';
import { Text } from '../../components/text/text';
import { demoProducts, Section } from '../../__stories__/helpers';
import { BulkShipList, type BulkShipRow } from './bulk-ship-list';

const carriers = [
  { code: 'cj', name: 'CJ대한통운' },
  { code: 'post', name: '우체국택배' },
  { code: 'hanjin', name: '한진택배' },
  { code: 'lotte', name: '롯데택배' },
  { code: 'logen', name: '로젠택배' },
];

const initial: BulkShipRow[] = [
  {
    id: '1',
    title: demoProducts.shirt,
    subtitle: '주문 20261027-0012 · 김○○',
    trackingNo: '',
  },
  {
    id: '2',
    title: demoProducts.beans,
    subtitle: '주문 20261027-0013 · 이○○',
    trackingNo: '6012-3456-7890',
  },
  {
    id: '3',
    title: demoProducts.mug,
    subtitle: '주문 20261027-0014 · 박○○',
    trackingNo: '601234567890',
  },
  {
    id: '4',
    title: demoProducts.long,
    subtitle: '주문 20261027-0015 · 최○○ · 요청 사항: 문 앞에 놓아 주세요',
    trackingNo: '12ab',
  },
];

function Demo({ scan }: { scan?: boolean }) {
  const [carrier, setCarrier] = useState<string | null>('cj');
  const [rows, setRows] = useState(initial);
  return (
    <Section title="택배사 한 번 · 주문별 송장 · 형식 오류 · 중복">
      <BulkShipList
        carriers={carriers}
        carrier={carrier}
        onCarrierChange={setCarrier}
        rows={rows}
        onTrackingChange={(id, value) =>
          setRows((list) =>
            list.map((r) => (r.id === id ? { ...r, trackingNo: value } : r))
          )
        }
        onScan={scan ? () => {} : undefined}
      />
    </Section>
  );
}

function ResultDemo() {
  return (
    <Section title="일괄 결과 (Sheet 안 내용 예시)">
      <View>
        <Text weight="bold" variant="bodyLg">
          3건 중 2건 등록했어요
        </Text>
        <ListRow
          title={demoProducts.shirt}
          description="CJ대한통운 6012-3456-7891"
          trailing={<StatusBadge tone="success">등록</StatusBadge>}
        />
        <ListRow
          title={demoProducts.beans}
          description="CJ대한통운 6012-3456-7890"
          trailing={<StatusBadge tone="success">등록</StatusBadge>}
        />
        <ListRow
          title={demoProducts.mug}
          description="이미 취소된 주문이에요"
          trailing={<StatusBadge tone="destructive">실패</StatusBadge>}
        />
      </View>
    </Section>
  );
}

const meta = {
  title: 'Blocks/Orders/BulkShipList',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
export const WithScan: StoryObj<typeof meta> = { args: { scan: true } };
export const Result: StoryObj<typeof meta> = {
  render: () => <ResultDemo />,
};
