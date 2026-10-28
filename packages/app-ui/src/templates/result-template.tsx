import { useState, type ReactNode } from 'react';
import {
  Modal,
  ScrollView,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { Text } from '../components/text/text';
import { CloseGlyph } from '../internal/glyphs';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import {
  BottomBar,
  Notice,
  type TemplateAction,
  type TemplateNotice,
} from './parts';

export type ResultPreview = {
  key: string;
  label: string;
  render: () => ReactNode;
};

export type ResultTemplateProps = {
  previews: readonly ResultPreview[];
  index: number;
  onIndexChange: (index: number) => void;
  progress?: ReactNode;
  notice?: TemplateNotice;
  primaryAction?: TemplateAction;
  secondaryAction?: TemplateAction;
  openLabel?: string;
  closeLabel?: string;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  body: { flex: 1, paddingTop: t.space[2] },
  pager: { flex: 1 },
  page: { gap: t.space[2] },
  card: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.muted,
  },
  caption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: t.space[2],
    paddingVertical: t.layout.groupGap,
  },
  dot: {
    width: t.space[2],
    height: t.space[2],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.input,
  },
  dotOn: { width: t.space[5], backgroundColor: t.colors.foreground },
  progress: { flex: 1, paddingHorizontal: t.layout.screenX },
  notice: { paddingBottom: t.layout.groupGap },
  viewer: { flex: 1, backgroundColor: t.colors.background },
  viewerHead: {
    height: t.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: t.space[1],
    gap: t.space[1],
  },
  close: {
    width: t.minTouchSize,
    height: t.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: { flex: 1 },
}));

function Viewer({
  previews,
  index,
  onIndexChange,
  onClose,
  primaryAction,
  closeLabel,
  bottomInset,
}: {
  previews: readonly ResultPreview[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  primaryAction?: TemplateAction;
  closeLabel: string;
  bottomInset: number;
}) {
  const t = useTheme();
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const current = previews[index];
  return (
    <View style={s.viewer}>
      <View style={s.viewerHead}>
        <PressableBase
          onPress={onClose}
          accessibilityLabel={closeLabel}
          style={s.close}
        >
          <CloseGlyph color={t.colors.foreground} size={t.iconSize.md} />
        </PressableBase>
        <Text variant="bodyLg" weight="semibold" accessibilityRole="header">
          {current
            ? `${current.label} · ${index + 1} / ${previews.length}`
            : ''}
        </Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
        contentOffset={{ x: index * width, y: 0 }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          width &&
          onIndexChange(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        style={s.full}
      >
        {previews.map((preview) => (
          <View key={preview.key} style={{ width }}>
            {preview.render()}
          </View>
        ))}
      </ScrollView>
      {primaryAction ? (
        <BottomBar primaryAction={primaryAction} bottomInset={bottomInset} />
      ) : null}
    </View>
  );
}

export function ResultTemplate({
  previews,
  index,
  onIndexChange,
  progress,
  notice,
  primaryAction,
  secondaryAction,
  openLabel = '크게 보기',
  closeLabel = '닫기',
  bottomInset = 0,
}: ResultTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const page = Math.max(0, width - t.layout.screenX * 2 - t.space[6]);
  const step = page + t.layout.itemGap;

  return (
    <View style={s.root}>
      <View
        style={s.body}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
      >
        {progress ? (
          <View style={s.progress}>{progress}</View>
        ) : (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={step || undefined}
              decelerationRate="fast"
              contentContainerStyle={{
                gap: t.layout.itemGap,
                paddingHorizontal: t.layout.screenX,
              }}
              onMomentumScrollEnd={(
                e: NativeSyntheticEvent<NativeScrollEvent>
              ) =>
                step &&
                onIndexChange(Math.round(e.nativeEvent.contentOffset.x / step))
              }
              style={s.pager}
            >
              {previews.map((preview, i) => (
                <View key={preview.key} style={[s.page, { width: page }]}>
                  <PressableBase
                    onPress={() => {
                      onIndexChange(i);
                      setOpen(true);
                    }}
                    accessibilityLabel={`${preview.label} ${openLabel}`}
                    style={s.card}
                  >
                    {preview.render()}
                  </PressableBase>
                  <View style={s.caption}>
                    <Text variant="label" weight="semibold">
                      {preview.label}
                    </Text>
                    <Text variant="label" tone="muted">
                      {openLabel}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={s.dots}>
              {previews.map((preview, i) => (
                <View
                  key={preview.key}
                  style={[s.dot, i === index ? s.dotOn : null]}
                />
              ))}
            </View>
          </>
        )}
      </View>
      {notice ? (
        <View style={s.notice}>
          <Notice notice={notice} />
        </View>
      ) : null}
      {primaryAction && !progress ? (
        <BottomBar
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          bottomInset={bottomInset}
        />
      ) : null}
      <Modal
        visible={open}
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <Viewer
          previews={previews}
          index={index}
          onIndexChange={onIndexChange}
          onClose={() => setOpen(false)}
          primaryAction={primaryAction}
          closeLabel={closeLabel}
          bottomInset={bottomInset}
        />
      </Modal>
    </View>
  );
}
