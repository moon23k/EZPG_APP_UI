import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Calendar, type CalendarDate, type CalendarValue } from './calendar';

const days: CalendarDate[] = Array.from({ length: 40 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10);
  const weekend = [5, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay());
  return {
    date,
    label: weekend ? '16만' : '12만',
    disabled: i === 9 || i === 10,
  };
});

function Demo({ mode }: { mode: 'single' | 'range' }) {
  const [value, setValue] = useState<CalendarValue>({
    start: '2026-11-06',
    end: mode === 'range' ? '2026-11-08' : undefined,
  });
  return (
    <Calendar days={days} mode={mode} value={value} onValueChange={setValue} />
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
