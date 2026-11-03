import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Calendar, type CalendarDate, type CalendarValue } from './calendar';

const days: CalendarDate[] = Array.from({ length: 40 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10);
  const weekend = [5, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay());
  return {
    date,
    label: weekend ? '160,000' : '120,000',
    disabled: i === 9 || i === 10,
    marked: i === 4,
  };
});

function Demo({
  mode,
  stacked,
}: {
  mode: 'single' | 'range';
  stacked?: boolean;
}) {
  const [value, setValue] = useState<CalendarValue>({
    start: '2026-11-06',
    end: mode === 'range' ? '2026-11-08' : undefined,
  });
  return (
    <Calendar
      days={days}
      mode={mode}
      stacked={stacked}
      today="2026-11-03"
      value={value}
      onValueChange={setValue}
    />
  );
}

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  args: { days, value: {}, onValueChange: () => {} },
} satisfies Meta<typeof Calendar>;
export default meta;

export const Range: StoryObj<typeof meta> = {
  render: () => <Demo mode="range" />,
};
export const Single: StoryObj<typeof meta> = {
  render: () => <Demo mode="single" />,
};
export const Stacked: StoryObj<typeof meta> = {
  render: () => <Demo mode="range" stacked />,
};
