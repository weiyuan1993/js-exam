const code = (state = '', action) => {
  switch(action.type) {
  case 'CODE/RESET':
    return '';
  case 'CODE/CHANGE':
    return action.code;
  default:
    return state;
  }
};

export default code;
