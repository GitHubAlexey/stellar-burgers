import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TMoveIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TBurgerConstructorState = {
  ingredients: Array<TIngredient>;
  bun: TIngredient | null;
};

export const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(
        state,
        action: PayloadAction<TIngredient & { uniqueId: string }>
      ) {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare(ingredient: TIngredient) {
        const uniqueId = uuidv4();
        return { payload: { ...ingredient, uniqueId } };
      }
    },

    removeIngredient(
      state,
      action: PayloadAction<TIngredient & { index: number }>
    ) {
      if (action.payload.type === 'bun') {
        state.bun = null;
      } else {
        state.ingredients.splice(action.payload.index, 1);
      }
    },

    changeIngredientsOrder(state, action: PayloadAction<TMoveIngredient>) {
      const { index, move } = action.payload;
      switch (move) {
        case 'down':
          [state.ingredients[index], state.ingredients[index + 1]] = [
            state.ingredients[index + 1],
            state.ingredients[index]
          ];
          break;
        case 'up':
          [state.ingredients[index], state.ingredients[index - 1]] = [
            state.ingredients[index - 1],
            state.ingredients[index]
          ];
          break;
      }
    },

    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  changeIngredientsOrder,
  resetConstructor
} = burgerConstructorSlice.actions;
