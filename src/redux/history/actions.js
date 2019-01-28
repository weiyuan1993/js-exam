import { API, graphqlOperation } from 'aws-amplify';
import get from 'lodash/get';
import { SET_LATEST_HISTORY } from './constants';

export function setLatestHistory(data) {
  return {
    type: SET_LATEST_HISTORY,
    data,
  };
}

export function getLatestHistory(recordId) {
  return async (dispatch, getState) => {
    const latestSyncCode = get(getState(), 'room.currentRecord.syncCode');
    if (latestSyncCode) {
      try {
        const {
          data: {
            listHistorys: { items },
          },
        } = await API.graphql(
          graphqlOperation(`query {
              listHistorys(filter: {
                code: {
                  eq: ${JSON.stringify(latestSyncCode)}
                }
              }
                limit: 100
              ) {
                items {
                  id
                  code
                  time
                  record {
                    id
                  }
                }
              }
            }`),
        );
        const listHistorysById = items.filter(
          history => history.record.id === recordId,
        );
        if (listHistorysById.length > 1) {
          listHistorysById.sort((a, b) => new Date(b.time) - new Date(a.time));
        }
        dispatch(setLatestHistory(listHistorysById[0] || {}));
      } catch (error) {
        console.log(error);
      }
    }
  };
}
