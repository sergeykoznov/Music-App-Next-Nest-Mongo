import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/store/reducers';
import { rootReducer } from "./reducers/index";
import { Action, AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = typeof makeStore
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch()
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper(makeStore, {debug: false});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>