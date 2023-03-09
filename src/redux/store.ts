import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import omdbReducer from './omdbSlice';

export const store = configureStore({
  reducer: {
    omdb: omdbReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
