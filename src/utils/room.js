import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from 'graphql/mutations';
import * as subscriptions from 'graphql/subscriptions';

Amplify.configure(awsExportConfig);

const createRoom = async subjectId => {
  const roomNum = Math.floor(Math.random() * 98) + 1;
  const roomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const params = {
    input: {
      description: roomChar + roomNum,
      subjectId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRoom, params),
  );
  return data.createRoom;
};

const createTest = async subjectId => {
  const params = {
    input: {
      subjectId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createTest, params),
  );
  return data.createTest;
};

const getRoom = async roomId => {
  const query = `query {
    getRoom(id: "${roomId}") {
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
      createTime
      password
      currentRecord {
        id
        subjectId
        syncCode
        timeBegin
        timeEnd
        comment {
          author
          time
          content
        }
        history {
          time
          code
        }
        ques {
          type
          name
          content
          test
        }
      }
    }
  }`;
  const { data } = await API.graphql(graphqlOperation(query));
  return data.getRoom;
};

const deleteRoom = async id => {
  const params = {
    input: {
      id,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.deleteRoom, params),
  );
  return data.deleteRoom;
};

const bindRoomCurrentRecord = async (roomId, recordId) => {
  const params = {
    input: {
      id: roomId,
      roomCurrentRecordId: recordId,
    },
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.updateRoom, params),
  );
  return data.updateRoom;
};

const updateRoom = async (id, password) => {
  const params = {
    input: {
      id,
      password,
    },
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRoom, params),
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
    },
  });
};

export {
  subscribeOnUpdateRoom,
  createRoom,
  getRoom,
  deleteRoom,
  bindRoomCurrentRecord,
  createTest,
  updateRoom,
};
