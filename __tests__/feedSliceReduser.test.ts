import { expect, test, describe } from '@jest/globals';
import { initialState } from '../src/slices/feedSlice';
import { getFeed, feedReducer } from '../src/slices/feedSlice';
import { TOrdersData } from '../src/utils/types';

describe('Тест редьюсера feedSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: getFeed.pending.type };
    const newState = feedReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const feedData: TOrdersData = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Заказ 1',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          number: 1,
          ingredients: ['ingredient1', 'ingredient2']
        }
      ],
      total: 10,
      totalToday: 5
    };
    const action = {
      type: getFeed.fulfilled.type,
      payload: feedData
    };
    const newState = feedReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.feedData).toEqual(feedData);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: getFeed.rejected.type,
      error: { message: error }
    };
    const newState = feedReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
