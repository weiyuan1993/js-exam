import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations.js';
import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);


const listRooms = async () => {
  const query = ` {
    listRooms(limit: 1000) {
      items {
        id
        test {
          id
          subjectId
          description
          timeBegin
          timeEnd
          status
          tags
        }
        subjectId
        description
        status
        host {
          id
          name
        }
        password
        users {
          items {
            id
            name
          }
          nextToken
        }
      }
      nextToken
    }
  }`;
  const result = await API.graphql(graphqlOperation(query));
  return result.data.listRooms.items;
};


const subscribeOnUpdateRoom = callback => {
  API.graphql(graphqlOperation(subscriptions.onUpdateRoom)).subscribe({
    next: ({ value }) => {

      callback(value.data.onUpdateRoom);
    },
    error: error => {
      console.error(error);
    }
  });
};

export { listRooms, subscribeOnUpdateRoom } 