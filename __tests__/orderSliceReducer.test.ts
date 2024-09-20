import { expect, test, describe, it } from '@jest/globals';
import { initialState } from '../src/slices/orderSlice';
import { addOrder, orderReducer, getOrder } from '../src/slices/orderSlice';
import { TOrder } from '../src/utils/types';

describe('Тест редьюсера orderSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: addOrder.pending.type };
    const newState = orderReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const orderData: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Заказ 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    };
    const action = {
      type: addOrder.fulfilled.type,
      payload: { order: orderData }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.orderModalData).toEqual(orderData);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: addOrder.rejected.type,
      error: { message: error }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });

  test('При вызове экшена pending для getOrder', () => {
    const action = { type: getOrder.pending.type };
    const newState = orderReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled для getOrder', () => {
    const orderData: TOrder = {
      _id: '1',
      status: 'done',
      name: 'Заказ 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    };
    const action = {
      type: addOrder.fulfilled.type,
      payload: { order: orderData }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.orderModalData).toEqual(orderData);
  });

  test('При вызове экшена rejected для getOrder', () => {
    const error = 'Ошибка';
    const action = {
      type: getOrder.rejected.type,
      error: { message: error }
    };
    const newState = orderReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
