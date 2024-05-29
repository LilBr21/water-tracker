import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../actions/auth";
import dataReducer from "../actions/data";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
    },
  })
  

  export type RootState = ReturnType<typeof store.getState>

  export type AppDispatch = typeof store.dispatch