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

      const histories = data.history.items;
      const result = {
        history: sortByTime(histories),
        ...data.getRecord,
      };

      dispatch(setCurrentRecordWithHistory(result));
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

function sortByTime(data) {
  return data.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );
}
