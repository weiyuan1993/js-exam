export default function joinRoom(id) {
  return {
    type: 'ROOM/JOIN',
    id
  };
}
