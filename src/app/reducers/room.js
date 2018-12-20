const room = (state = { id: '' }, action) => {
  switch (action.type) {
    case 'ROOM/JOIN':
      return {
        ...state,
        id: action.id
      };
    default:
      return state;
  }
};

export default room;
