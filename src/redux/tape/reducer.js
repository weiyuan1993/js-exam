const tape = (state = [], action) => {
  switch (action.type) {
    case 'TAPE_RESET':
      return [];
    case 'TAPE_ADD':
      return [...state, action.data];
    default:
      return state;
  }
};

export default tape;
