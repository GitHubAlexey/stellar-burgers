import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, feedDataSelector } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const feedData = useSelector(feedDataSelector);
  const dispatch = useDispatch();
  const orders = feedData.orders;

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
