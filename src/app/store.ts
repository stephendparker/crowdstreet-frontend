import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import applicationReducer from '../features/application/applicationSlice';

export const store = configureStore({
  reducer: {
    application: applicationReducer
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
