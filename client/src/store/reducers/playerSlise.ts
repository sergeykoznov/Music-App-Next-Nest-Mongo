import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { PlayerState } from "types/player";
import { AppState } from "..";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: PlayerState = {
  pause: true,
  active: null,
  duration: 0,
  currentTime: 0,
  volume: 50,
};

// Actual Slice
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerPlay(state) {
      state.pause = false;
    },
    playerPause(state) {
      state.pause = true;
    },
    playerSetActive(
      state,
      { payload }: PayloadAction<{ active: PlayerState["active"] }>
    ) {
      state.active = payload.active;
      state.duration = 0;
      state.currentTime = 0;
    },
    playerSetDuration(
      state,
      { payload }: PayloadAction<{ duration: PlayerState["duration"] }>
    ) {
      state.duration = payload.duration;
    },
    playerSetCurrentTime(
      state,
      { payload }: PayloadAction<{ currentTime: PlayerState["currentTime"] }>
    ) {
      state.currentTime = payload.currentTime;
    },
    playerSetVolume(
      state,
      { payload }: PayloadAction<{ volume: PlayerState["volume"] }>
    ) {
      state.volume = payload.volume;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.player,
      };
    });
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.player,
  //     };
  //   },
  // },
});

const { playerPlay } = playerSlice.actions;
const { playerPause } = playerSlice.actions;
const { playerSetActive } = playerSlice.actions;
const { playerSetVolume } = playerSlice.actions;
const { playerSetCurrentTime } = playerSlice.actions;
const { playerSetDuration } = playerSlice.actions;

export const PlayerActions = {
  playerPlay,
  playerPause,
  playerSetActive,
  playerSetVolume,
  playerSetCurrentTime,
  playerSetDuration,
};

// ! Not need

// const selectPlayerPause = (state: AppState) => state.player.pause;
// const selectPlayerActive = (state: AppState) => state.player.active;
// const selectPlayerDuration = (state: AppState) => state.player.duration;
// const selectPlayerCurrentTime = (state: AppState) => state.player.currentTime;
// const selectPlayerVolume = (state: AppState) => state.player.volume;

// export const PlayerSelectors = {
//   selectPlayerPause,
//   selectPlayerActive,
//   selectPlayerDuration,
//   selectPlayerCurrentTime,
//   selectPlayerVolume,
// };
