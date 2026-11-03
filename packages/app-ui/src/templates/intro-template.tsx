import { useRef, useState, type ComponentRef, type ReactNode } from 'react';
import {
  ScrollView,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { Button } from '../components/button/button';
import { Text } from '../components/text/text';
import { PressableBase } from '../internal/pressable-base';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';

export type IntroPage = {
  key: string;
  title: string;
  art: (width: number) => ReactNode;
};

export type IntroTemplateProps = {
  pages: readonly IntroPage[];
  onDone: () => void;
  nextLabel?: string;
  doneLabel?: string;
  skipLabel?: string;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  top: {
    height: t.minTouchSize,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: t.layout.screenX,
  },
  skip: {
    minWidth: t.minTouchSize,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pager: { flex: 1 },
  page: {
    flex: 1,
    justifyContent: 'center',
    gap: t.layout.titleGap,
    paddingHorizontal: t.layout.screenX,
  },
  title: { textAlign: 'center' },
  footer: {
    gap: t.layout.titleGap,
    paddingHorizontal: t.layout.screenX,
    paddingTop: t.layout.footerTop,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: t.space[2],
  },
  dot: {
    width: t.space[2],
    height: t.space[2],
    borderRadius: t.radius.full,
    backgroundColor: t.colors.input,
  },
  dotOn: { width: t.space[5], backgroundColor: t.colors.primary },
}));

export function IntroTemplate({
  pages,
  onDone,
  nextLabel = '다음',
  doneLabel = '시작하기',
  skipLabel = '건너뛰기',
  bottomInset = 0,
}: IntroTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  const pager = useRef<ComponentRef<typeof ScrollView>>(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const last = index >= pages.length - 1;
  const art = Math.max(0, width - t.layout.screenX * 2);

  const next = () => {
    if (last) {
      onDone();
      return;
    }
    pager.current?.scrollTo({ x: (index + 1) * width, animated: true });
    setIndex(index + 1);
  };

  return (
    <View style={s.root}>
      <View style={s.top}>
        {last ? null : (
          <PressableBase
            onPress={onDone}
            accessibilityLabel={skipLabel}
            style={s.skip}
          >
            <Text variant="caption" tone="muted">
              {skipLabel}
            </Text>
          </PressableBase>
        )}
      </View>
      <ScrollView
        ref={pager}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onLayout={(e: LayoutChangeEvent) =>
          setWidth(e.nativeEvent.layout.width)
        }
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          width && setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        style={s.pager}
      >
        {pages.map((page) => (
          <View key={page.key} style={[s.page, { width }]}>
            {art ? page.art(art) : null}
            <Text
              variant="screenTitle"
              accessibilityRole="header"
              style={s.title}
            >
              {page.title}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={[
          s.footer,
          { paddingBottom: t.layout.footerBottom + bottomInset },
        ]}
      >
        <View style={s.dots}>
          {pages.map((page, i) => (
            <View key={page.key} style={[s.dot, i === index && s.dotOn]} />
          ))}
        </View>
        <Button size="lg" onPress={next}>
          {last ? doneLabel : nextLabel}
        </Button>
      </View>
    </View>
  );
}
