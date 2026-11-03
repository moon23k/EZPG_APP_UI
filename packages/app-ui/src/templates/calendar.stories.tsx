import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import {
  Calendar,
  type CalendarDate,
  type CalendarValue,
} from '../components/calendar/calendar';
import { Field } from '../components/field/field';
import { ListRow } from '../components/list-row/list-row';
import { Switch } from '../components/switch/switch';
import { Phone } from '../__stories__/phone';
import { CalendarTemplate } from './calendar-template';

const days: CalendarDate[] = Array.from({ length: 58 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 10, 3 + i)).toISOString().slice(0, 10);
  const weekend = [5, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay());
  const price = (i >= 14 ? 150_000 : 90_000) + (weekend ? 40_000 : 0);
  return {
    date,
    label: i === 10 ? '중지' : price.toLocaleString('ko-KR'),
    marked: i === 11,
  };
});

function Demo() {
  const [value, setValue] = useState<CalendarValue>({
    start: '2026-11-17',
    end: '2026-11-19',
  });
  const [closed, setClosed] = useState(false);
  return (
    <Phone title="11월 17일 – 11월 19일" leading="back">
      <CalendarTemplate
        calendar={
          <Calendar
            days={days}
            mode="range"
            stacked
            today="2026-11-03"
            value={value}
            onValueChange={setValue}
          />
        }
        panel={
          value.start
            ? {
                field: (
                  <Field
                    label="1박 요금"
                    value="150,000"
                    onChangeText={() => {}}
                  />
                ),
                rows: (
                  <ListRow
                    title="판매 중지"
                    trailing={
                      <Switch
                        accessibilityLabel="판매 중지"
                        value={closed}
                        onValueChange={setClosed}
                      />
                    }
                  />
                ),
              }
            : undefined
        }
      />
    </Phone>
  );
}

const meta = { title: 'Templates/9 달력', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
