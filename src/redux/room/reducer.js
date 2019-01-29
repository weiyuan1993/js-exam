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
  del: false,
  delSuc: false,
  delErr: false,
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROOM_STARTED':
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

    case 'DELETE_ROOM_STARTED':
      return {
        ...state,
        del: true,
        delSuc: false,
        delErr: false,
      };

    case 'DELETE_ROOM_SUCCESS':
      return {
        ...initialState,
        del: false,
        delSuc: true,
        delErr: false,
      };

    case 'DELETE_ROOM_FAILURE':
      return {
        ...state,
        del: false,
        delSuc: false,
        delErr: true,
      };

    default:
      return state;
  }
};

export default room;
