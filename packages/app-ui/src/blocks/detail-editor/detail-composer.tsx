import { Image, ScrollView, TextInput, View } from 'react-native';
import { Text } from '../../components/text/text';
import {
  CameraGlyph,
  CloseGlyph,
  ImageGlyph,
  LinkGlyph,
  ScanGlyph,
  SparklesGlyph,
} from '../../internal/glyphs';
import { renderIcon, type IconSlot } from '../../internal/icon';
import { PressableBase } from '../../internal/pressable-base';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';

export type ComposerAttachment = {
  key: string;
  kind: 'image' | 'link';
  uri?: string;
  label?: string;
  reference?: boolean;
};

export type ComposerSource = 'library' | 'camera' | 'capture' | 'link';

export type DetailComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSend: () => void;
  sending?: boolean;
  disabled?: boolean;
  attachments?: readonly ComposerAttachment[];
  onRemove?: (key: string) => void;
  onAttach?: (source: ComposerSource) => void;
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  suggestions?: readonly string[];
  onSuggestion?: (text: string) => void;
};

const SOURCES: { key: ComposerSource; label: string; icon: IconSlot }[] = [
  { key: 'library', label: '사진', icon: ImageGlyph },
  { key: 'camera', label: '촬영', icon: CameraGlyph },
  { key: 'capture', label: '캡처', icon: ScanGlyph },
  { key: 'link', label: '링크', icon: LinkGlyph },
];

const THUMB = 44;
const BUTTON = 40;

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[2], paddingHorizontal: t.space[3] },
  box: {
    gap: t.space[2],
    padding: t.space[2],
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
  attached: { gap: t.space[2], paddingHorizontal: t.space[1] },
  thumb: { width: THUMB, height: THUMB, borderRadius: t.radius.md },
  reference: { borderWidth: 2, borderColor: t.colors.primary },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[1],
    height: THUMB,
    paddingHorizontal: t.space[3],
    borderRadius: t.radius.md,
    backgroundColor: t.colors.muted,
  },
  remove: {
    position: 'absolute',
    right: -t.space[1],
    top: -t.space[1],
    width: t.space[5],
    height: t.space[5],
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.foreground,
  },
  line: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
  round: {
    width: BUTTON,
    height: BUTTON,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: t.typography.body.fontSize,
    color: t.colors.foreground,
    paddingVertical: t.space[2],
  },
  plusH: { position: 'absolute', width: t.space[4], height: 2 },
  plusV: { position: 'absolute', width: 2, height: t.space[4] },
  sources: { flexDirection: 'row', justifyContent: 'space-around' },
  source: { alignItems: 'center', gap: t.space[1], width: t.space[16] },
  chips: { gap: t.space[2], paddingHorizontal: t.space[3] },
  chip: {
    height: t.controlSize.sm - t.space[2],
    paddingHorizontal: t.space[4],
    borderRadius: t.radius.full,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
}));

export function DetailComposer({
  value,
  onChangeText,
  placeholder,
  onSend,
  sending,
  disabled,
  attachments = [],
  onRemove,
  onAttach,
  menuOpen,
  onMenuOpenChange,
  suggestions = [],
  onSuggestion,
}: DetailComposerProps) {
  const t = useTheme();
  const s = useStyles();
  const canSend = !disabled && !sending;
  const plusColor = menuOpen ? t.colors.primaryForeground : t.colors.foreground;
  return (
    <View style={s.root}>
      {suggestions.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips}
        >
          {suggestions.map((text) => (
            <PressableBase
              key={text}
              onPress={() => onSuggestion?.(text)}
              accessibilityLabel={text}
              style={s.chip}
            >
              <Text variant="label">{text}</Text>
            </PressableBase>
          ))}
        </ScrollView>
      ) : null}
      {menuOpen ? (
        <View style={s.sources}>
          {SOURCES.map((src) => (
            <PressableBase
              key={src.key}
              onPress={() => onAttach?.(src.key)}
              accessibilityLabel={src.label}
              style={s.source}
            >
              <View style={[s.round, { backgroundColor: t.colors.surface }]}>
                {renderIcon(src.icon, {
                  color: t.colors.foreground,
                  size: t.iconSize.md,
                })}
              </View>
              <Text variant="caption">{src.label}</Text>
            </PressableBase>
          ))}
        </View>
      ) : null}
      <View style={s.box}>
        {attachments.length ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.attached}
          >
            {attachments.map((a) => (
              <View key={a.key}>
                {a.kind === 'image' ? (
                  <Image
                    source={{ uri: a.uri }}
                    style={[s.thumb, a.reference && s.reference]}
                  />
                ) : (
                  <View style={s.link}>
                    {renderIcon(LinkGlyph, {
                      color: t.colors.mutedForeground,
                      size: t.iconSize.sm,
                    })}
                    <Text variant="caption" numberOfLines={1}>
                      {a.label ?? ''}
                    </Text>
                  </View>
                )}
                {onRemove ? (
                  <PressableBase
                    onPress={() => onRemove(a.key)}
                    accessibilityLabel="빼기"
                    touchHeight={t.space[5]}
                    style={s.remove}
                  >
                    <CloseGlyph
                      color={t.colors.surface}
                      size={t.iconSize.sm - t.space[1]}
                    />
                  </PressableBase>
                ) : null}
              </View>
            ))}
          </ScrollView>
        ) : null}
        <View style={s.line}>
          {onAttach ? (
            <PressableBase
              onPress={() => onMenuOpenChange?.(!menuOpen)}
              accessibilityLabel="첨부"
              style={[
                s.round,
                {
                  backgroundColor: menuOpen ? t.colors.primary : t.colors.muted,
                },
              ]}
            >
              <View style={[s.plusH, { backgroundColor: plusColor }]} />
              <View style={[s.plusV, { backgroundColor: plusColor }]} />
            </PressableBase>
          ) : null}
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={t.colors.mutedForeground}
            maxFontSizeMultiplier={t.maxFontScale}
            style={s.input}
            multiline
          />
          <PressableBase
            onPress={onSend}
            disabled={!canSend}
            accessibilityLabel="만들기"
            style={[
              s.round,
              {
                backgroundColor: canSend ? t.colors.primary : t.colors.input,
              },
            ]}
          >
            {renderIcon(SparklesGlyph, {
              color: t.colors.primaryForeground,
              size: t.iconSize.md,
            })}
          </PressableBase>
        </View>
      </View>
    </View>
  );
}
