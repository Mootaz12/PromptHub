import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { promptApi } from "./propmtApi";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [promptApi.reducerPath]: promptApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(promptApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);
