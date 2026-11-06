import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Stepper } from '../../components/stepper/stepper';
import {
  AnswerChips,
  HistoryList,
  MetricCard,
  Panel,
  SummaryHeader,
  TimeSpanCard,
  ToggleCard,
  UsageCard,
  ValueTiles,
  YearBand,
} from './summary-cards';

function Demo() {
  const [units, setUnits] = useState(2);
  const [on, setOn] = useState(true);
  return (
    <>
      <SummaryHeader
        title="숲속 복층 객실"
        image={null}
        badge="판매 중"
        people="기준 4인 · 최대 6인"
      >
        <Stepper
          label="객실 수"
          value={units}
          onValueChange={setUnits}
          min={1}
        />
      </SummaryHeader>
      <TimeSpanCard
        startLabel="입실"
        start="16:00"
        endLabel="퇴실"
        end="11:00"
        middle="1~5박"
      />
      <ValueTiles
        items={[
          { key: 'a', label: '주중', value: '90,000원', emphasis: true },
          { key: 'b', label: '주말', value: '130,000원' },
        ]}
      />
      <MetricCard label="견적 금액" value="720,000원" emphasis />
      <MetricCard label="희망 날짜" value="2026-11-19" aside="D-13" />
      <YearBand
        label="2026년"
        months={Array.from({ length: 12 }, (_, i) => i > 9)}
      />
      <AnswerChips
        items={[{ key: 'a', label: '공간', values: ['원룸', '오피스텔'] }]}
      />
      <HistoryList
        items={[
          { key: 'a', title: '요청 접수', at: '11.05', done: true },
          { key: 'b', title: '견적서 보내기', done: false },
        ]}
      />
      <UsageCard
        title="오늘 응대"
        used={12}
        total={100}
        caption="100건 중 12건"
      />
      <ToggleCard title="AI 응대" value={on} onValueChange={setOn} />
      <Panel>
        <Stepper
          label="계약금"
          value={20}
          suffix="%"
          step={5}
          onValueChange={() => {}}
        />
      </Panel>
    </>
  );
}

const meta = {
  title: 'Blocks/Summary/Cards',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
