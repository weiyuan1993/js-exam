/*
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = '<component-path>/YOUR_ACTION_CONSTANT';
 */
import { makeActionType } from 'utils/constantsHelper';

export const GET_HISTORY_SET = makeActionType('containers/Playback/GET_HISTORY_SET');

export const REDUCER_KEY = 'playback';
