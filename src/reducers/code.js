const code = (state = { index : 0 }, action) => {
  switch(action.type) {
    case 'CODE/RESET':
      return state ;
    case 'CODE/CHANGE': 
      return {
        ...state ,
        compiledCode: action.compiledCode || state.compiledCode ,
        [state.index] : {
          code : action.rawCode 
        } 
      }
    case 'QUESTION/CHANGE':
      return {
        ...state,
        index : action.index ,
        compiledCode : ''
      }
    default:
      return state;
  }
};

export default code;
