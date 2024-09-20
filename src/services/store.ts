import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchHook,
  useSelector as useSelectorHook
} from 'react-redux';

import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { orderReducer } from '../slices/orderSlice';
import { userOrdersReducer } from '../slices/userOrdersSlice';
import { userReducer } from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  user: userReducer,
  order: orderReducer,
  orders: userOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook;

export default store;
