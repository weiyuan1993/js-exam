const initialState = {
  loading: false,
  rooms: [],
  roomId: '',
  description: '',
  subjectId: '',
  error: null
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROOM_STARTED':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_ROOM_SUCCESS':
    // console.log(action.payload)
      return {
        ...state,
        loading: false,
        error: null,
        roomId: action.payload.result.id,
        description: action.payload.result.description,
        subjectId: action.payload.result.subjectId
      };
    case 'FETCH_ROOM_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default room;
