import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { action } from 'utils/actionsHelper';
import { message } from 'antd';
import { CREATE_HISTORY } from './constants';

export const createHistoryActions = {
  request: data => action(CREATE_HISTORY.REQUEST, { data }),
  success: data => action(CREATE_HISTORY.SUCCESS, { data }),
  failure: error => action(CREATE_HISTORY.FAILURE, { error }),
};

export function createHistory(data) {
  return async (dispatch, getState) => {
    const { id: recordId } = getState().record;
    dispatch(createHistoryActions.request(data));
    try {
      const createTime = new Date();
      const { data: historyResult } = await API.graphql(
        graphqlOperation(mutations.createHistory, {
          input: {
            time: createTime,
            code: data.code,
            historyRecordId: recordId,
          },
        }),
      );
      console.log(historyResult);
      dispatch(createHistoryActions.success(historyResult.createHistory));
    } catch (error) {
      dispatch(createHistoryActions.failure(error));
      message.error('Create history failed');
      console.log(error);
    }
  };
}