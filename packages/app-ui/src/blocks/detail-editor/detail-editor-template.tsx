import {
  useEffect,
  useRef,
  useState,
  type ComponentRef,
  type ReactNode,
} from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../../theme/theme-provider';
import { makeStyles } from '../../utils/styles';
import { DetailFocusContext, type DetailFocusRect } from './focus-context';

export type DetailEditorTemplateProps = {
  bar: ReactNode;
  children: ReactNode;
  bottom?: ReactNode;
  bottomInset?: number;
  wide?: boolean;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.muted },
  scroll: { paddingVertical: t.space[3] },
  page: {
    alignSelf: 'center',
    width: '86%',
    boxShadow: t.shadow.md,
  },
  wide: { alignSelf: 'stretch', width: '100%', boxShadow: undefined },
  bottom: { gap: t.space[3], paddingTop: t.space[2] },
  panel: { gap: t.space[3], paddingHorizontal: t.layout.screenX },
}));

export function DetailEditorTemplate({
  bar,
  children,
  bottom,
  bottomInset = 0,
  wide,
}: DetailEditorTemplateProps) {
  const t = useTheme();
  const s = useStyles();
  const scroller = useRef<ComponentRef<typeof ScrollView>>(null);
  const offset = useRef(0);
  const pageTop = useRef(0);
  const [viewport, setViewport] = useState(0);
  const [focus, setFocus] = useState<DetailFocusRect | null>(null);
  const report = useRef((rect: DetailFocusRect | null) =>
    setFocus((now) =>
      now === rect ||
      (now && rect && now.y === rect.y && now.height === rect.height)
        ? now
        : rect
    )
  ).current;
  const margin = t.space[4];

  useEffect(() => {
    if (!focus || viewport <= 0) return;
    const top = pageTop.current + focus.y - margin;
    const end = pageTop.current + focus.y + focus.height + margin;
    const now = offset.current;
    const next =
      end - top > viewport || top < now
        ? top
        : end > now + viewport
          ? end - viewport
          : now;
    if (next !== now) {
      scroller.current?.scrollTo({ y: Math.max(0, next), animated: true });
    }
  }, [focus, viewport, margin]);

  return (
    <View style={s.root}>
      {bar}
      <ScrollView
        ref={scroller}
        contentContainerStyle={s.scroll}
        scrollEventThrottle={16}
        onScroll={(e) => {
          offset.current = e.nativeEvent.contentOffset.y;
        }}
        onLayout={(e) => setViewport(e.nativeEvent.layout.height)}
      >
        <DetailFocusContext.Provider value={report}>
          <View
            style={[s.page, wide && s.wide]}
            onLayout={(e) => {
              pageTop.current = e.nativeEvent.layout.y;
            }}
          >
            {children}
          </View>
        </DetailFocusContext.Provider>
      </ScrollView>
      {bottom ? (
        <View style={[s.bottom, { paddingBottom: bottomInset + t.space[3] }]}>
          {bottom}
        </View>
      ) : null}
    </View>
  );
}

export function EditorPanel({ children }: { children: ReactNode }) {
  const s = useStyles();
  return <View style={s.panel}>{children}</View>;
}
