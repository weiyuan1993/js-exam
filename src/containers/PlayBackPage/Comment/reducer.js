const initialState = {
  snapComments: [],
  index: 0,
};

function snapComment(state = initialState, action) {
  switch (action.type) {
    case 'SET_SNAP_COMMENTS':
      return {
        ...state,
        snapComments: [...action.snapComments],
      };
    case 'SET_CURRENT_COMMENT':
      return {
        ...state,
        index: action.index,
      };
    default:
      return state;
  }
}

export default snapComment;
