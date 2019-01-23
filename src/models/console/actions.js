export function consoleAdd() {
  return {
    type: 'CONSOLE_ADD',
  };
}

export function consoleReset(key, ...args) {
  return {
    type: 'CONSOLE_RESET',
    key,
    args: [...args],
  };
}
