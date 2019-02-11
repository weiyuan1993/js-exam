import {
  SET_SNAP_COMMENTS,
  SET_CATEGORY_INDEX,
  SET_RECORD_INDEX,
  SET_HISTORY_INDEX,
  RESET_PLAYBACK,
} from './constants';

const initialState = {
  snapComments: [],
  categoryIndex: 0,
  recordIndex: 0,
  historyIndex: 0,
};

function playback(state = initialState, action) {
  switch (action.type) {
    case SET_SNAP_COMMENTS:
      return {
        ...state,
        snapComments: [...action.snapComments],
      };
    case SET_CATEGORY_INDEX:
      return {
        ...state,
        categoryIndex: action.index,
      };
    case SET_RECORD_INDEX:
      return {
        ...state,
        recordIndex: action.index,
      };
    case SET_HISTORY_INDEX:
      return {
        ...state,
        historyIndex: action.index,
      };
    case RESET_PLAYBACK:
      return initialState;
    default:
      return state;
  }
}

export default playback;
