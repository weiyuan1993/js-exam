/**
 * Gets the repositories of the user from Github
 */

import { fork, take, call, put } from 'redux-saga/effects';
import actions from 'redux-form/es/actions';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from 'graphql/mutations';
import get from 'lodash/get';
import { message } from 'antd';
import { CREATE_ROOM } from './constants';
import { createRoomActions } from './actions';

export function* createRoom(formId, data) {
  yield put(actions.startSubmit(formId));
  try {
    const roomNum = Math.floor(Math.random() * 98) + 1;
    const roomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    const createRoomOperation = graphqlOperation(mutations.createRoom, {
      input: {
        description: roomChar + roomNum,
        ...data.input,
      },
    });
    const { data: room } = yield call(API.graphql, createRoomOperation);

    const createTestOperation = graphqlOperation(mutations.createTest, data);
    yield call(API.graphql, createTestOperation);

    yield put(createRoomActions.success(room));
    yield put(actions.stopSubmit(formId));
  } catch (error) {
    yield put(createRoomActions.failure(error));
    const errorMessage = yield call(
      get,
      error,
      'error.errors',
      'Create Room Failed',
    );
    yield put(actions.stopSubmit(formId, { _error: errorMessage }));
    yield call(message.error, errorMessage);
  }
}

export function* watchCreateRoom() {
  // Watches for CREATE_ROOM.REQUEST actions and continue execution
  // It will be cancelled automatically on component unmount
  for (;;) {
    yield take(CREATE_ROOM.REQUEST);
    console.log('Receive CREATE_ROOM.REQUEST');
    // const { formId, data } = yield take(CREATE_ROOM.REQUEST);
    // yield call(createRoom, formId, data);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield fork(watchCreateRoom);
}
