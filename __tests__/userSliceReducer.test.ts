import { expect, test, describe } from '@jest/globals';
import {
  forgotPassword,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  userReducer
} from '../src/slices/userSlice';
import { TOrder, TUser } from '../src/utils/types';

describe('Тест loginUser userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: loginUser.pending.type };
    const newState = userReducer(initialState, action);
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
      type: loginUser.fulfilled.type,
      payload: orders
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: loginUser.rejected.type,
      error: { message: error }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});

describe('Тест registerUser userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: registerUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const user: TUser = { email: 'example@example.com', name: 'John Doe' };
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: user }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(user);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: registerUser.rejected.type,
      error: { message: error }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});

describe('Тест updateUser userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: updateUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const user: TUser = { email: 'example@example.com', name: 'John Doe' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: user }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(user);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: updateUser.rejected.type,
      error: { message: error }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});

describe('Тест logoutUser userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: logoutUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toBe(null);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: logoutUser.rejected.type,
      error: { message: error }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});

describe('Тест forgotPassword userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: forgotPassword.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const action = {
      type: forgotPassword.fulfilled.type
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: forgotPassword.rejected.type,
      error: { message: error }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});

describe('Тест resetPassword userOrdersSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: resetPassword.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const user: TUser = { email: 'example@example.com', name: 'John Doe' };
    const action = {
      type: resetPassword.fulfilled.type,
      payload: user
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toBe(initialState.user);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: resetPassword.rejected.type,
      error: { message: error }
    };
    const newState = userReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
