const initialState = {
  loading: false,
  list: [],
  type: '',
  name: '',
  content: '',
  test: ''
};

const question = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_QUESTION_STARTED':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_QUESTION_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        list: action.payload.result
      };
    case 'FETCH_QUESTION_SUCCESS':
      return {
        ...state,
        loading: false,
        type: action.payload.result.type,
        name: action.payload.result.name,
        content: action.payload.result.content,
        test: action.payload.result.test
      };
    case 'FETCH_QUESTION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};

export default question;
