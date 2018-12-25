import { getRoom, deleteRoom } from 'app/utils/room';
import { setCurrentRecord, resetCurrentRecord } from 'app/actions/record';

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

      if (result.currentRecord) {
        dispatch(setCurrentRecord(result.currentRecord));
      } else {
        dispatch(resetCurrentRecord());
      }
      console.log('#get room', result);
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

function deleteRoomAction(id) {
  return async dispatch => {
    dispatch(
      graphqlActionHelper({
        method: 'DELETE',
        dataName: 'ROOM',
        actionState: ACTION_STATE.STARTED
      })
    );
    try {
      const result = await deleteRoom(id);
      dispatch(
        graphqlActionHelper({
          method: 'DELETE',
          dataName: 'ROOM',
          actionState: ACTION_STATE.SUCCESS
        })
      );

      dispatch(resetCurrentRecord());
      
      console.log('#delete room', result);
    } catch (error) {
      dispatch(
        graphqlActionHelper({
          method: 'DELETE',
          dataName: 'ROOM',
          actionState: ACTION_STATE.FAILURE,
          result: error
        })
      );
      console.log(error);
    }
  };
}

export { getRoomInfo, deleteRoomAction };
