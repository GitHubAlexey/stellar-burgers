import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  clearOrderModalData,
  getOrder,
  orderModalDataSelector
} from '../../slices/orderSlice';
import { getIngredientsSelector } from '../../slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  const orderData = useSelector(orderModalDataSelector);
  const { number } = useParams<{ number: string }>();

  const fetchOrder = (orderNumber: number) => {
    dispatch(getOrder(orderNumber));
  };

  useEffect(() => {
    if (number) {
      fetchOrder(Number(number));
    }

    return () => {
      dispatch(clearOrderModalData());
    };
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce<TIngredientsWithCount>(
      (acc, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find(
            (ing: TIngredient) => ing._id === item
          );
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce<number>(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
