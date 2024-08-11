import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bannerApi } from "../api/bannerSlice";

const store = configureStore({
  reducer: {
    [bannerApi.reducerPath]: bannerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bannerApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export type IRootState = ReturnType<typeof store.getState>;
