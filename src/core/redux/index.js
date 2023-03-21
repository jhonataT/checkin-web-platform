import React from "react";
import { Provider } from "react-redux";
import configureStore from "./setup";

export const store = configureStore()

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
