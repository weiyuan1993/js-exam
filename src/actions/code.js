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

export function changeSyntaxError(error){
  return {
  	type: 'ERROR/CHANGE' ,
  	error
  }
}