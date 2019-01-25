export function changeCode({ rawCode, compiledCode }) {
  return {
    type: 'CODE_CHANGE',
    rawCode,
    compiledCode,
  };
}

export function resetCode() {
  return {
    type: 'CODE_RESET',
  };
}
