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

const getRoom = async (roomId) => {
  const query = ` {
    getRoom(id: "${roomId}") {
      id
      subjectId
      description
      status
      host {
        id
        name
      }
      password
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
  } `;
  const { data } = await API.graphql(graphqlOperation(query));
  return data.getRoom;
};

const deleteRoom = async id => {
  const params = {
    input: {
      id
    }
  };
  const { data } = await API.graphql(graphqlOperation(mutations.deleteRoom, params));
  return data.deleteRoom;
};

const bindRoomCurrentRecord = async (roomId, recordId) => {
  const params = {
    input: {
      id: roomId,
      roomCurrentRecordId: recordId
    }
  };
  const { data } = await API.graphql(graphqlOperation(mutations.updateRoom, params));
  return data.updateRoom;
};

const updateRoom = async (id, password) => {
  const params = {
    input: {
      id,
      password,
    }
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRoom, params)
  );
  return result;
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

export {
  subscribeOnUpdateRoom,
  createRoom,
  getRoom,
  deleteRoom,
  bindRoomCurrentRecord,
  createTest,
  updateRoom
};
