import { expect, test, describe } from '@jest/globals';
import store, { rootReducer } from '../src/services/store';

describe('Правильная инициализация rootReducer', () => {
  test('Начальное состояние rootReducer соответствует ожидаемому начальному состоянию', () => {
    const expectedInitialState = {
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        ingredients: [],
        bun: null
      },
      feed: {
        feedData: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        loading: false,
        error: null
      },
      user: {
        isAuthChecked: false,
        loading: false,
        user: null,
        error: null
      },
      order: {
        orderModalData: null,
        orderRequest: false,
        loading: false,
        error: null
      },
      orders: {
        orders: [],
        loading: false,
        error: null
      }
    };
    expect(store.getState()).toEqual(expectedInitialState);
  });

  test('При передаче неизвестного экшена получаем начальное состояние ', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(state);
  });
});
