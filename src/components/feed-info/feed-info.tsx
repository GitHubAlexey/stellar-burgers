import { FC } from 'react';
import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';

interface FeedData {
  total: number;
  totalToday: number;
}

const extractOrderNumbers = (orders: TOrder[], status: string): number[] =>
  orders
    .filter(({ status: orderStatus }) => orderStatus === status)
    .slice(0, 20)
    .map(({ number }) => number);

export const FeedInfo: FC = () => {
  const { feedData } = useSelector((state) => state.feed);
  const { orders, total, totalToday } = feedData;

  const feed: FeedData = { total, totalToday };
  const readyOrders = extractOrderNumbers(orders, 'done');
  const pendingOrders = extractOrderNumbers(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
