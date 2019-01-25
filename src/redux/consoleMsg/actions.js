
export function addConsole(...args) {
  return {
    type: 'CONSOLE_ADD',
    args: [...args],
  };
}
export function resetConsole() {
  return {
    type: 'CONSOLE_RESET',
  };
}
