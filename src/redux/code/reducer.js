const initialState = {
  rawCode: '',
  compiledCode: '',
};
const code = (state = initialState, action) => {
  switch (action.type) {
    case 'CODE_CHANGE':
      return {
        ...state,
        rawCode: action.rawCode || state.rawCode,
        compiledCode: action.compiledCode || state.compiledCode,
      };
    case 'CODE_RESET':
      return {
        ...state,
        rawCode: '',
      };
    default:
      return state;
  }
};

export default code;
