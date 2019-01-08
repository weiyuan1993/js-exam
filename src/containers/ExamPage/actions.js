import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';

export function updateRecordData(data) {
  return async dispatch => {
    try {
      const params = {
        input: {
          id: data.id,
          syncCode: data.newCode,
          timeEnd: new Date(),
        },
      };
      await API.graphql(graphqlOperation(mutations.updateRecord, params));
      dispatch(createHistory({ historyData: data.newCode }));
    } catch (error) {
      console.log(error);
    }
  };
}

function createHistory(data) {
  return async (dispatch, getState) => {
    const { id: recordId } = getState().record;
    try {
      const createTime = new Date();
      await API.graphql(
        graphqlOperation(mutations.createHistory, {
          input: {
            time: createTime,
            code: data.historyData,
            historyRecordId: recordId,
          },
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
}
