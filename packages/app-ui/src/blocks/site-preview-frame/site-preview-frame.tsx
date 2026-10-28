import type { ReactNode } from 'react';
import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Button } from '../../components/button/button';
import { Photo } from '../../components/photo/photo';
import { Text } from '../../components/text/text';
import { makeStyles } from '../../utils/styles';

export type SitePublishStatus = 'draft' | 'published' | 'unpublishedChanges';

export type SitePreviewFrameProps = {
  screenshot?: ImageSourcePropType;
  renderPreview?: () => ReactNode;
  status: SitePublishStatus;
  onPublish?: () => void;
  publishing?: boolean;
  publishDisabled?: boolean;
  blockedReason?: string;
  onRevert?: () => void;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3] },
  device: {
    alignSelf: 'center',
    width: '72%',
    maxWidth: 300,
    aspectRatio: 9 / 19.5,
    padding: t.space[2],
    borderRadius: 36,
    backgroundColor: t.colors.foreground,
    boxShadow: t.shadow.md,
  },
  screen: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: t.colors.background,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.space[2],
    minHeight: 60,
    paddingLeft: t.space[4],
    paddingRight: t.space[2],
    borderRadius: t.radius.lg,
    backgroundColor: t.colors.muted,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: t.colors.warning,
  },
  barLabel: { flex: 1 },
  barButton: { paddingHorizontal: t.space[4] },
  actions: { gap: t.space[2] },
  reason: { textAlign: 'center' },
}));

export function SitePreviewFrame({
  screenshot,
  renderPreview,
  status,
  onPublish,
  publishing,
  publishDisabled,
  blockedReason,
  onRevert,
  style,
}: SitePreviewFrameProps) {
  const s = useStyles();
  return (
    <View style={[s.root, style]}>
      <View style={s.device} accessibilityLabel="사이트 미리보기">
        <View style={s.screen}>
          {renderPreview ? (
            renderPreview()
          ) : screenshot ? (
            <Photo source={screenshot} aspectRatio={9 / 19.5} radius={0} />
          ) : null}
        </View>
      </View>
      {status === 'unpublishedChanges' ? (
        <View accessibilityLiveRegion="polite" style={s.bar}>
          <View style={s.dot} />
          <Text weight="semibold" style={s.barLabel}>
            게시 안 된 변경사항
          </Text>
          {onPublish ? (
            <Button
              size="sm"
              onPress={onPublish}
              loading={publishing}
              disabled={publishDisabled}
              style={s.barButton}
            >
              게시
            </Button>
          ) : null}
        </View>
      ) : null}
      <View style={s.actions}>
        {onPublish && status === 'draft' ? (
          <Button
            size="lg"
            onPress={onPublish}
            loading={publishing}
            disabled={publishDisabled}
          >
            사이트 게시하기
          </Button>
        ) : null}
        {publishDisabled &&
        blockedReason &&
        onPublish &&
        status !== 'published' ? (
          <Text tone="muted" accessibilityLiveRegion="polite" style={s.reason}>
            {blockedReason}
          </Text>
        ) : null}
        {onRevert && status !== 'draft' ? (
          <Button variant="ghost" onPress={onRevert}>
            직전 게시본으로 되돌리기
          </Button>
        ) : null}
      </View>
    </View>
  );
}
