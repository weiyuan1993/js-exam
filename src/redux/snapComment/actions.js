import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import get from 'lodash/get';
import { message } from 'antd';

export function createSnapComment(data) {
  return async (dispatch, getState) => {
    const latestHistoryId = get(getState(), 'history.data.id');
    if (latestHistoryId) {
      try {
        const params = {
          input: {
            time: new Date(),
            author: window.localStorage.getItem('username') || 'Unknown',
            snapCommentHistoryId: latestHistoryId,
            ...data,
          },
        };
        await API.graphql(
          graphqlOperation(mutations.createSnapComment, params),
        );
        message.success('SnapComment is created');
      } catch (error) {
        console.log(error);
        message.error('Add snap-comment failed');
      }
    }
  };
}
