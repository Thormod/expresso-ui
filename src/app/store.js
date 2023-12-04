import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";
import { apiBase } from "../features/api/api-base";
import { establismentsApi } from "../features/api/establishment.api";
import { unauthenticatedMiddleware } from "./shared/midleware/unauthenticated-midleware";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/user/user-slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["token", "status"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const reducers = {
  user: persistedReducer,
  [apiBase.reducerPath]: apiBase.reducer,
  [establismentsApi.reducerPath]: apiBase.reducer,
};

const combinedReducers = combineReducers(reducers);

export const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        unauthenticatedMiddleware,
        apiBase.middleware,
        establismentsApi.middleware,
        thunk,
      ]),
  });
};

export const store = setupStore({});
export const persistor = persistStore(store);
