import type { ReactElement, ReactNode } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  type ListRenderItem,
} from 'react-native';
import { EmptyState } from '../components/empty-state/empty-state';
import { Skeleton } from '../components/skeleton/skeleton';
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
  empty: { title: string; action?: Pick<TemplateAction, 'label' | 'onPress'> };
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
  loading: {
    gap: t.space[4],
    paddingTop: t.space[2],
    paddingHorizontal: t.layout.screenX,
  },
  grow: { flexGrow: 1 },
}));

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
        <EmptyState
          variant="error"
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
          <EmptyState title={empty.title} action={empty.action} />
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
