import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { Column, Section } from '../../__stories__/helpers';
import { FileGlyph, ImageGlyph, MenuGlyph, PaletteGlyph } from '../../index';
import { DetailCanvas } from './detail-canvas';
import { DetailComposer } from './detail-composer';
import { DetailEditorTemplate, EditorPanel } from './detail-editor-template';
import type { DetailDocValue, DetailFont, DetailLayout } from './detail-types';
import { DraftStrip } from './draft-strip';
import { EditorBar } from './editor-bar';
import { FontPicker } from './font-picker';
import { LayoutPicker } from './layout-picker';
import { CompareSlider } from './compare-slider';
import { PhotoTray } from './photo-tray';
import { ToolRow } from './tool-row';

const photo = 'https://picsum.photos/seed/zdot-vase/600/750';

const doc: DetailDocValue = {
  version: 2,
  blocks: [
    {
      id: 'b1',
      layout: 'image',
      layers: [{ id: 'p1', type: 'image', url: photo }],
    },
    {
      id: 'b2',
      layout: 'text',
      layers: [
        {
          id: 't1',
          type: 'text',
          text: '한 송이만 꽂아도\n달라지는 자리',
          style: { font: 'serif', size: 8, weight: 'bold', align: 'center' },
        },
      ],
    },
    {
      id: 'b3',
      layout: 'side',
      layers: [
        { id: 'p2', type: 'image', url: photo },
        {
          id: 't2',
          type: 'text',
          text: '지름 12cm · 높이 24cm',
          style: { size: 6, weight: 'bold', effect: 'band' },
        },
      ],
    },
  ],
};

function Demo() {
  const [draft, setDraft] = useState('d1');
  const [layout, setLayout] = useState<DetailLayout>('side');
  const [font, setFont] = useState<DetailFont>('serif');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(true);
  return (
    <Column>
      <Section title="편집 화면">
        <DetailEditorTemplate
          bar={
            <EditorBar
              onClose={() => {}}
              onUndo={() => {}}
              onLayers={() => {}}
              onPreview={() => {}}
              action={{ label: '등록', onPress: () => {} }}
            />
          }
          bottom={
            <ToolRow
              items={[
                {
                  key: 'add',
                  icon: ImageGlyph,
                  label: '추가',
                  onPress: () => {},
                },
                {
                  key: 'bg',
                  icon: PaletteGlyph,
                  label: '배경',
                  onPress: () => {},
                },
                {
                  key: 'text',
                  icon: FileGlyph,
                  label: '글',
                  onPress: () => {},
                  active: true,
                },
                {
                  key: 'layers',
                  icon: MenuGlyph,
                  label: '레이어',
                  onPress: () => {},
                },
              ]}
            />
          }
        >
          <DetailCanvas
            doc={doc}
            selection={{ block: 'b2', layer: 't1' }}
            onSelect={() => {}}
          />
        </DetailEditorTemplate>
      </Section>
      <Section title="초안 고르기">
        <DraftStrip
          items={['d1', 'd2', 'd3', 'd4'].map((key, i) => ({
            key,
            label: `초안 ${i + 1}`,
            thumb: <DetailCanvas doc={doc} scale={0.2} />,
          }))}
          value={draft}
          onValueChange={setDraft}
          onMore={() => {}}
        />
      </Section>
      <Section title="사진 칸">
        <PhotoTray
          photos={[
            { key: 'a', uri: photo },
            { key: 'b', uri: photo },
            { key: 'c', uri: photo, reference: true },
          ]}
          onRemove={() => {}}
          onAdd={() => {}}
        />
      </Section>
      <Section title="원본과 비교">
        <CompareSlider before={photo} after={photo} />
      </Section>
      <Section title="블록 배치">
        <LayoutPicker value={layout} onValueChange={setLayout} />
      </Section>
      <Section title="글꼴">
        <EditorPanel>
          <FontPicker
            value={font}
            onValueChange={setFont}
            sample="Aa 한 송이"
          />
        </EditorPanel>
      </Section>
      <Section title="입력창">
        <DetailComposer
          value={text}
          onChangeText={setText}
          placeholder="어떤 상세페이지를 만들까요?"
          onSend={() => {}}
          attachments={[
            { key: 'a1', kind: 'image', uri: photo },
            { key: 'a2', kind: 'image', uri: photo, reference: true },
            { key: 'a3', kind: 'link', label: 'smartstore.naver.com' },
          ]}
          onRemove={() => {}}
          onAttach={() => {}}
          menuOpen={open}
          onMenuOpenChange={setOpen}
          suggestions={['초안 4개', '꽃 꽂은 컷', '크기 비교']}
          onSuggestion={() => {}}
        />
      </Section>
    </Column>
  );
}

const meta = { title: 'Blocks/DetailEditor', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
