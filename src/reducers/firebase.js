export default (state = {}, action) => {
  switch (action.type) {
    case "INIT_FIREBASE":
      return {
        ...state,
        firebaseApp: action.firebaseApp
      };
    case "LOG_OUT":
        return {
            ...state,
            isLogin: false,
        }
    case "LOG_IN":
        return {
            ...state,
            isLogin: true,
        }
    default:
      return state;
  }
};
