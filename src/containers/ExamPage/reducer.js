import { CREATE_HISTORY } from './constants';

const initialState = {
  history: [],
};

function createPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_HISTORY.SUCCESS:
      return {
        ...state,
        history: [...state.history, ...action.payload.code],
      };
    default:
      return state;
  }
}

export default createPageReducer;
