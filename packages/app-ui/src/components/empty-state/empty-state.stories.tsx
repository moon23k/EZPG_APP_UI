import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Section } from '../../__stories__/helpers';
import type { IconRenderProps } from '../../internal/icon';
import { makeStyles } from '../../utils/styles';
import { EmptyState } from './empty-state';

const useStyles = makeStyles((t) => ({
  screen: {
    height: 360,
    maxWidth: 390,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  card: {
    maxWidth: 390,
    borderRadius: t.radius.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.background,
  },
  trayBox: { justifyContent: 'flex-end' },
  tray: {
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
}));

function TrayIcon({ color, size }: IconRenderProps) {
  const s = useStyles();
  return (
    <View
      style={[
        s.trayBox,
        { width: size, height: size, paddingBottom: size * 0.15 },
      ]}
    >
      <View style={[s.tray, { height: size * 0.45, borderColor: color }]} />
    </View>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return <View style={useStyles().screen}>{children}</View>;
}

function Demo() {
  const s = useStyles();
  return (
    <>
      <Section title="default · 목록이 비었을 때">
        <Screen>
          <EmptyState
            icon={TrayIcon}
            title="아직 주문이 없어요"
            action={{ label: '내 가게 링크 공유', onPress: () => {} }}
          />
        </Screen>
      </Section>
      <Section title="search · 검색 · 필터 결과 없음">
        <Screen>
          <EmptyState
            variant="search"
            title="‘머그컵’ 배송중 주문이 없어요"
            action={{ label: '조건 초기화', onPress: () => {} }}
          />
        </Screen>
      </Section>
      <Section title="error · 불러오지 못했을 때">
        <Screen>
          <EmptyState
            variant="error"
            title="리뷰를 불러오지 못했어요"
            action={{ label: '다시 불러오기', onPress: () => {} }}
          />
        </Screen>
      </Section>
      <Section title="section · 화면 안 한 섹션">
        <View style={s.card}>
          <EmptyState
            variant="section"
            icon={TrayIcon}
            title="아직 없어요"
            action={{ label: '링크 공유', onPress: () => {} }}
          />
        </View>
      </Section>
    </>
  );
}

const meta = { title: 'Components/EmptyState', component: Demo } satisfies Meta<
  typeof Demo
>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
