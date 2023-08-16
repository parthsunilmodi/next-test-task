import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from './redux/index';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
