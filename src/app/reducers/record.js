const initialState = {
  loading: false,
  id: '',
  syncCode: '',
  timeBegin: null,
  timeEnd: null,
  history: [],
  ques: null
};

const record = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_RECORD_STARTED':
      return {
        ...state,
        loading: true
      };
    case 'CREATE_RECORD_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        id: action.payload.id,
        syncCode: action.payload.syncCode,
        timeBegin: parseInt(new Date().getTime() / 1000, 10),
        ques: action.payload.ques
      };
    case 'CREATE_RECORD_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case 'SET_CURRENT_RECORD': // set current record from room
      return {
        ...state,
        id: action.payload.id,
        syncCode: action.payload.syncCode,
        timeBegin: action.payload.timeBegin,
        ques: action.payload.ques
      };
    default:
      return state;
  }
};

export default record;
