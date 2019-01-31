import { ACTION_TYPES } from './constants';

const initialState = {
  snapComments: [],
  categoryIndex: 0,
  recordIndex: 0,
  historyIndex: 0,
};

function playback(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_SNAP_COMMENTS:
      return {
        ...state,
        snapComments: [...action.snapComments],
      };
    case ACTION_TYPES.SET_CATEGORY_INDEX:
      return {
        ...state,
        categoryIndex: action.index,
      };
    case ACTION_TYPES.SET_RECORD_INDEX:
      return {
        ...state,
        recordIndex: action.index,
      };
    case ACTION_TYPES.SET_HISTORY_INDEX:
      return {
        ...state,
        historyIndex: action.index,
      };

    default:
      return state;
  }
}

export default playback;
