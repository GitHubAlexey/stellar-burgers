import { expect, test, describe, jest } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import {
  addIngredient,
  burgerConstructorReducer,
  changeIngredientsOrder,
  removeIngredient
} from '../src/slices/burgerConstructorSlice';
import { TIngredient } from '../src/utils/types';

describe('Тест редьюсера burgerConstructorSlice', () => {
  const initialState = burgerConstructorReducer(undefined, { type: '@@INIT' });

  test('Добавление ингредиента', () => {
    const ingredient: TIngredient = {
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
      uniqueId: uuidv4()
    };

    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );

    if (ingredient.type === 'bun') {
      expect(newState.ingredients).toHaveLength(0);
    } else {
      expect(newState.ingredients).toHaveLength(1);
    }
    expect(newState.ingredients[0]).toEqual({
      ...ingredient,
      uniqueId: expect.any(String)
    });
  });

  test('Добавление булки', () => {
    const ingredient: TIngredient = {
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      uniqueId: uuidv4()
    };

    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(ingredient)
    );

    if (ingredient.type === 'bun') {
      expect(newState.ingredients).toHaveLength(0);
    } else {
      expect(newState.ingredients).toHaveLength(1);
    }
    expect(newState.bun).toEqual({
      ...ingredient,
      uniqueId: expect.any(String)
    });
  });

  test('Удаление ингридиента', () => {
    const ingredient: TIngredient = {
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
      uniqueId: uuidv4()
    };

    const currentState = {
      ingredients: [ingredient],
      bun: null
    };
    const newState = burgerConstructorReducer(
      currentState,
      removeIngredient({ ...ingredient, index: 0 })
    );

    expect(newState.ingredients).toHaveLength(0);
  });

  test('Изменение порядка ингредиентов в начинке (вверх)', () => {
    const ingredientList: Array<TIngredient> = [
      {
        _id: '643d69a5c3f7b9001cfa0947',
        name: 'Плоды Фалленианского дерева',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
        uniqueId: uuidv4()
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        uniqueId: uuidv4()
      }
    ];

    const currentState = {
      ingredients: ingredientList,
      bun: null
    };
    const newState = burgerConstructorReducer(
      currentState,
      changeIngredientsOrder({ move: 'up', index: 1 })
    );

    expect(newState.ingredients).toEqual([
      ingredientList[1],
      ingredientList[0]
    ]);
  });

  test('Изменение порядка ингредиентов в начинке (вниз)', () => {
    const ingredientList: Array<TIngredient> = [
      {
        _id: '643d69a5c3f7b9001cfa0947',
        name: 'Плоды Фалленианского дерева',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
        uniqueId: uuidv4()
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        uniqueId: uuidv4()
      }
    ];

    const currentState = {
      ingredients: ingredientList,
      bun: null
    };
    const newState = burgerConstructorReducer(
      currentState,
      changeIngredientsOrder({ move: 'down', index: 0 })
    );

    expect(newState.ingredients).toEqual([
      ingredientList[1],
      ingredientList[0]
    ]);
  });
});
