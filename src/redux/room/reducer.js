const initialState = {
  loading: false,
  rooms: [],
  id: '',
  description: '',
  subjectId: '',
  error: null,
  password: '',
  isHost: false,
  test: {},
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROOM_STARTED':
    case 'DELETE_ROOM_STARTED':
    case 'UPDATE_ROOM_STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_ROOM_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload.result,
      };
    case 'FETCH_ROOM_FAILURE':
    case 'UPDATE_ROOM_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case 'DELETE_ROOM_SUCCESS':
      return initialState;
    case 'UPDATE_ROOM_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload.result,
      };
    case 'SET_ROOMHOST':
      return {
        ...state,
        isHost: action.isHost,
      };
    default:
      return state;
  }
};

export default room;
