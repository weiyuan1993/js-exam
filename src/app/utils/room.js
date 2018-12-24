import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from '../../graphql/mutations.js';
import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

const createRoom = async (subjectId) => {
  const roomNum = Math.floor(Math.random() * 98) + 1;
  const roomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const params = {
    input: {
      description: roomChar + roomNum,
      subjectId,
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRoom, params)
  );
  return data.createRoom;
};

const createTest = async (subjectId) => {
  const params = {
    input: {
      subjectId,
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createTest, params)
  );
  return data.createTest;
};

const listRooms = async () => {
  const query = ` {
    listRooms(limit: 1000) {
      items {
        id
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

const getRoom = async id => {
  const query = `query {
    getRoom(id: "${id}") {
      id
      subjectId
      description
      host {
        id
        name
      }
      users {
        items {
          id
          name
        }
        nextToken
      }
      currentRecord {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        history
        ques {
          type
          name
          content
          test
        }
      }
    }
  }
  `;
  const { data } = await API.graphql(graphqlOperation(query));
  return data.getRoom;
};

const bindRoomCurrentRecord = async (roomId, recordId) => {
  const params = {
    input: {
      id: roomId,
      roomCurrentRecordId: recordId
    }
  };
  const result = API.graphql(graphqlOperation(mutations.updateRoom),params);
  console.log(result);
}

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

export {
  listRooms,
  subscribeOnUpdateRoom,
  createRoom,
  getRoom,
  bindRoomCurrentRecord,
  createTest
};
