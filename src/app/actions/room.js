import { getRoom } from 'app/utils/room';

import graphqlActionHelper, {
  ACTION_STATE
} from 'app/utils/graphqlActionHelper';

function getRoomInfo(id) {
  return async dispatch => {
    dispatch(
      graphqlActionHelper({
        method: 'FETCH',
        dataName: 'ROOM',
        actionState: ACTION_STATE.STARTED
      })
    );
    try {
      const result = await getRoom(id);
      dispatch(
        graphqlActionHelper({
          method: 'FETCH',
          dataName: 'ROOM',
          actionState: ACTION_STATE.SUCCESS,
          result
        })
      );
      console.log(result);
      dispatch({ type: 'SET_CURRENT_RECORD', payload: result.currentRecord });
    } catch (error) {
      dispatch(
        graphqlActionHelper({
          method: 'FETCH',
          dataName: 'ROOM',
          actionState: ACTION_STATE.FAILURE,
          result: error
        })
      );
    }
  };
}

export { getRoomInfo };
