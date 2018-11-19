const code = (
  state = { 
    index: 0, 
    question: { name: '', content: '', test: '', rawCode: '', compiledCode: '' } },
action) => {

  switch(action.type) {
    case 'CODE/RESET':
      return state ;
    // case 'CODE/CHANGE':
    //   console.log("#CODE/CHANGE", state);
    //   return {
    //     ...state ,
    //     compiledCode: action.compiledCode || state.compiledCode ,
    //     [state.index] : {
    //       code : action.rawCode 
    //     } 
    //   }
    case 'CODE/CHANGE':
      console.log("#CODE/CHANGE", state);
      return {
        ...state,
        compiledCode: action.compiledCode || state.compiledCode,
        rawCode: action.rawCode
      }  
    // case 'QUESTION/RESET':
    //   return {
    //     ...state,
    //     compiledCode : '' ,
    //     [state.index] : {
    //       code : '' 
    //     } 
    //   }
      case 'QUESTION/RESET':
      return {
        ...state,
        compiledCode : '' ,
        rawCode : '' 
      }
    case 'QUESTION/CHANGE':
      console.log("#QUESTION/CHANGE", state);
      return {
        ...state,
        index: action.index,
        question: action.question,
        rawCode: action.question.content,
        compiledCode: ''
      }      
    // case 'QUESTION/CHANGE':
    //   console.log("#QUESTION/CHANGE", state);
    //   return {
    //     ...state,
    //     index : action.index ,
    //     compiledCode : ''
    //   }
    default:
      return state;
  }
};

export default code;
