const Console = (state = [], action) => {
  switch (action.type) {
    case 'CONSOLE_RESET':
      return [];
    case 'CONSOLE_ADD':
      return [...state, ...action.args];
    default:
      return state;
  }
};

export default Console;
