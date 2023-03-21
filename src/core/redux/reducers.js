import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import localforage from 'localforage';
import app from "./app/Reducers";

const appConfig = {
  key: "app",
  storage: localforage,
  blacklist: ["loaded"],
}

export const Reducers = combineReducers({
  app: persistReducer(appConfig, app),
})
