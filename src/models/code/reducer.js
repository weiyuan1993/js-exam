const initialState = {
  code: '',
  compiledCode: '',
};
const code = (state = initialState, action) => {
  switch (action.type) {
    case 'CODE_CHANGE':
      return {
        ...state,
        code: action.code,
        compiledCode: action.compiledCode || state.compiledCode,
      };
    case 'CODE_RESET':
      return {
        ...state,
        code: '',
      };
    default:
      return state;
  }
};

export default code;
