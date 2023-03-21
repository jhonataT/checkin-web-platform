import { legacy_createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import { Reducers } from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

let store;
let persist;

export const getStore = () => store;
export const getPersist = () => persist;

export default function configureStore() {
  const enhancer = compose(applyMiddleware(thunk, logger))
  store = legacy_createStore(Reducers, enhancer)

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(Reducers)
      })
    }
  }

  persist = persistStore(store, {}, () => {
    /* store.dispatch(setLoginData({rehydrated: true})) */
  })
  return store
}
