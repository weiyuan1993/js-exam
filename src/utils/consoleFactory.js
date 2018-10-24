const createWrappedConsole = (console, dispatch) => {
  return Object.keys(console).reduce((cal, key) => {
    cal[key] = (...args) => {
      dispatch({ type: 'CONSOLE/ADD', key, args: [...args] });
    };
    return cal;
  }, {});
}

export default createWrappedConsole;