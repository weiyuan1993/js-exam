import { SET_LATEST_HISTORY } from './constants';

const initialState = {
  data: {},
  loading: false,
  error: false,
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case SET_LATEST_HISTORY:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default history;
