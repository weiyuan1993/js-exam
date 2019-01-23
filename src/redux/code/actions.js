export function codeChange({ code, compileCode }) {
  return {
    type: 'CODE_CHANGE',
    code,
    compileCode,
  };
}

export function codeReset() {
  return {
    type: 'CODE_RESET',
  };
}
