import { trackSlice } from './trackSlise';
import { combineReducers } from "redux";
import { playerSlice } from "./playerSlise";

export const rootReducer = combineReducers({
  [playerSlice.name]: playerSlice.reducer,
  [trackSlice.name]: trackSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>