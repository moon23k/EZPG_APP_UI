import { useState } from 'react';
import { TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../components/text/text';
import { ChevronGlyph } from '../../internal/glyphs';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type QuestionOption = { value: string; label: string };

export type QuestionSection = {
  key: string;
  label: string;
  question: string;
  options: readonly QuestionOption[];
  value: readonly string[];
  hint?: string;
  max?: number;
  other?: string;
};

export type QuestionAccordionProps = {
  sections: readonly QuestionSection[];
  openKey: string | null;
  onOpenChange: (key: string | null) => void;
  onValueChange: (key: string, value: string[]) => void;
  onOtherChange?: (key: string, text: string) => void;
  otherLabel?: string;
  otherMax?: number;
  style?: StyleProp<ViewStyle>;
};

const ROW = 54;
const CELL = 50;
const DOT = 6;

const useStyles = makeStyles((t) => ({
  row: {
    height: ROW,
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
  },
  line: { borderTopWidth: 1, borderTopColor: t.colors.border },
  index: {
    width: t.space[6],
    ...t.typography.caption,
    fontWeight: '500',
    color: t.colors.ring,
    fontVariant: ['tabular-nums'],
  },
  label: { ...t.typography.label, color: t.colors.mutedForeground },
  summary: {
    flex: 1,
    textAlign: 'right',
    ...t.typography.body,
    fontWeight: '500',
    color: t.colors.title,
  },
  chevron: { transform: [{ rotate: '90deg' }] },
  panel: {
    marginHorizontal: -t.space[3],
    marginVertical: t.space[2],
    paddingTop: t.space[4],
    paddingBottom: t.space[3],
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.xl,
    backgroundColor: t.colors.surface,
    boxShadow: t.shadow.panel,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  openIndex: { color: t.colors.primary },
  eyebrow: { ...t.typography.eyebrow, color: t.colors.primary },
  hint: {
    marginLeft: 'auto',
    ...t.typography.caption,
    color: t.colors.ring,
  },
  question: {
    marginTop: t.space[2],
    marginBottom: t.space[4],
    ...t.typography.question,
    color: t.colors.title,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: t.colors.border,
  },
  cell: {
    width: '50%',
    height: CELL,
    justifyContent: 'center',
    paddingHorizontal: t.space[3],
    borderBottomWidth: 1,
    borderBottomColor: t.colors.border,
  },
  right: { borderLeftWidth: 1, borderLeftColor: t.colors.border },
  picked: { backgroundColor: t.colors.selectSurface },
  cellText: { ...t.typography.body, color: t.colors.mutedForeground },
  pickedText: { fontWeight: '500', color: t.colors.selectForeground },
  otherText: { color: t.colors.ring },
  dot: {
    position: 'absolute',
    right: t.space[3],
    width: DOT,
    height: DOT,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primary,
  },
  input: {
    marginTop: t.space[3],
    paddingVertical: t.space[2],
    borderBottomWidth: 1,
    borderBottomColor: t.colors.input,
    ...t.typography.body,
    color: t.colors.title,
  },
}));

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function QuestionAccordion({
  sections,
  openKey,
  onOpenChange,
  onValueChange,
  onOtherChange,
  otherLabel = '기타 · 직접 입력',
  otherMax = 20,
  style,
}: QuestionAccordionProps) {
  const t = useTheme();
  const s = useStyles();
  const [typing, setTyping] = useState<string | null>(null);

  return (
    <View style={style}>
      {sections.map((section, i) => {
        const open = section.key === openKey;
        const prevOpen = i > 0 && sections[i - 1]?.key === openKey;
        const chosen = section.options
          .filter((o) => section.value.includes(o.value))
          .map((o) => o.label);
        const summary = [
          ...chosen,
          ...(section.other ? [section.other] : []),
        ].join(' · ');
        if (!open) {
          return (
            <PressableBase
              key={section.key}
              accessibilityRole="button"
              accessibilityState={{ expanded: false }}
              accessibilityLabel={
                summary ? `${section.label}, ${summary}` : section.label
              }
              onPress={() => onOpenChange(section.key)}
              style={[s.row, i > 0 && !prevOpen && s.line]}
            >
              <Text style={s.index}>{pad(i + 1)}</Text>
              <Text style={s.label}>{section.label}</Text>
              <Text numberOfLines={1} style={s.summary}>
                {summary}
              </Text>
              <View style={s.chevron}>
                <ChevronGlyph color={t.colors.ring} size={16} />
              </View>
            </PressableBase>
          );
        }
        const max = section.max ?? section.options.length;
        const otherOn = typing === section.key || Boolean(section.other);
        const cells = [
          ...section.options.map((o) => ({ ...o, other: false })),
          ...(onOtherChange
            ? [{ value: '__other', label: otherLabel, other: true }]
            : []),
        ];
        return (
          <View key={section.key} style={s.panel}>
            <View style={s.head}>
              <Text style={[s.index, s.openIndex]}>{pad(i + 1)}</Text>
              <Text accessibilityRole="header" style={s.eyebrow}>
                {section.label}
              </Text>
              {section.hint ? <Text style={s.hint}>{section.hint}</Text> : null}
            </View>
            <Text style={s.question}>{section.question}</Text>
            <View accessibilityRole="list" style={s.grid}>
              {cells.map((cell, c) => {
                const picked = cell.other
                  ? otherOn
                  : section.value.includes(cell.value);
                return (
                  <PressableBase
                    key={cell.value}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: picked }}
                    accessibilityLabel={cell.label}
                    onPress={() => {
                      if (cell.other) {
                        if (otherOn) {
                          setTyping(null);
                          onOtherChange?.(section.key, '');
                        } else {
                          setTyping(section.key);
                        }
                        return;
                      }
                      const next = picked
                        ? section.value.filter((v) => v !== cell.value)
                        : section.value.length < max
                          ? [...section.value, cell.value]
                          : [...section.value];
                      onValueChange(section.key, next);
                    }}
                    style={[s.cell, c % 2 === 1 && s.right, picked && s.picked]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        s.cellText,
                        cell.other && !picked && s.otherText,
                        picked && s.pickedText,
                      ]}
                    >
                      {cell.label}
                    </Text>
                    {picked ? <View style={s.dot} /> : null}
                  </PressableBase>
                );
              })}
            </View>
            {otherOn ? (
              <TextInput
                value={section.other ?? ''}
                onChangeText={(text) => onOtherChange?.(section.key, text)}
                maxLength={otherMax}
                autoFocus={typing === section.key && !section.other}
                accessibilityLabel={`${section.label} ${otherLabel}`}
                placeholderTextColor={t.colors.ring}
                style={s.input}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
