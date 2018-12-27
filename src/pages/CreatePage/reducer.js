import { CHANGE_USERNAME } from './constants';

const initialState = {
  username: '',
};

function createPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.name,
      };
    default:
      return state;
  }
}

export default createPageReducer;
