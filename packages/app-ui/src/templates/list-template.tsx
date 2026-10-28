import type { ReactElement, ReactNode } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  type ListRenderItem,
} from 'react-native';
import { Button } from '../components/button/button';
import { Skeleton } from '../components/skeleton/skeleton';
import { Text } from '../components/text/text';
import { useTheme } from '../theme/theme-provider';
import { makeStyles } from '../utils/styles';
import type { TemplateAction } from './parts';

export type ListTemplateStatus = 'ready' | 'loading' | 'error';

export type ListTemplateProps<T> = {
  data: readonly T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T) => string;
  status?: ListTemplateStatus;
  filters?: ReactNode;
  pinned?: ReactNode;
  empty: { title: string; action?: TemplateAction };
  error?: { title: string; onRetry: () => void };
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  selectionBar?: ReactElement | null;
  bottomInset?: number;
};

const useStyles = makeStyles((t) => ({
  root: { flex: 1, backgroundColor: t.colors.background },
  filters: {
    gap: t.layout.groupGap,
    paddingTop: t.space[2],
    paddingBottom: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  state: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.layout.titleGap,
    paddingHorizontal: t.layout.screenX,
    paddingVertical: t.layout.sectionGap,
  },
  stateTitle: { textAlign: 'center' },
  stateButton: { paddingHorizontal: t.space[6] },
  loading: {
    gap: t.space[4],
    paddingTop: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  grow: { flexGrow: 1 },
}));

function StateView({
  title,
  action,
}: {
  title: string;
  action?: TemplateAction;
}) {
  const s = useStyles();
  return (
    <View style={s.state}>
      <Text variant="bodyLg" weight="semibold" style={s.stateTitle}>
        {title}
      </Text>
      {action ? (
        <Button
          variant="outline"
          onPress={action.onPress}
          disabled={action.disabled}
          loading={action.loading}
          style={s.stateButton}
        >
          {action.label}
        </Button>
      ) : null}
    </View>
  );
}

export function ListTemplate<T>({
  data,
  renderItem,
  keyExtractor,
  status = 'ready',
  filters,
  pinned,
  empty,
  error,
  refreshing = false,
  onRefresh,
  onEndReached,
  selectionBar,
  bottomInset = 0,
}: ListTemplateProps<T>) {
  const t = useTheme();
  const s = useStyles();
  const head = filters ? <View style={s.filters}>{filters}</View> : null;

  if (status === 'loading') {
    return (
      <View style={s.root}>
        {head}
        <View style={s.loading}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={t.listRow.oneLine} />
          ))}
        </View>
      </View>
    );
  }

  if (status === 'error' && error) {
    return (
      <View style={s.root}>
        {head}
        <StateView
          title={error.title}
          action={{ label: '다시 시도', onPress: error.onRetry }}
        />
      </View>
    );
  }

  return (
    <View style={s.root}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          head || pinned ? (
            <>
              {head}
              {pinned}
            </>
          ) : undefined
        }
        ListEmptyComponent={
          <StateView title={empty.title} action={empty.action} />
        }
        contentContainerStyle={[
          data.length === 0 ? s.grow : null,
          selectionBar ? null : { paddingBottom: bottomInset },
        ]}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        onEndReached={onEndReached}
      />
      {selectionBar}
    </View>
  );
}
