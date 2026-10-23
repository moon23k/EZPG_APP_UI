import {
  Button,
  makeStyles,
  Photo,
  StatusBadge,
  Text,
  type StatusBadgeTone,
} from '@ezpg/native-ui';
import type { ReactNode } from 'react';
import {
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type SitePublishStatus = 'draft' | 'published' | 'unpublishedChanges';

export type SitePreviewFrameProps = {
  /** 사이트 화면 이미지 */
  screenshot?: ImageSourcePropType;
  /** 실제 사이트를 띄울 때(WebView 등). screenshot보다 우선 */
  renderPreview?: () => ReactNode;
  status: SitePublishStatus;
  /** 예) '10월 23일 14:02 게시' */
  publishedLabel?: string;
  onPublish?: () => void;
  publishing?: boolean;
  /** 직전 게시본으로 되돌리기 */
  onRevert?: () => void;
  style?: StyleProp<ViewStyle>;
};

const STATUS: Record<
  SitePublishStatus,
  { label: string; tone: StatusBadgeTone }
> = {
  draft: { label: '초안', tone: 'neutral' },
  published: { label: '게시됨', tone: 'success' },
  unpublishedChanges: { label: '게시 안 된 변경', tone: 'warning' },
};

const useStyles = makeStyles((t) => ({
  root: { gap: t.space[3] },
  head: { flexDirection: 'row', alignItems: 'center', gap: t.space[2] },
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
  actions: { gap: t.space[2] },
}));

/** 만든 사이트 미리보기와 게시 상태 */
export function SitePreviewFrame({
  screenshot,
  renderPreview,
  status,
  publishedLabel,
  onPublish,
  publishing,
  onRevert,
  style,
}: SitePreviewFrameProps) {
  const s = useStyles();
  const meta = STATUS[status];
  return (
    <View style={[s.root, style]}>
      <View style={s.head}>
        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
        {publishedLabel ? (
          <Text variant="caption" tone="muted">
            {publishedLabel}
          </Text>
        ) : null}
      </View>
      <View style={s.device} accessibilityLabel="사이트 미리보기">
        <View style={s.screen}>
          {renderPreview ? (
            renderPreview()
          ) : screenshot ? (
            <Photo source={screenshot} aspectRatio={9 / 19.5} radius={0} />
          ) : null}
        </View>
      </View>
      <View style={s.actions}>
        {onPublish && status !== 'published' ? (
          <Button size="lg" onPress={onPublish} loading={publishing}>
            {status === 'draft' ? '사이트 게시하기' : '변경 사항 게시하기'}
          </Button>
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
