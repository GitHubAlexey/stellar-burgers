import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TMoveIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerConstructorState = {
  ingredients: Array<TIngredient & { uniqueId: string }>;
  bun: TIngredient | null;
};

const initialState: TBurgerConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const id = uuidv4();
      const ingredient = { ...action.payload, uniqueId: id };
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
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
