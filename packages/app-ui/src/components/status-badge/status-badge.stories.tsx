import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Row } from '../../__stories__/helpers';
import { StatusBadge } from './status-badge';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  args: { children: '배송중', tone: 'info' },
} satisfies Meta<typeof StatusBadge>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Row>
      <StatusBadge>주문접수</StatusBadge>
      <StatusBadge tone="info">배송중</StatusBadge>
      <StatusBadge tone="success">배송완료</StatusBadge>
      <StatusBadge tone="warning">입금대기</StatusBadge>
      <StatusBadge tone="danger">취소</StatusBadge>
    </Row>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
