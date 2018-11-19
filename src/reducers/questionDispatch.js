const questionDispatch = (
  state = {
    index: 0,
    questions: [],
    question: { name: '', content: '', test: '', rawCode: '', compiledCode: '' }
  },
  action) => {

  switch (action.type) {
    case 'CODE/RESET':
      return state;
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
        compiledCode: '',
        rawCode: ''
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
    case 'QUESTION_LIST/UPDATE':
      console.log("#QUESTION_LIST/UPDATE", state);
      return {
        ...state,
        questions: action.questions
      }    
    default:
      return state;
  }
};

export default questionDispatch;
