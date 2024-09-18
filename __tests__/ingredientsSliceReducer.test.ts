import { expect, test, describe } from '@jest/globals';
import {
  getIngredients,
  ingredientsReducer
} from '../src/slices/ingredientsSlice';
import { initialState } from '../src/slices/ingredientsSlice';

describe('Тест редьюсера ingredientsSlice', () => {
  test('При вызове экшена pending булевая переменная loading меняется на true', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  test('При вызове экшена fulfilled данные записываются в стор и loading меняется на false', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
  });

  test('При вызове экшена rejected ошибка записывается в стор и loading меняется на false', () => {
    const error = 'Ошибка';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
