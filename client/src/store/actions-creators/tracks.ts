import axios from "axios";
import { AppThunk } from "..";
import ActionCreators from ".";
import { constData } from "@/constData";

export const fetchTracks = (): AppThunk => {
  return async (dispatch) => {
       console.log(111, 'state');
    try {
      const response = await axios.get(`${constData.BASE_URL}/tracks`);
      dispatch(ActionCreators.tracksSetTrack({tracks: response.data}));
    } catch (e) {
      dispatch(
        ActionCreators.tracksSetError({
          error: "Error occurs while tracks loading",
        })
      );
    }
  };
};


export const searchTracks = (query: string): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${constData.BASE_URL}/tracks/search?query=${query}`);
      dispatch(ActionCreators.tracksSetTrack({tracks: response.data}));
    } catch (e) {
      dispatch(
        ActionCreators.tracksSetError({
          error: "Error occurs while tracks loading",
        })
      );
    }
  };
};
