import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Section } from '../../__stories__/helpers';
import { GenerationProgress } from './generation-progress';

const steps = [
  { key: 'accepted', label: '접수' },
  { key: 'drafting', label: '문구 작성' },
  { key: 'checking', label: '표현 검사' },
  { key: 'reviewing', label: '검수' },
  { key: 'assembling', label: '조립' },
];

function Demo() {
  return (
    <>
      <Section title="대기 · 진행 중">
        <GenerationProgress
          steps={steps}
          current={null}
          status="queued"
          creditNote="완료되면 크레딧 1개가 차감돼요"
        />
        <GenerationProgress
          steps={steps}
          current="checking"
          status="running"
          creditNote="완료되면 크레딧 1개가 차감돼요"
        />
      </Section>
      <Section title="완료 · 실패">
        <GenerationProgress steps={steps} current={null} status="done" />
        <GenerationProgress
          steps={steps}
          current="reviewing"
          status="failed"
          errorText="검수에서 쓸 수 없는 표현이 나왔어요"
          onRetry={() => {}}
          creditNote="실패한 생성은 크레딧이 차감되지 않아요"
        />
      </Section>
      <Section title="긴 문구">
        <GenerationProgress
          steps={[
            { key: 'a', label: '가게 소개와 대표 상품 정보를 모아 정리하기' },
            {
              key: 'b',
              label: '업종에 맞는 문구와 구성을 고르고 화면 조립하기',
            },
          ]}
          current="b"
          status="failed"
          errorText="잠시 연결이 불안정해 끝내지 못했어요. 지금까지 만든 내용은 그대로 남아 있으니 다시 시도해 주세요"
          onRetry={() => {}}
          creditNote="하루 생성 횟수에는 포함되지만 크레딧은 차감되지 않아요"
        />
      </Section>
    </>
  );
}

const meta = {
  title: 'Blocks/Generation/GenerationProgress',
  component: Demo,
} satisfies Meta<typeof Demo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {};
