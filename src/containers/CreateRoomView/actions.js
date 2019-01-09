/*
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import { action } from 'utils/actionsHelper';
import { message } from 'antd';
import { CREATE_ROOM } from './constants';

export const createRoomActions = {
  request: data => action(CREATE_ROOM.REQUEST, { data }),
  success: data => action(CREATE_ROOM.SUCCESS, { data }),
  failure: error => action(CREATE_ROOM.FAILURE, { error }),
};

export function createRoom(data) {
  return async dispatch => {
    dispatch(createRoomActions.request(data));
    try {
      const { data: testData } = await API.graphql(graphqlOperation(mutations.createTest, data));
      const roomNum = Math.floor(Math.random() * 98) + 1;
      const roomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      const { data: resData } = await API.graphql(
        graphqlOperation(mutations.createRoom, {
          input: {
            roomTestId: testData.createTest.id,
            description: roomChar + roomNum,
            createTime: new Date(),
            ...data.input,
          },
        }),
      );
      dispatch(createRoomActions.success(resData.createRoom));
    } catch (error) {
      dispatch(createRoomActions.failure(error));
      message.error('Create room failed');
    }
  };
}
