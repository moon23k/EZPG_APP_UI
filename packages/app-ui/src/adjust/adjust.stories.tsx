import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Phone } from '../__stories__/phone';
import { useTheme } from '../theme/theme-provider';
import { AdjustTemplate } from './adjust-template';
import { ColorAdjustNote } from './color-adjust-note';
import { ColorTrack } from './color-track';
import { DialStrip } from './dial-strip';
import { hslToHex } from './hsl';
import { ScrubRuler } from './scrub-ruler';

const axes = [
  { key: 'temperature', label: '온도', neg: '차가운', pos: '따뜻한' },
  { key: 'energy', label: '활기', neg: '정적인', pos: '동적인' },
  { key: 'softness', label: '부드러움', neg: '단단한', pos: '부드러운' },
  { key: 'era', label: '시대감', neg: '클래식', pos: '모던' },
  { key: 'intensity', label: '강도', neg: '은은한', pos: '강렬한' },
];

const styles = StyleSheet.create({ fill: { flex: 1 } });

function Preview({ color }: { color: string }) {
  const t = useTheme();
  return (
    <View
      style={{
        ...styles.fill,
        margin: t.space[6],
        borderRadius: t.radius.lg,
        backgroundColor: color,
      }}
    />
  );
}

function Demo() {
  const [values, setValues] = useState<Record<string, number>>({
    temperature: -1,
    softness: 1,
  });
  const [sel, setSel] = useState('temperature');
  const [hue, setHue] = useState(50);
  const [sat, setSat] = useState(90);
  const color = hslToHex(hue, sat, 45);
  const axis = axes.find((a) => a.key === sel);
  return (
    <Phone>
      <AdjustTemplate
        preview={<Preview color={color} />}
        label={axis ? `${axis.label} ${values[sel] ?? 0}` : '대표 색'}
        onCompareChange={() => {}}
        primaryAction={{ label: '사이트에 반영', onPress: () => {} }}
        controls={
          <>
            <DialStrip
              items={[
                ...axes.map((a) => ({
                  key: a.key,
                  label: a.label,
                  value: values[a.key] ?? 0,
                })),
                { key: 'accent', label: '대표 색', color },
              ]}
              selected={sel}
              onSelect={setSel}
            />
            {axis ? (
              <ScrubRuler
                value={values[sel] ?? 0}
                onChange={(v) => setValues({ ...values, [sel]: v })}
                startLabel={axis.neg}
                endLabel={axis.pos}
                accessibilityLabel={`${axis.neg} ${axis.pos}`}
              />
            ) : (
              <>
                <ColorTrack
                  kind="hue"
                  hue={hue}
                  saturation={sat}
                  onChange={setHue}
                  label="색상"
                />
                <ColorTrack
                  kind="saturation"
                  hue={hue}
                  saturation={sat}
                  onChange={setSat}
                  label="채도"
                />
                <ColorAdjustNote
                  original={color}
                  applied={hslToHex(hue, sat, 33)}
                  title="명도 자동 조정"
                  detail="바탕 대비 3.2:1"
                />
              </>
            )}
          </>
        }
      />
    </Phone>
  );
}

const meta = { title: 'Templates/10 조정', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const Variants: StoryObj<typeof meta> = {};
