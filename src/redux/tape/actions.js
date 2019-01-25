export function addTape(data) {
  return {
    type: 'TAPE_ADD',
    data,
  };
}

export function resetTape() {
  return {
    type: 'TAPE_RESET',
  };
}
