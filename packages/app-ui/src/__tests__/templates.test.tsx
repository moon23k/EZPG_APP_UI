import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  DetailTemplate,
  EditorTemplate,
  FormTemplate,
  ListRow,
  ListSection,
  ListTemplate,
  ResultTemplate,
  StepScreen,
  SystemTemplate,
} from '../index';

const rows = [
  { id: '1', title: '머그컵 2개' },
  { id: '2', title: '원목 트레이' },
];

function List(
  props: Partial<Parameters<typeof ListTemplate<(typeof rows)[number]>>[0]>
) {
  return (
    <ListTemplate
      data={rows}
      keyExtractor={(row) => row.id}
      renderItem={({ item }) => <ListRow title={item.title} />}
      empty={{ title: '발송할 주문이 없어요' }}
      {...props}
    />
  );
}

describe('ListTemplate', () => {
  it('renders rows when ready', async () => {
    await render(<List />);
    expect(screen.getByText('머그컵 2개')).toBeTruthy();
    expect(screen.queryByText('발송할 주문이 없어요')).toBeNull();
  });

  it('shows the empty state and its action when there is no data', async () => {
    const onPress = jest.fn();
    await render(
      <List
        data={[]}
        empty={{
          title: '발송할 주문이 없어요',
          action: { label: '상품 등록하기', onPress },
        }}
      />
    );
    await fireEvent.press(screen.getByText('상품 등록하기'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('hides rows while loading', async () => {
    await render(<List status="loading" />);
    expect(screen.queryByText('머그컵 2개')).toBeNull();
  });

  it('shows the error state and retries', async () => {
    const onRetry = jest.fn();
    await render(
      <List status="error" error={{ title: '불러오지 못했어요', onRetry }} />
    );
    expect(screen.queryByText('머그컵 2개')).toBeNull();
    await fireEvent.press(screen.getByText('다시 시도'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('keeps pinned rows above the list', async () => {
    await render(<List pinned={<ListRow title="오늘 발송 마감" />} />);
    expect(screen.getByText('오늘 발송 마감')).toBeTruthy();
  });
});

describe('ResultTemplate', () => {
  const previews = ['1안', '2안', '3안'].map((label) => ({
    key: label,
    label,
    render: () => <Text>{`${label} 사이트`}</Text>,
  }));

  it('opens the full preview of the pressed result and builds from it', async () => {
    const onIndexChange = jest.fn();
    const onBuild = jest.fn();
    await render(
      <ResultTemplate
        previews={previews}
        index={1}
        onIndexChange={onIndexChange}
        primaryAction={{ label: '이 디자인으로 만들기', onPress: onBuild }}
      />
    );
    await fireEvent.press(screen.getByLabelText('2안 크게 보기'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('2안 · 2 / 3')).toBeTruthy();
    const builds = screen.getAllByText('이 디자인으로 만들기');
    await fireEvent.press(builds[builds.length - 1]!);
    expect(onBuild).toHaveBeenCalledTimes(1);
  });

  it('shows progress instead of results and no action while generating', async () => {
    await render(
      <ResultTemplate
        previews={previews}
        index={0}
        onIndexChange={() => {}}
        progress={<Text>문구 쓰기</Text>}
        primaryAction={{ label: '이 디자인으로 만들기', onPress: () => {} }}
      />
    );
    expect(screen.getByText('문구 쓰기')).toBeTruthy();
    expect(screen.queryByText('1안 사이트')).toBeNull();
    expect(screen.queryByText('이 디자인으로 만들기')).toBeNull();
  });
});

describe('EditorTemplate', () => {
  it('opens the section sheet only when given and closes it', async () => {
    const onClose = jest.fn();
    const onTool = jest.fn();
    const tools = [{ key: 'sections', label: '섹션 목록', onPress: onTool }];
    const view = await render(
      <EditorTemplate preview={<Text>미리보기</Text>} tools={tools} />
    );
    expect(screen.queryByText('첫 화면')).toBeNull();
    await fireEvent.press(screen.getByText('섹션 목록'));
    expect(onTool).toHaveBeenCalledTimes(1);
    await view.rerender(
      <EditorTemplate
        preview={<Text>미리보기</Text>}
        tools={tools}
        sheet={{ title: '첫 화면', onClose, children: <Text>큰 문구</Text> }}
      />
    );
    expect(screen.getByText('미리보기')).toBeTruthy();
    expect(screen.getByText('큰 문구')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('닫기'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('DetailTemplate · FormTemplate', () => {
  it('shows the notice and sections with the primary action', async () => {
    const onPress = jest.fn();
    await render(
      <DetailTemplate
        notice={{ reason: 'money', text: '17:00까지 입금이 없으면 취소돼요' }}
        primaryAction={{ label: '송장 입력', onPress }}
      >
        <ListSection title="상품">
          <ListRow title="원목 트레이" />
        </ListSection>
      </DetailTemplate>
    );
    expect(screen.getByText('17:00까지 입금이 없으면 취소돼요')).toBeTruthy();
    expect(screen.getByText('상품')).toBeTruthy();
    await fireEvent.press(screen.getByText('송장 입력'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not save while the save action is disabled', async () => {
    const onSave = jest.fn();
    await render(
      <FormTemplate
        saveAction={{ label: '저장', onPress: onSave, disabled: true }}
      >
        <ListRow title="택배" />
      </FormTemplate>
    );
    await fireEvent.press(screen.getByText('저장'));
    expect(onSave).not.toHaveBeenCalled();
  });
});

describe('SystemTemplate', () => {
  it('announces the title as a header and runs the action', async () => {
    const onPress = jest.fn();
    await render(
      <SystemTemplate
        title="새 버전으로 업데이트해 주세요"
        primaryAction={{ label: '업데이트', onPress }}
      />
    );
    expect(screen.getByRole('header')).toBeTruthy();
    await fireEvent.press(screen.getByText('업데이트'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('StepScreen', () => {
  it('shows a notice above the action only when given', async () => {
    const view = await render(
      <StepScreen
        title="사이트 만드는 중"
        primaryAction={{ label: '다시 만들기', onPress: () => {} }}
      />
    );
    expect(screen.queryByText('쓴 크레딧은 돌려드려요')).toBeNull();
    await view.rerender(
      <StepScreen
        title="사이트 만드는 중"
        notice={{ reason: 'money', text: '쓴 크레딧은 돌려드려요' }}
        primaryAction={{ label: '다시 만들기', onPress: () => {} }}
      />
    );
    expect(screen.getByText('쓴 크레딧은 돌려드려요')).toBeTruthy();
  });
});
