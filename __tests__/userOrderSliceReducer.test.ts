import { expect, test, describe } from '@jest/globals';
import { initialState } from '../src/slices/userOrdersSlice';
import { getOrders, userOrdersReducer } from '../src/slices/userOrdersSlice';
import { TOrder } from '../src/utils/types';


describe('Тест редьюсера userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: getOrders.pending.type };
    const newState = userOrdersReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Заказ 1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];
    const action = {
      type: getOrders.fulfilled.type,
      payload: orders
    };
    const newState = userOrdersReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.orders).toEqual(orders);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: getOrders.rejected.type,
      error: { message: error }
    };
    const newState = userOrdersReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
