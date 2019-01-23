import { CREATE_ROOM } from './constants';

const initialState = {
  createdRoom: {},
};

function createPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM.SUCCESS:
      return {
        ...state,
        createdRoom: {
          ...action.data,
        },
      };
    default:
      return state;
  }
}

export default createPageReducer;
