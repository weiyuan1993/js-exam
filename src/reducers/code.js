const code = (state = { index : 0 , '0' : {} }, action) => {
  switch(action.type) {
    case 'CODE/RESET':
      return state ;
    case 'CODE/CHANGE':
      return {
      	...state ,
      	[state.index] : {
      	  code : action.code ,
      	  syntaxError : '' 
      	} 
      }
    case 'ERROR/CHANGE':
      return {
      	...state ,
      	[state.index] : {
      	  code : state[state.index].code ,
      	  syntaxError : action.error
      	} 
      }
    case 'QUESTION/CHANGE':
      return {
      	...state,
      	index : action.index 
      }
    default:
      return state;
  }
};

export default code;
