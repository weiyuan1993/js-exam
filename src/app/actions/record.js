import {
  createRecord,
  updateRecord,
  subscribeOnUpdateRecord
} from 'app/utils/record';

import graphqlActionHelper, {
  ACTION_STATE
} from 'app/utils/graphqlActionHelper';

function createRecordData({ subjectId, roomId, question }) {
  return async dispatch => {
    dispatch(
      graphqlActionHelper({
        method: 'CREATE',
        dataName: 'RECORD',
        actionState: ACTION_STATE.STARTED
      })
    );
    try {
      const result = await createRecord({ subjectId, roomId, question });
      dispatch(
        graphqlActionHelper({
          method: 'CREATE',
          dataName: 'RECORD',
          actionState: ACTION_STATE.SUCCESS,
          result
        })
      );

      console.log('#create record', result);
    } catch (error) {
      dispatch(
        graphqlActionHelper({
          method: 'CREATE',
          dataName: 'RECORD',
          actionState: ACTION_STATE.FAILURE,
          result: error
        })
      );
    }
  };
}

// for subscribe
function setCurrentRecord(result) {
  return {
    type: 'SET_CURRENT_RECORD',
    payload: result
  };
}
function resetCurrentRecord() {
  return {
    type: 'RESET_CURRENT_RECORD'
  };
}

export { createRecordData, setCurrentRecord, resetCurrentRecord };
