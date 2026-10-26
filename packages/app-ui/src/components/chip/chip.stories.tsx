import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Row, Section } from '../../__stories__/helpers';

const categories = ['의류', '카페', '생활용품', '문구'];
import { Chip } from './chip';

const filters = ['전체', '결제완료', '배송중', '배송완료', '취소'];

function Demo() {
  const [single, setSingle] = useState('전체');
  const [multi, setMulti] = useState<string[]>(['의류', '카페']);
  const toggle = (v: string) =>
    setMulti((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  return (
    <>
      <Section title="single select">
        <Row>
          {filters.map((f) => (
            <Chip key={f} selected={single === f} onPress={() => setSingle(f)}>
              {f}
            </Chip>
          ))}
        </Row>
      </Section>
      <Section title="multi select">
        <Row>
          {categories.map((f) => (
            <Chip
              key={f}
              selected={multi.includes(f)}
              onPress={() => toggle(f)}
            >
              {f}
            </Chip>
          ))}
        </Row>
      </Section>
      <Section title="disabled">
        <Row>
          <Chip disabled>품절</Chip>
          <Chip selected disabled>
            선택됨
          </Chip>
        </Row>
      </Section>
    </>
  );
}

const meta = { title: 'Components/Chip', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
