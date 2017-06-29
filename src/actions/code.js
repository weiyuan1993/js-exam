export function changeCode({ compiledCode , rawCode }) {
  return {
    type: 'CODE/CHANGE',
    compiledCode ,
    rawCode 
  };
}

export function changeQuestion(index) {
  return {
    type: 'QUESTION/CHANGE',
    index
  };
}

export function resetQuestion(index) {
  return {
    type: 'QUESTION/RESET'
  };
}
