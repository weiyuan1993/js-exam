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

      const histories = data.getRecord.history.items;
      const result = {
        history: sortByTime(histories),
        ...data.getRecord,
      };
      console.log(result);
      dispatch(setCurrentRecordWithHistory(result));
      dispatch(setSnapComments(getSnapComments(result.history.items)));
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

function setSnapComments(snapComments) {
  return {
    type: 'SET_SNAP_COMMENTS',
    snapComments,
  };
}

export function setCurrentSnapComment(index) {
  return {
    type: 'SET_SNAP_COMMENTS',
    index,
  };
}

function sortByTime(data) {
  return data.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
  );
}

function getSnapComments(histories) {
  const snapComments = [];
  histories.forEach((history, i) => {
    if (history.snapComments.items.length > 0) {
      snapComments.push({
        historyIndex: i,
        data: history.snapComments.items,
      });
    }
  });
  return snapComments;
}
