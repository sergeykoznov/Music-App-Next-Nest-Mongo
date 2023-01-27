import { rootReducer } from "./reducers/index";
import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    rootReducerreducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
