import { API, graphqlOperation } from 'aws-amplify';
import { changeCode } from 'redux/code/actions';
import { queryRecordWithHistory } from './queries';
import {
  SET_CURRENT_RECORD_WITH_HISTORY,
  SET_SNAP_COMMENTS,
  SET_CATEGORY_INDEX,
  SET_RECORD_INDEX,
  SET_HISTORY_INDEX,
} from './constants';

export function fetchRecordWithHistory(id, index) {
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
      dispatch(setHistoryIndex(0));
      dispatch(setCurrentRecordWithHistory(result));
      dispatch(setCategoryIndex(result.ques.type === 'javascript' ? 0 : 1));
      dispatch(setRecordIndex(index));
      if (result.history.items.length > 0) {
        dispatch(changeCode({ rawCode: result.history.items[0].code }));
        dispatch(setSnapComments(getSnapComments(result.history.items)));
      } else {
        dispatch(changeCode({ rawCode: result.ques.content }));
      }
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
}

function setCurrentRecordWithHistory(result) {
  return {
    type: SET_CURRENT_RECORD_WITH_HISTORY,
    payload: result,
  };
}

function setSnapComments(snapComments) {
  return {
    type: SET_SNAP_COMMENTS,
    snapComments,
  };
}
export function setCategoryIndex(index) {
  return {
    type: SET_CATEGORY_INDEX,
    index,
  };
}
export function setRecordIndex(index) {
  return {
    type: SET_RECORD_INDEX,
    index,
  };
}

export function setHistoryIndex(index) {
  return {
    type: SET_HISTORY_INDEX,
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
