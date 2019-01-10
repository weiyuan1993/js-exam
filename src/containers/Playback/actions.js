import { API, graphqlOperation } from 'aws-amplify';
import { queryRecordWithHistory } from './queries';

export function fetchRecordWithHistory(id) {
  return async (dispatch, getState) => {
    try {
      const {
        history: { nextToken },
      } = getState().record;

      const query = {
        id,
        limit: 1000,
        nextToken,
      };
      const { data } = await API.graphql(
        graphqlOperation(queryRecordWithHistory, query),
      );
      console.log('#getRecordWithHistory', data);

      dispatch(setCurrentRecordWithHistory(data.getRecord));
    } catch (e) {
      console.log(e);
    }
  };
}

function setCurrentRecordWithHistory(result) {
  return {
    type: 'SET_CURRENT_RECORD_WITH_HISTORY',
    payload: result,
  };
}
