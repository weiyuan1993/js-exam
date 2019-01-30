import { SET_LATEST_HISTORY } from './constants';

export function setLatestHistory(data) {
  return {
    type: SET_LATEST_HISTORY,
    data,
  };
}
