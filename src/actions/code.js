export function changeCode(code) {
  return {
    type: 'CODE/CHANGE',
    code
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