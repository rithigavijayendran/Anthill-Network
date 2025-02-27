import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/carSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
