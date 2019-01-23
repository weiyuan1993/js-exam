/*
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = '<component-path>/YOUR_ACTION_CONSTANT';
 */
import { makeActionType } from 'utils/constantsHelper';

export const CREATE_ROOM = makeActionType(
  'containers/CreateRoomView/CREATE_ROOM',
);

export const REDUCER_KEY = 'createRoomView';
