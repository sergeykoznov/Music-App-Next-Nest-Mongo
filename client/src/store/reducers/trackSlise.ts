import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { TrackState } from "types/track";
import { AppState } from "..";
const hydrate = createAction<AppState>(HYDRATE);

const initialState: TrackState = {
  tracks: [],
  error: "",
};

// Actual Slice
export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    tracksSetTrack(
      state,
      { payload }: PayloadAction<{ tracks: TrackState["tracks"] }>
    ) {
      state.tracks = payload.tracks;
      state.error = "";
   console.log(222, 'state');
    },
    tracksSetError(
      state,
      { payload }: PayloadAction<{ error: TrackState["error"] }>
    ) {
      state.error = payload.error;
    },
  },

  //Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      console.log(555, action.payload);
      
      return {
        ...state,
        // ...action.payload.tracks.error,
        // error: 'action.payload.tracks.tracks'
      };
    });
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.tracks,
  //     };
  //   },
  // },
});

const { tracksSetTrack } = trackSlice.actions;
const { tracksSetError } = trackSlice.actions;

export const TrackActions = {
  tracksSetTrack,
  tracksSetError,
};

// ! Not need

// const selectTracksTrack = (state: AppState) => state.tracks.tracks;
// const selectTracksError = (state: AppState) => state.tracks.error;

// export const TrackSelectors = {
//   selectTracksTrack,
//   selectTracksError,
// };
