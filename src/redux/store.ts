import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import postSlice from "./posts/postSlice";

const postPersistConfig = {
  key: "posts",
  storage,
  whitelist: ["posts"],
};

const Allreducer = combineReducers({
  posts: persistReducer(postPersistConfig, postSlice),
});
export const store = configureStore({
  reducer: Allreducer,
});

export type IRootState = ReturnType<typeof store.getState>;
