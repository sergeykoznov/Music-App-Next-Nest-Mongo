import { PlayerActions } from "../reducers/playerSlise";
import { TrackActions } from "../reducers/trackSlise";

const ActionCreators = {
  ...PlayerActions,
  ...TrackActions,
};

export default ActionCreators;
