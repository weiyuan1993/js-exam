export function changeCode({ compiledCode , rawCode }) {
  return {
    type: 'CODE/CHANGE',
    compiledCode ,
    rawCode 
  };
}

// export function changeQuestion(index) {
//   return {
//     type: 'QUESTION/CHANGE',
//     index
//   };
// }

export function changeQuestion({id, question}) {
  return {
    type: 'QUESTION/CHANGE',
    index: id,
    question: question
  };
}

export function resetQuestion(index) {
  return {
    type: 'QUESTION/RESET'
  };
}

export function updateQuestionList(questions) {
  return {
    type: 'QUESTION_LIST/UPDATE',
    questions
  };
}
