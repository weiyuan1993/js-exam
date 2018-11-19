export function roomCreate(room) {
  return {
    type: 'ROOM/CREATE',
    room
  };
}

export function roomDelete(room) {
  return {
    type: 'ROOM/DELETE',
    room
  };
}

export function roomUpdate(room) {
  return {
    type: 'ROOM/UPDATE',
    room
  };
}